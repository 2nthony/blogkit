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
export type Posts = Omit<Post, 'body'>[]

export type Request = {
  getPostList(): Promise<Posts>
  getPost(slug: string): Promise<Post>
}

export type BlogkitConfig = {
  siteConfig: {
    title: string
    url?: string
  }
  theme: TODO
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
