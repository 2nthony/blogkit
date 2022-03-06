import Axios from 'axios'
import { Post, Posts, Request } from 'blogkit'
import { StrapiPost, StrapiPostList } from './post.model'

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const CONTENT_TYPE = process.env.STRAPI_CONTENT_TYPE || 'articles'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: STRAPI_URL + '/api',
})

export const request: Request = {
  async getPostList(): Promise<Posts> {
    const { data } = await axios.get<StrapiPostList>(`/${CONTENT_TYPE}`)

    const posts = data.data.map<Pick<Post, 'id' | 'attributes'>>((item) => ({
      id: String(item.id),
      attributes: {
        title: item.attributes.title,
        date: item.attributes.publishedAt,
        description: item.attributes.excerpt,
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
      markdown: data.attributes.content,
      attributes: {
        title: data.attributes.title,
        description: data.attributes.excerpt,
        date: data.attributes.publishedAt,
        slug: String(data.id),
      },
    }
  },
}
