export interface Comic {
  id: string
  title: string
  coverImage: string
  author: string
  issue: number
  description: string
  publishDate: string
  publisher: string
  characters?: string[]
  creators?: string[]
}

export interface OpenLibraryBook {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
  subject?: string[]
  publisher?: string[]
  person?: string[]
}

export interface ApiResponse {
  success: boolean
  data: OpenLibraryBook[]
  error?: string
  total?: number
}

export interface FilterOptions {
  character: string
  creator: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

export interface FavoriteComic {
  id: string
  title: string
  coverImage: string
  author: string
  addedAt: string
}