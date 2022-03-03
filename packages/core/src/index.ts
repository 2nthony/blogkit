import { marked } from 'marked'
import prism from 'prismjs'
import type { BlogkitConfig } from './types'
import { NextApiHandler } from 'next'

export function defineConfig(config: BlogkitConfig) {
  return config
}

export class Blogkit {
  private REVALIDATE = 60

  constructor(public config: BlogkitConfig) {}

  private get getPostList() {
    return this.config.request.getPostList
  }

  private get getPost() {
    return this.config.request.getPost
  }

  private get getFeed() {
    return this.config.request.getFeed
  }

  getStaticPaths = async () => {
    const posts = await this.getPostList()

    return {
      paths: posts.map((p) => `/${p.attributes.slug || ''}`),
      fallback: true,
    }
  }

  getHomePageStaticProps = async () => {
    const posts = await this.getPostList()

    return {
      props: {
        posts,
        siteConfig: this.config?.siteConfig || {},
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
        siteConfig: this.config?.siteConfig || {},
      },
      revalidate: this.REVALIDATE,
    }
  }

  rssHandler: NextApiHandler = async (_req, res) => {
    if (this.getFeed) {
      res.setHeader('Content-Type', 'application/xml')
      // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
      res.setHeader(
        'Cache-Control',
        `s-maxage=1 stale-while-revalidate=${10 * 60}`,
      )
      res.send(await this.getFeed(this.config.siteConfig))
      return
    }

    res.setHeader('Content-Type', 'application/text')
    res.send('rss not provided.')
  }
}

export function parseMarkdown(body: string) {
  const parsed = marked.parse(body, {
    highlight(code, lang) {
      if (prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang)
      } else {
        return code
      }
    },
  })

  return parsed
}

export * from './types'
