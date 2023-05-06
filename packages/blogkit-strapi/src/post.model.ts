export interface StrapiPostList {
  data: {
    id: number
    attributes: { [key: string]: string } & {
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }[]
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
    attributes: { [key: string]: string } & {
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }
  meta: {}
}
