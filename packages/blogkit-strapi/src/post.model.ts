export interface StrapiPostList {
  data: {
    id: number
    attributes: {
      title: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      content: string
      excerpt: string
    }
  }[],
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiPost {
  data: {
    id: number
    attributes: {
      title: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      content: string
      excerpt: string
    }
  },
  meta: {}
}
