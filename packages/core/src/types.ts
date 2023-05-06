type TODO = any

export interface Attributes {
  title: string
  slug: string
  date: string
  description?: string
}

export interface Post {
  id: string
  html?: string
  markdown?: string
  attributes: Attributes
}
export interface Feed {
  slug: string
  markdown?: string
  title: string
  date: Date
  description?: string
}
export type Posts = Pick<Post, 'id' | 'attributes'>[]

export interface Request {
  getPostList(): Promise<Posts>
  getPost(slug: string): Promise<Omit<Post, 'html'>>
  getFeeds?(): Promise<Feed[]>
}

export interface BlogkitConfig {
  siteConfig: {
    title: string
    author?: string
    url?: string
  }
  theme: {
    Home: TODO
    Post: TODO
  }
  themeConfig?: Record<string, any>
  request: Request | ((config: BlogkitConfig) => Request)
}

export interface PageProps {
  siteConfig: BlogkitConfig['siteConfig']
  themeConfig: BlogkitConfig['themeConfig']
}
export type HomePageProps = {
  posts: Posts
} & PageProps
export type PostPageProps = {
  post: Post
} & PageProps
