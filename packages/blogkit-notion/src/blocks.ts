import { getBlocks } from '.'
import {
  parseBulletedListItemBlock,
  parseCodeBlock,
  parseHeadingBlock,
  parseImageBlock,
  parseNumberedListItemBlock,
  parseParagraphBlock,
  parseRichTextObject,
  parseTodoBlock,
} from './parser'
import {
  Block,
  BlockParser,
  BulletedListItemBlock,
  CodeBlock,
  HeadingBlock,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  RichTextObject,
  RichTextParser,
  TodoBlock,
} from './types'

const tag = (t: string, content: string | null, attributes?: string) => {
  return `<${t} ${attributes || ''}>${content || ''}</${t}>`
}
const isExternalLink = (href: string | null) => /https?:\/\//.test(href || '')

const richTextParser: RichTextParser = {
  text: (block) => {
    const {
      text,
      annotations: { bold, italic, strikethrough, underline, code, color },
    } = parseRichTextObject(block as RichTextObject)

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
  mention: (block) => {
    const { href } = parseRichTextObject(block as RichTextObject)

    return tag(
      'a',
      href,
      `href="${href}"  target="${isExternalLink(href) ? '_blank' : '_self'}"`,
    )
  },
}

const parseText = (text: RichTextObject[] | undefined): string => {
  if (!text) {
    return ''
  }

  return text
    .map((v) => {
      const parserFn = richTextParser[v.type]
      return parserFn(v)
    })
    .join('')
}

const blockParser: BlockParser = {
  paragraph: (block) => {
    const { text } = parseParagraphBlock(block as ParagraphBlock)
    const content = parseText(text)

    return `<p>${content}</p>`
  },
  heading_1: (block) => {
    const { text } = parseHeadingBlock(block as HeadingBlock)

    return `# ${parseText(text)}`
  },
  heading_2: (block) => {
    const { text } = parseHeadingBlock(block as HeadingBlock)

    return `## ${parseText(text)}`
  },
  heading_3: (block) => {
    const { text } = parseHeadingBlock(block as HeadingBlock)

    return `### ${parseText(text)}`
  },
  bulleted_list_item: (block, childrenMd = '') => {
    const { text } = parseBulletedListItemBlock(block as BulletedListItemBlock)
    const children = childrenMd
      .split('- ')
      .filter(Boolean)
      .map((html) => `  - ${html}\n`)
      .join('')

    return `- ${parseText(text)}
${children}`
  },
  numbered_list_item: (block) => {
    const { text } = parseNumberedListItemBlock(block as NumberedListItemBlock)

    return `- ${parseText(text)}`
  },
  to_do: (block) => {
    const { checked, text } = parseTodoBlock(block as TodoBlock)

    return `- [${checked ? 'x' : ' '}] ${parseText(text)}`
  },
  code: (block) => {
    const { code, language } = parseCodeBlock(block as CodeBlock)

    return `\`\`\`${language}
${code}
\`\`\``
  },
  image: (block) => {
    const { src } = parseImageBlock(block as ImageBlock)
    return `![](${src})`
  },
}

export async function parseBlocksToMarkdown(blocks: Block[]) {
  const mds = await Promise.all(
    blocks.map(async (block) => {
      let childrenMd: string | undefined
      if (block.has_children) {
        const childrenBlocks = await getBlocks(block.id)
        childrenMd = await parseBlocksToMarkdown(childrenBlocks)
      }
      const parser = blockParser[block.type]
      const parsed = parser(block, childrenMd)
      return parsed
    }),
  )

  return mds.join('\n\n')
}
