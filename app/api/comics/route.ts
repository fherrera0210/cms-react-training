import { type NextRequest, NextResponse } from "next/server"
import type { OpenLibraryBook, ApiResponse } from "../../../types/comic"

const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org"

interface SearchResponse {
  docs: OpenLibraryBook[]
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const { limit = 12 }: { limit?: number } = await request.json()

    // Try multiple search strategies
    const searches = [
      'publisher:"Viz Media"',
      'publisher:"VIZ Media"',
      "subject:manga",
      'naruto OR "one piece" OR "death note" OR bleach',
    ]

    let allResults: OpenLibraryBook[] = []

    for (const query of searches) {
      const searchParams = new URLSearchParams({
        q: query,
        limit: "10",
        fields: "key,title,author_name,first_publish_year,cover_i,subject,publisher",
        sort: "new",
      })

      const url = `${OPEN_LIBRARY_BASE_URL}/search.json?${searchParams}`

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Comic Collection App",
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const data: SearchResponse = await response.json()
          if (data.docs && data.docs.length > 0) {
            allResults = allResults.concat(data.docs)
          }
        }
      } catch (searchError) {
        console.log(`Search failed for: ${query}`, (searchError as Error).message)
        continue
      }
    }

    // Filter for unique books with covers
    const uniqueBooks = allResults.filter((book, index, self) => {
      const isUnique = index === self.findIndex((b) => b.key === book.key)
      return isUnique && book.cover_i
    })

    console.log(`Found ${uniqueBooks.length} books total`)

    return NextResponse.json({
      success: true,
      data: uniqueBooks.slice(0, limit),
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      data: [],
    })
  }
}