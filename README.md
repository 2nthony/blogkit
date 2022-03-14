# Blogkit (beta)

[![](https://badgen.net/npm/v/blogkit?label=&color=cyan)](https://npmjs.com/package/blogkit)

Blogkit is a unified blog engine inspired by [Sairin](https://github.com/djyde/sairin).

![Notion Example](https://cdn.jsdelivr.net/gh/2nthony/statics@main/uPic/aZpKgJmeSC4X.png)

## Get started with starter templates

| Template                                                                    | Description     |
| --------------------------------------------------------------------------- | --------------- |
| [blogkit-notion-starter](https://github.com/2nthony/blogkit-notion-starter) | Notion database |
| [blogkit-yuque-starter](https://github.com/2nthony/blogkit-yuque-starter)   | Yuque repo      |
| [blogkit-strapi-starter](https://github.com/2nthony/blogkit-strapi-starter) | Strapi CMS      |

## Themes

| Theme                                                                                                | Description   |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal) | Minimal theme |

## Configuration

`blogkit.config.js`

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

Details to see [types.ts](./packages/core/src/types.ts), but more recommend to see [blogkit-example](https://github.com/2nthony/blogkit-example).

## Development

For full example see [blogkit-example](https://github.com/2nthony/blogkit-example).

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
