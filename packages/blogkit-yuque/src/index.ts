import { Request } from 'blogkit'
import Axios from 'axios'

const yuqueNamespace = process.env.YUQUE_NAMESPACE as string | undefined
const yuqueToken = process.env.YUQUE_TOKEN as string
const baseURL = 'https://www.yuque.com/api/v2'

const axios = Axios.create({
  headers: {
    'User-Agent': 'Blogkit',
    'X-Auth-Token': yuqueToken,
  },
  baseURL,
})

export const request: Request = {
  async getPostList() {
    const { data } = await axios(`/repos/${yuqueNamespace}/docs`)

    const posts = data.data.map((p: any) => {
      const id = p.id
      const title = p.title as string
      const description = '' // too long
      const date = p.published_at
      const slug = p.slug as string

      return {
        id,
        attributes: {
          title,
          date,
          description,
          slug,
        },
      }
    })

    return posts
  },

  async getPost(slug: string) {
    const { data } = await axios(`/repos/${yuqueNamespace}/docs/${slug}`)
    const p = data.data

    const id = p.id
    const markdown = p.body
    const title = p.title as string
    const description = '' // too long
    const date = p.published_at

    return {
      id,
      markdown,
      attributes: {
        title,
        description,
        date,
        slug,
      },
    }
  },
}
