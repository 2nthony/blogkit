# Blogkit (beta)

[![](https://badgen.net/npm/v/blogkit?label=)](https://npmjs.com/package/blogkit)
[![](https://badgen.net/npm/license/blogkit?label=)](./LICENSE)

Blogkit is an unified blog engine inspired by [Sairin](https://github.com/djyde/sairin).

## Get started with starter templates

| Template                                                                    | One-Click Deploy                                                                                                                                                                                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [blogkit-notion-starter](https://github.com/2nthony/blogkit-notion-starter) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2nthony%2Fblogkit-notion-starter&env=NOTION_TOKEN,NOTION_DATABASE_ID) |

## Themes

| Theme                                                                                                | Description   |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal) | Minimal theme |

## Development

### Integrate with custom service

Set the `request` to `blogkit.config.ts`:

```ts
export default {
  request: Request, // Types declaration read below
}
```

```ts
export type Attributes = {
  title: string
  slug: string
  date: Date
  description?: string
}
export type Post = {
  id: string
  html?: string
  markdown?: string
  attributes: Attributes
}
export type Posts = Omit<Post, 'body'>[]

export type Request = {
  getPostList(): Promise<Posts>
  getPost(slug: string): Promise<Post>
}
```

This is how [blogkit-notion](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-notion) did.

### Theme

TODO, if you still, you could see the source code of [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal).

## License

MIT © [2nthony](https://github.com/2nthony)
