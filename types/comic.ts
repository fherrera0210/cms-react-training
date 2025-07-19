export interface Comic {
  id: string
  title: string
  coverImage: string
  author: string
  issue: number
  description: string
  publishDate: string
  publisher: string
}

export interface OpenLibraryBook {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
  subject?: string[]
  publisher?: string[]
}

export interface ApiResponse {
  success: boolean
  data: OpenLibraryBook[]
  error?: string
}
