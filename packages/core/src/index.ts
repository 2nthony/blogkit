import { marked } from 'marked'
import prism from 'prismjs'
import type { BlogkitConfig } from './types'

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
}

export * from './types'
