import { getBlocks } from '.'
import { Block, BlockParser, BlockType, TextParser } from './types'

const tag = (t: string, content: string | null, attributes?: string) => {
  return `<${t} ${attributes || ''}>${content || ''}</${t}>`
}
const isExternalLink = (href: string | null) => /https?:\/\//.test(href || '')

const textParser: TextParser = {
  text: (v) => {
    const {
      text,
      annotations: { bold, italic, strikethrough, underline, code, color },
    } = v

    let res = text.content

    if (bold) {
      res = tag('b', res)
    }
    if (italic) {
      res = tag('i', res)
    }
    if (strikethrough) {
      res = tag('s', res)
    }
    if (underline) {
      res = tag('u', res)
    }
    if (code) {
      res = tag('code', res)
    }

    if (text.link) {
      res = tag(
        'a',
        res,
        `href="${text.link.url}" target="${
          isExternalLink(text.link.url) ? '_blank' : '_self'
        }"`,
      )
    }

    return `<span class="${color !== 'default' ? color : ''}">${res}</span>`
  },
  mention: (v) => {
    return tag(
      'a',
      v.href,
      `href="${v.href}"  target="${
        isExternalLink(v.href) ? '_blank' : '_self'
      }"`,
    )
  },
}

const blockParser: BlockParser = {
  paragraph: (value) => {
    const content = parseText(value)
    return `<p>${content}</p>`
  },
  heading_1: (value) => `# ${parseText(value)}`,
  heading_2: (value) => `## ${parseText(value)}`,
  heading_3: (value) => `### ${parseText(value)}`,
  bulleted_list_item: (value, childrenMd = '') => {
    const children = childrenMd
      .split('- ')
      .filter(Boolean)
      .map((html) => `  - ${html}\n`)
      .join('')
    return `- ${parseText(value)}
${children}`
  },
  numbered_list_item: (value) => {
    return `- ${parseText(value)}`
  },
  to_do: (value) => {
    return `- [${value.checked ? 'x' : ' '}] ${parseText(value)}`
  },
  code: (value) => {
    return `\`\`\`${value.language}
${value.text[0].text.content}
\`\`\``
  },
  // Unsupported
  synced_block: () => ``,
  table_of_contents: () => ``,
}

const parseText = ({ text }: BlockType): string => {
  if (!text) {
    return ''
  }

  return text
    .map((v) => {
      const parserFn = textParser[v.type]
      return parserFn(v)
    })
    .join('')
}

export async function parseBlocksToMarkdown(blocks: Block[]) {
  const mds = await Promise.all(
    blocks.map(async (block) => {
      const value = block[block.type]
      let childrenMd: string | undefined
      if (block.has_children) {
        const childrenBlocks = await getBlocks(block.id)
        childrenMd = await parseBlocksToMarkdown(childrenBlocks)
      }
      const parseFn =
        blockParser[block.type as string] || (() => `Unsupported block`)
      const parsed = parseFn(value, childrenMd)
      return parsed
    }),
  )

  return mds.join('\n\n')
}
