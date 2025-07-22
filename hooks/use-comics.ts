"use client"

import { useState, useEffect } from "react"
import type { Comic, OpenLibraryBook, ApiResponse } from "../types/comic"

interface UseComicsReturn {
  comics: Comic[]
  loading: boolean
  error: string | null
}

export function useComics(): UseComicsReturn {
  const [comics, setComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const transformData = (books: OpenLibraryBook[]): Comic[] => {
    return books.map((book, index) => {
      
      const cleanTitle =
        book.title
          ?.replace(/,?\s*vol\.?\s*\d+/i, "")
          ?.replace(/,?\s*#\d+/, "")
          ?.replace(/\s*$$\d{4}$$/, "")
          ?.trim() || "Unknown Title"

      // Get volume/issue number
      const volumeMatch =
        book.title?.match(/vol\.?\s*(\d+)/i) || book.title?.match(/#(\d+)/) || book.title?.match(/(\d+)$/)
      const issue = volumeMatch ? Number.parseInt(volumeMatch[1]) : 1

      // Get cover image
      const coverImage = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : `https://via.placeholder.com/300x450/ff6b35/ffffff?text=${encodeURIComponent(cleanTitle.substring(0, 10))}`

      // Get publisher
      const publisher =
        book.publisher?.find((pub) => pub.toLowerCase().includes("viz")) || book.publisher?.[0] || "Unknown Publisher"

      return {
        id: book.key?.replace("/works/", "") || `book-${index}`,
        title: cleanTitle,
        coverImage,
        author: book.author_name?.[0] || "Unknown Author",
        issue,
        description: "A captivating story with beautiful artwork and engaging narrative.",
        publishDate: book.first_publish_year?.toString() || "Unknown",
        publisher,
      }
    })
  }

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch("/api/comics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 12 }),
        })

        const result: ApiResponse = await response.json()

        if (result.success && result.data?.length > 0) {
          setComics(transformData(result.data))
        } else {
          setError("No comics found.")
        }
      } catch (err) {
        setError("Failed to load comics.")
      } finally {
        setLoading(false)
      }
    }

    fetchComics()
  }, [])

  return { comics, loading, error }
}
