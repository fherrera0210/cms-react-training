import { NextResponse } from "next/server"

const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org"

export async function POST(request) {
  try {
    const { limit = 50 } = await request.json()

    const searches = [
      `publisher:"Viz Media" OR publisher:"VIZ Media" OR publisher:"Viz"`,
      `(naruto OR "one piece" OR "death note" OR "bleach" OR "dragon ball") AND (manga OR comic)`,
      `manga AND viz`,
    ]

    let allResults = []

    for (const searchQuery of searches) {
      const searchParams = new URLSearchParams({
        q: searchQuery,
        limit: "20",
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
          const data = await response.json()
          if (data.docs && data.docs.length > 0) {
            allResults = allResults.concat(data.docs)
          }
        }
      } catch (searchError) {
        continue
      }
    }

    const uniqueResults = allResults.filter((book, index, self) => {
      const isUnique = index === self.findIndex((b) => b.key === book.key)
      if (!isUnique) return false

      const publishers = book.publisher || []
      const title = (book.title || "").toLowerCase()
      const subjects = book.subject || []

      const isVizMedia =
        publishers.some((pub) => pub.toLowerCase().includes("viz")) ||
        title.includes("viz") ||
        subjects.some((subject) => subject.toLowerCase().includes("viz"))

      const isMangaOrComic =
        subjects.some((subject) =>
          ["manga", "comic", "graphic novel", "anime", "japanese"].some((term) => subject.toLowerCase().includes(term)),
        ) ||
        title.includes("manga") ||
        title.includes("comic") ||
        ["naruto", "one piece", "death note", "bleach", "dragon ball", "my hero academia"].some((series) =>
          title.includes(series),
        )

      return (isVizMedia || isMangaOrComic) && book.cover_i
    })

    const sortedResults = uniqueResults
      .sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
      .slice(0, 12)

    return NextResponse.json({
      success: true,
      data: sortedResults,
      total: sortedResults.length,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      data: [],
    })
  }
}
