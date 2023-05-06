import { marked } from 'marked'
import prism from 'prismjs'
import type { NextApiHandler } from 'next'
import { Feed } from 'feed'
import type { BlogkitConfig } from './types'

/**
 * @deprecated use `defineBlogkitConfig` instead
 */
export function defineConfig(config: BlogkitConfig) {
  return config
}

export function defineBlogkitConfig(config: BlogkitConfig) {
  return config
}

export class Blogkit {
  private REVALIDATE = 60

  constructor(public userConfig: BlogkitConfig) {}

  get config() {
    const { userConfig } = this

    // TODO: refactor this if have next similar feature
    const resolvedRequest
      = typeof userConfig.request === 'function'
        ? userConfig.request(userConfig)
        : userConfig.request

    return {
      ...userConfig,
      request: resolvedRequest,
    }
  }

  private get getPostList() {
    return this.config.request.getPostList
  }

  private get getPost() {
    return this.config.request.getPost
  }

  private get getFeeds() {
    return this.config.request.getFeeds
  }

  getStaticPaths = async () => {
    const posts = await this.getPostList()

    return {
      paths: posts.map(p => `/${p.attributes.slug || ''}`),
      fallback: true,
    }
  }

  getHomePageStaticProps = async () => {
    const posts = await this.getPostList()

    return {
      props: {
        posts,
        siteConfig: this.config.siteConfig,
        themeConfig: this.config.themeConfig ?? {},
      },
      revalidate: this.REVALIDATE,
    }
  }

  getPostPageStaticProps = async (ctx: any) => {
    const { markdown = '', attributes } = await this.getPost(
      ctx.params.slug.join('/'),
    )
    const parsed = parseMarkdown(markdown)

    return {
      props: {
        post: {
          html: parsed,
          attributes,
        },
        siteConfig: this.config.siteConfig,
        themeConfig: this.config.themeConfig ?? {},
      },
      revalidate: this.REVALIDATE,
    }
  }

  rssHandler: NextApiHandler = async (_req, res) => {
    if (this.getFeeds) {
      const { title, author, url } = this.config.siteConfig
      const feeds = await this.getFeeds()

      const feed = new Feed({
        title,
        copyright: title,
        id: title,
        author: {
          name: author,
        },
      })

      if (url) {
        feeds.forEach((item) => {
          feed.addItem({
            title: item.title,
            link: `${url}/${item.slug}`,
            content: parseMarkdown(item.markdown || ''),
            date: item.date,
            description: item.description,
          })
        })
      }

      res.setHeader('Content-Type', 'application/xml')
      // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
      res.setHeader(
        'Cache-Control',
        `s-maxage=1 stale-while-revalidate=${10 * 60}`,
      )
      res.send(feed.atom1())

      return
    }

    res.setHeader('Content-Type', 'text/plain')
    res.send('RSS is not provided.')
  }
}

export function parseMarkdown(body: string) {
  const parsed = marked.parse(body, {
    highlight(code, lang) {
      if (prism.languages[lang])
        return prism.highlight(code, prism.languages[lang], lang)

      else
        return code
    },
  })

  return parsed
}

export * from './types'
