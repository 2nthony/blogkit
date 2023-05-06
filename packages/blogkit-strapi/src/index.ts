import Axios from 'axios'
import type { Post, Posts, Request } from 'blogkit'
import type { StrapiPost, StrapiPostList } from './post.model'

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const CONTENT_TYPE = process.env.STRAPI_CONTENT_TYPE || 'articles'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${STRAPI_URL}/api`,
})

interface Config {
  attributes?: {
    title: string
    content: string
    excerpt: string
  }
}

type AttributeConfig = Config['attributes']

const defaultAttributes: AttributeConfig = {
  title: 'title',
  content: 'content',
  excerpt: 'excerpt',
}

export const request: (config?: Config) => Request = (config = {}) => {
  const { attributes: attributeConfig = defaultAttributes } = config

  return {
    async getPostList(): Promise<Posts> {
      const { data } = await axios.get<StrapiPostList>(`/${CONTENT_TYPE}`)

      const posts = data.data.map<Pick<Post, 'id' | 'attributes'>>(item => ({
        id: String(item.id),
        attributes: {
          title: item.attributes[attributeConfig.title],
          date: item.attributes.publishedAt,
          description: item.attributes[attributeConfig.excerpt],
          slug: String(item.id),
        },
      }))

      return posts
    },

    async getPost(slug: string): Promise<Omit<Post, 'html'>> {
      const {
        data: { data },
      } = await axios.get<StrapiPost>(`/${CONTENT_TYPE}/${slug}`)

      return {
        id: String(data.id),
        markdown: data.attributes[attributeConfig.content],
        attributes: {
          title: data.attributes[attributeConfig.title],
          description: data.attributes[attributeConfig.excerpt],
          date: data.attributes.publishedAt,
          slug: String(data.id),
        },
      }
    },
  }
}
