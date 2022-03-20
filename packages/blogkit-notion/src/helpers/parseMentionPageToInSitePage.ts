import type { Posts } from 'blogkit'
import type { MdBlock } from 'notion-to-md/build/types'

export const reNotionMentionPage = /https:\/\/www\.notion\.so\/(?<id>\w+)/

export function parseMentionPageToInSitePage({
  block,
  posts,
}: {
  block: MdBlock
  posts: Posts
}) {
  const matches = block.parent.match(new RegExp(reNotionMentionPage, 'g'))
  if (matches) {
    for (const url of matches) {
      const matched = url.match(reNotionMentionPage)
      const id = matched!.groups!.id
      const post = posts.find((post) => {
        // strip `-`
        // Vercel current in Nodejs 14
        return post.id.replace(/-/g, '') === id
      })

      if (post) {
        // post slug
        block.parent = block.parent.replace(url, '/' + post.attributes.slug)
      }
    }
  }

  return block
}
