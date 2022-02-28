export type BlockObject = {
  id: string
  object: 'block'
  type:
    | 'paragraph'
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'bulleted_list_item'
    | 'numbered_list_item'
    | 'code'
    | 'to_do'
    | 'toggle'
    | 'child_page'
    | 'child_database'
    | 'embed'
    | 'image'
    | 'video'
    | 'file'
    | 'pdf'
    | 'bookmark'
    | 'callout'
    | 'quote'
    | 'equation'
    | 'divider'
    | 'table_of_contents'
    | 'column'
    | 'column_list'
    | 'link_preview'
    | 'synced_block'
    | 'template'
    | 'link_to_page'
    | 'table'
    | 'table_row'
    | 'unsupported'
  has_children: boolean
}

export type FileObject = {
  type: 'external' | 'file'
  external?: {
    url: string
  }
  file?: {
    url: string
    expiry_time: Date
  }
}

export type RichTextObject = BlockObject & {
  type: 'text' | 'mention' | 'equation'
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color:
      | 'default'
      | 'gray'
      | 'brown'
      | 'orange'
      | 'yellow'
      | 'green'
      | 'blue'
      | 'purple'
      | 'pink'
      | 'red'
  }
  href: string | null
}
export type ParagraphObject = {
  text: RichTextObject[]
}
export type HeadingObject = {
  text: RichTextObject[]
}
export type BulletedListItemObject = {
  text: RichTextObject[]
}
export type NumberedListItemObject = {
  text: RichTextObject[]
}
export type CodeObject = {
  text: RichTextObject[]
  caption: RichTextObject[]
  language: string
}
export type TodoObject = {
  text: RichTextObject[]
  checked: boolean
}
export type QuoteObject = {
  text: RichTextObject[]
}

// Blocks
export type ParagraphBlock = BlockObject & {
  type: 'paragraph'
  paragraph: ParagraphObject
}
export type HeadingBlock = BlockObject & {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  heading_1?: HeadingObject
  heading_2?: HeadingObject
  heading_3?: HeadingObject
}
export type BulletedListItemBlock = BlockObject & {
  type: 'bulleted_list_item'
  bulleted_list_item: BulletedListItemObject
}
export type NumberedListItemBlock = BlockObject & {
  type: 'bulleted_list_item'
  numbered_list_item: NumberedListItemObject
}
export type ImageBlock = BlockObject & {
  type: 'image'
  image: FileObject
}
export type CodeBlock = BlockObject & {
  type: 'code'
  code: CodeObject
}
export type TodoBlock = BlockObject & {
  type: 'to_do'
  to_do: TodoObject
}
export type QuoteBlock = BlockObject & {
  type: 'quote'
  quote: QuoteObject
}

export type Block =
  | ParagraphBlock
  | ImageBlock
  | HeadingBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | CodeBlock
  | TodoBlock
  | QuoteBlock
  | { [type: string]: string | any }

export type BlockParser = {
  [blockType: string]: (block: Block, childrenMd?: string) => string
}

export type RichTextParser = {
  [textType: string]: (block: Block) => string
}
