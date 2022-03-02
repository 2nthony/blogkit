// override NotionToMarkdown

import { NotionToMarkdown as _NotinoToMarkdown } from 'notion-to-md'
import { Annotations } from 'notion-to-md/build/types'

export class NotionToMarkdown extends _NotinoToMarkdown {
  annotatePlainText(text: string, annotations: Annotations): string {
    // if text is all spaces, don't annotate
    if (text.match(/^\s*$/)) return text

    const leadingSpaceMatch = text.match(/^(\s*)/)
    const trailingSpaceMatch = text.match(/(\s*)$/)

    const leading_space = leadingSpaceMatch ? leadingSpaceMatch[0] : ''
    const trailing_space = trailingSpaceMatch ? trailingSpaceMatch[0] : ''

    text = text.trim()

    if (text !== '') {
      if (annotations.code) text = tag('code', text)
      if (annotations.bold) text = tag('b', text)
      if (annotations.italic) text = tag('i', text)
      if (annotations.strikethrough) text = tag('s', text)
      if (annotations.underline) text = tag('u', text)

      if (annotations.color !== 'default') {
        text = color(text, annotations.color)
      }
    }

    return leading_space + text + trailing_space
  }
}

function color(text: string, color: Annotations['color']) {
  return tag('span', text, `class="${color}"`)
}

function tag(t: string, content: string | null, attributes?: string) {
  return `<${t} ${attributes || ''}>${content || ''}</${t}>`
}
