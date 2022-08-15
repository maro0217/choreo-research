export type Article = {
    id: string
    // createdAt: string
    // updatedAt: string
    // publishedAt: string
    // revisedAt: string
    title: string
    choreographer: string
    body: string
    category: {
      id: string
      name: string
    }
    thumbnail: {
      url: string
    }
    caption: string
  }