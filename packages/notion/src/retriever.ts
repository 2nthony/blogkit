import { get } from 'lodash'

export const PropertyRetrievers: { [propertyType: string]: string } = {
  date: 'date.start',
  title: 'title[0].text.content',
  rich_text: 'rich_text[0].text.content',
}

export function retriever(property: any) {
  const keypath = PropertyRetrievers[property.type]

  return get(property, keypath)
}
