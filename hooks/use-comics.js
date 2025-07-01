"use client"

import { useState, useEffect } from "react"

export function useComics() {
  const [comics, setComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const transformData = (books) => {
    if (!books || books.length === 0) return []

    return books.map((book, index) => {
      const getCoverUrl = (coverId) => {
        if (coverId) {
          return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        }
        return `https://via.placeholder.com/300x450/ff6b35/ffffff?text=${encodeURIComponent(book.title?.substring(0, 15) || "Manga")}`
      }

      const getAuthor = (authorNames) => {
        if (authorNames && authorNames.length > 0) {
          return authorNames[0]
        }
        return "Unknown Author"
      }

      const getVolumeNumber = (title) => {
        const volMatch = title.match(/vol\.?\s*(\d+)/i)
        if (volMatch) return Number.parseInt(volMatch[1])
        const numMatch = title.match(/#(\d+)/)
        if (numMatch) return Number.parseInt(numMatch[1])
        const endNumMatch = title.match(/(\d+)$/)
        if (endNumMatch) return Number.parseInt(endNumMatch[1])
        return 1
      }

      const generateDescription = (subjects) => {
        if (!subjects || subjects.length === 0) {
          return "A compelling story that will captivate readers with its unique narrative and characters."
        }

        const relevantSubjects = subjects.filter((subject) =>
          ["action", "adventure", "romance", "comedy", "drama", "fantasy", "supernatural"].some((genre) =>
            subject.toLowerCase().includes(genre),
          ),
        )

        if (relevantSubjects.length > 0) {
          return `An engaging ${relevantSubjects[0].toLowerCase()} story with compelling characters and captivating storytelling.`
        }

        return "A captivating story with beautiful artwork and engaging narrative."
      }

      const getCleanTitle = (title) => {
        return title
          .replace(/,?\s*vol\.?\s*\d+/i, "")
          .replace(/,?\s*#\d+/, "")
          .replace(/,?\s*\d+$/, "")
          .trim()
      }

      const getPublisher = (publishers) => {
        if (publishers && publishers.length > 0) {
          const vizPublisher = publishers.find((pub) => pub.toLowerCase().includes("viz"))
          if (vizPublisher) return vizPublisher
          return publishers[0]
        }
        return "Viz Media"
      }

      return {
        id: book.key?.replace("/works/", "") || `book-${index}`,
        title: getCleanTitle(book.title) || "Unknown Title",
        coverImage: getCoverUrl(book.cover_i),
        author: getAuthor(book.author_name),
        issue: getVolumeNumber(book.title),
        description: generateDescription(book.subject),
        publishDate: book.first_publish_year ? `${book.first_publish_year}` : "Unknown",
        publisher: getPublisher(book.publisher),
      }
    })
  }

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/comics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit: 50 }),
        })

        const result = await response.json()

        if (result.success && result.data && result.data.length > 0) {
          const transformedData = transformData(result.data)
          setComics(transformedData)
        } else {
          setComics([])
          setError("No Viz Media comics found. Please try again later.")
        }
      } catch (err) {
        setComics([])
        setError("Failed to load comics. Please check your internet connection and try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchComics()
  }, [])

  return { comics, loading, error }
}
