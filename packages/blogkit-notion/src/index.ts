import { Feed, Request } from 'blogkit'
import { Client } from '@notionhq/client'
import { retriever } from './retriever'
import { NotionToMarkdown } from './notion-to-md'
import { parseMentionPageToInSitePage } from './helpers/parseMentionPageToInSitePage'

const notionToken = process.env.NOTION_TOKEN as string | undefined
const notionDatabaseId = process.env.NOTION_DATABASE_ID as string | undefined

const notion = new Client({
  auth: notionToken,
  notionVersion: '2022-06-28',
})
const n2m = new NotionToMarkdown({ notionClient: notion })

async function getDatabase() {
  const response = await notion.databases.query({
    database_id: notionDatabaseId!,
    filter: {
      and: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'title',
          title: {
            is_not_empty: true,
          },
        },
        {
          property: 'slug',
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })

  return response.results
}

export const request: Request = {
  async getPostList() {
    const data = await getDatabase()
    const posts = data.map((p) => {
      const id = p.id
      const properties = (p as any).properties
      const title = retriever(properties.title)
      const date = retriever(properties.date)
      const slug = retriever(properties.slug)
      /* optional */
      const description = retriever(properties.description) || null

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
    const posts = await this.getPostList()
    const post = posts.find((p) => p.attributes.slug === slug)
    const id = post!.id

    const blocks = await n2m.pageToMarkdown(id)
    const parsedBlocks = blocks.map((block) => {
      block = parseMentionPageToInSitePage({ posts, block })
      return block
    })
    const markdown = n2m.toMarkdownString(parsedBlocks)

    return {
      id,
      markdown,
      attributes: post!.attributes,
    }
  },

  async getFeeds() {
    const postList = await this.getPostList()
    const getPosts = postList.map((p) => this.getPost(p.attributes.slug))
    const results = await Promise.allSettled(getPosts)

    const feeds: Feed[] = []

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const post = result.value
        feeds.push({
          date: new Date(post.attributes.date),
          slug: post.attributes.slug,
          description: post.attributes.description,
          title: post.attributes.title,
          markdown: post.markdown,
        })
      }
    }

    return feeds
  },
}
