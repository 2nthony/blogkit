export type Text = {
  type: string
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
export type Block = {
  id: string
  type: string
} & { [blockType: string]: BlockType }
export type BlockType = {
  [type: string]: Text[]
} & {
  checked?: boolean
}

export type BlockParser = {
  [blockType: string]: (value: BlockType, childrenMd?: string) => string
}

export type TextParser = {
  [textType: string]: (value: Text) => string
}
