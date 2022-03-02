import { marked } from 'marked'
import prism from 'prismjs'
import { Feed } from 'feed'
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

  private parseMarkdown(body: string) {
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
    const parsed = this.parseMarkdown(markdown)

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

  generateFeed = async () => {
    const { title, author, url } = this.config.siteConfig

    const feed = new Feed({
      title,
      copyright: title,
      id: title,
      author: {
        name: author,
      },
    })

    if (url) {
      const postList = await this.getPostList()
      const getPosts = postList.map((p) => this.getPost(p.attributes.slug))
      const results = await Promise.allSettled(getPosts)

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const post = result.value
          const link = `${url}/${post.attributes.slug}`

          feed.addItem({
            id: link,
            date: new Date(post.attributes.date),
            link,
            description: post.attributes.description,
            title,
            content: this.parseMarkdown(post.markdown || ''),
          })
        }
      })
    }

    return feed.atom1()
  }

  rssHandler: NextApiHandler = async (_req, res) => {
    res.setHeader('Content-Type', 'application/xml')
    // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
    res.setHeader(
      'Cache-Control',
      `s-maxage=1 stale-while-revalidate=${10 * 60}`,
    )
    res.send(await this.generateFeed())
  }
}

export * from './types'
