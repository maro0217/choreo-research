export type Article = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    body: string
    category: {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      revisedAt: string
      name: string
    }
  }