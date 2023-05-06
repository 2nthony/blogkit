# Blogkit (beta)

[![](https://badgen.net/npm/v/blogkit?label=&color=cyan)](https://npmjs.com/package/blogkit)

Blogkit is a unified blog engine inspired by [Sairin](https://github.com/djyde/sairin).

![Notion Example](https://cdn.jsdelivr.net/gh/2nthony/statics@main/uPic/aZpKgJmeSC4X.png)

## Ecosystems

### Requests

| Name                                                                                   | Version                                                                                                    | Description                        |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [blogkit-notion](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-notion) | [![](https://badgen.net/npm/v/blogkit-notion?label=&color=cyan)](https://npmjs.com/package/blogkit-notin)  | Request preset for Notion database |
| [blogkit-yuque](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-yuque)   | [![](https://badgen.net/npm/v/blogkit-yuque?label=&color=cyan)](https://npmjs.com/package/blogkit-yuque)   | Request preset for Yuque repo      |
| [blogkit-strapi](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-strapi) | [![](https://badgen.net/npm/v/blogkit-strapi?label=&color=cyan)](https://npmjs.com/package/blogkit-strapi) | Request preset for Strapi CMS      |

### Templates

| Name                                                                        | Description                      |
| --------------------------------------------------------------------------- | -------------------------------- |
| [blogkit-notion-starter](https://github.com/2nthony/blogkit-notion-starter) | Notion request and minimal theme |
| [blogkit-yuque-starter](https://github.com/2nthony/blogkit-yuque-starter)   | Yuque request and minimal theme  |
| [blogkit-strapi-starter](https://github.com/2nthony/blogkit-strapi-starter) | Strapi CMS and minimal theme     |

### Themes

| Name                                                                                                 | Description   |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| [blogkit-theme-minimal](https://github.com/2nthony/blogkit/tree/main/packages/blogkit-theme-minimal) | Minimal theme |

## Configuration

`blogkit.config.js`

```ts
// with ts intellisense
import { defineBlogkitConfig } from 'blogkit'

export default defineBlogkitConfig({
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

Set the `request` in `blogkit.config.js`.

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
