import { type NextRequest, NextResponse } from "next/server"
import type { OpenLibraryBook, ApiResponse } from "../../../types/comic"

const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org"

interface SearchResponse {
  docs: OpenLibraryBook[]
  numFound: number
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const { limit = 50 }: { limit?: number } = await request.json()

    // Enhanced search strategies with more characters and series
    const searches = [
      'publisher:"Viz Media"',
      'publisher:"VIZ Media"',
      "subject:manga",
      'subject:"Japanese comics"',
      // Popular series searches
      'naruto OR "one piece" OR "death note" OR bleach OR "dragon ball" OR "attack on titan"',
      '"demon slayer" OR "chainsaw man" OR "dr stone" OR "fullmetal alchemist"',
      // Author searches
      'author:"Masashi Kishimoto" OR author:"Eiichiro Oda" OR author:"Tsugumi Ohba"',
      'author:"Tite Kubo" OR author:"Akira Toriyama" OR author:"Hajime Isayama"',
      'author:"Koyoharu Gotouge" OR author:"Tatsuki Fujimoto" OR author:"Riichiro Inagaki"',
      'author:"Hiromu Arakawa"',
    ]

    let allResults: OpenLibraryBook[] = []

    for (const query of searches) {
      const searchParams = new URLSearchParams({
        q: query,
        limit: "15",
        fields: "key,title,author_name,first_publish_year,cover_i,subject,publisher,person",
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
      total: uniqueBooks.length,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
      data: [],
      total: 0,
    })
  }
}