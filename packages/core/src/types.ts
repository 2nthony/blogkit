type TODO = any

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
export type Feed = {
  slug: string
  markdown?: string
  title: string
  date: Date
  description?: string
}
export type Posts = Pick<Post, 'id' | 'attributes'>[]

export type Request = {
  getPostList(): Promise<Posts>
  getPost(slug: string): Promise<Omit<Post, 'html'>>
  getFeeds?(): Promise<Feed[]>
}

export type BlogkitConfig = {
  siteConfig: {
    title: string
    author?: string
    url?: string
  }
  theme: {
    Home: TODO
    Post: TODO
  }
  request: Request
}

export type HomePageProps = {
  posts: Posts
  siteConfig: BlogkitConfig['siteConfig']
}
export type PostPageProps = {
  post: Post
  siteConfig: BlogkitConfig['siteConfig']
}
