# Blogkit (beta)

[![](https://badgen.net/npm/v/blogkit?label=&color=cyan)](https://npmjs.com/package/blogkit)

Blogkit is an unified blog engine inspired by [Sairin](https://github.com/djyde/sairin).

![](https://cdn.jsdelivr.net/gh/2nthony/statics@main/uPic/aZpKgJmeSC4X.png)

## Get started with starter templates

| Template                                                                    | One-Click Deploy                                                                                                                                                                                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [blogkit-notion-starter](https://github.com/2nthony/blogkit-notion-starter) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2nthony%2Fblogkit-notion-starter&env=NOTION_TOKEN,NOTION_DATABASE_ID) |
| [blogkit-yuque-starter](https://github.com/2nthony/blogkit-yuque-starter)   | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2nthony%2Fblogkit-yuque-starter&env=YUQUE_TOKEN,YUQUE_NAMESPACE)      |

## Themes

| Theme                                                                                                | Description   |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal) | Minimal theme |

## Configuration

`blogkit.config.ts`

```ts
// with ts intellisense
import { defineConfig } from 'blogkit'

export default defineConfig({
  siteConfig: {
    title: 'MyBlog', // required
    author: '',
    url: '',
  },
  theme: {},
  request: {},
})
```

More details see [types.ts](./packages/core/src/types.ts).

## Development

### Integrate with custom service

Set the `request` in `blogkit.config.ts`.

This is how [blogkit-notion](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-notion) provided.

### Theme

TODO, if you still, you could see the source code of [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal).

## Q

### Should I redeploy the Vercel project after my post updated?

No.

### How long will my post update?

Every 1 minute.

## License

MIT © [2nthony](https://github.com/2nthony)
