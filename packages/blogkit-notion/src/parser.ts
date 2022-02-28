import {
  BulletedListItemBlock,
  CodeBlock,
  HeadingBlock,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  RichTextObject,
  TodoBlock,
} from './types'

export function parseRichTextObject(richTextObject: RichTextObject) {
  const { type, text, annotations, href } = richTextObject

  return {
    type,
    text,
    annotations,
    href,
  }
}

export function parseParagraphBlock(paragraphBlock: ParagraphBlock) {
  const { text } = paragraphBlock.paragraph

  return {
    text,
  }
}

export function parseHeadingBlock(headingBlock: HeadingBlock) {
  const { heading_1, heading_2, heading_3 } = headingBlock
  const text = heading_1?.text ?? heading_2?.text ?? heading_3?.text

  return {
    text,
  }
}

export function parseNumberedListItemBlock(
  numberedListItemBlock: NumberedListItemBlock,
) {
  const { text } = numberedListItemBlock.numbered_list_item

  return {
    text,
  }
}

export function parseBulletedListItemBlock(
  bulletedListItemBlock: BulletedListItemBlock,
) {
  const { text } = bulletedListItemBlock.bulleted_list_item

  return {
    text,
  }
}

export function parseCodeBlock(codeBlock: CodeBlock) {
  const { language, text } = codeBlock.code

  return {
    language,
    code: text[0].text.content,
  }
}

export function parseTodoBlock(todoBlock: TodoBlock) {
  const { checked, text } = todoBlock.to_do

  return {
    checked,
    text,
  }
}

export function parseImageBlock(imageBlock: ImageBlock) {
  const src =
    imageBlock.image.type === 'external'
      ? imageBlock.image.external?.url
      : imageBlock.image.file?.url

  return {
    src,
  }
}

export function parseQuoteBlock(quoteBlock: QuoteBlock) {
  const { text } = quoteBlock.quote

  return {
    text,
  }
}
