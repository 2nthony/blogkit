import { Request } from 'blogkit'
import { Client } from '@notionhq/client'
import { parseBlocksToMarkdown } from './blocks'
import { retriever } from './retriever'
import { Block } from './types'

const notionToken = process.env.NOTION_TOKEN as string | undefined
const notionDatabaseId = process.env.NOTION_DATABASE_ID as string | undefined

const notion = new Client({
  auth: notionToken,
})

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

export async function getBlocks(blockId: string): Promise<Block[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  })

  return response.results as any as Block[]
}

export const request: Request = {
  async getPostList() {
    const data = await getDatabase()
    const posts = data.map((p) => {
      const id = p.id
      const properties = (p as any).properties
      const title = retriever(properties.title) as string
      const description = retriever(properties.description) as string
      const date = retriever(properties.date) as Date
      const slug = retriever(properties.slug) as string

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

    const blocks = await getBlocks(id)
    const markdown = await parseBlocksToMarkdown(blocks)

    return {
      id,
      markdown,
      attributes: post!.attributes,
    }
  },
}