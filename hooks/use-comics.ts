"use client"

import { useState, useEffect, useCallback } from "react"
import type { Comic, OpenLibraryBook, ApiResponse, FilterOptions, PaginationInfo } from "../types/comic"

interface UseComicsReturn {
  comics: Comic[]
  loading: boolean
  error: string | null
  pagination: PaginationInfo
  filters: FilterOptions
  availableCharacters: string[]
  availableCreators: string[]
  handleFilterChange: (newFilters: FilterOptions) => void
  handlePageChange: (page: number) => void
}

const ITEMS_PER_PAGE = 12

const DEFAULT_PAGINATION: PaginationInfo = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  totalItems: 0,
}

export function useComics(): UseComicsReturn {
  const [allComics, setAllComics] = useState<Comic[]>([])
  const [filteredComics, setFilteredComics] = useState<Comic[]>([])
  const [displayedComics, setDisplayedComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<FilterOptions>({ character: "", creator: "" })
  const [pagination, setPagination] = useState<PaginationInfo>(DEFAULT_PAGINATION)

  const availableCharacters = Array.from(
    new Set(allComics.flatMap((comic) => comic.characters || []).filter(Boolean)),
  ).sort()

  const availableCreators = Array.from(
    new Set(allComics.flatMap((comic) => comic.creators || []).filter(Boolean)),
  ).sort()

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

      const titleLower = cleanTitle.toLowerCase()
      const subjectsLower = (book.subject || []).map((s) => s.toLowerCase()).join(" ")
      const searchText = `${titleLower} ${subjectsLower}`

      const characters: string[] = []

      // Popular manga characters
      const characterMap = {
        "Naruto Uzumaki": ["naruto", "uzumaki"],
        "Monkey D. Luffy": ["luffy", "one piece", "monkey d"],
        "Son Goku": ["goku", "dragon ball", "son goku"],
        "Ichigo Kurosaki": ["ichigo", "bleach", "kurosaki"],
        "Light Yagami": ["light yagami", "death note", "kira"],
        "Edward Elric": ["edward elric", "fullmetal alchemist", "elric"],
        "Eren Yeager": ["eren", "attack on titan", "yeager", "jaeger"],
        "Tanjiro Kamado": ["tanjiro", "demon slayer", "kamado"],
        "Senku Ishigami": ["senku", "dr stone", "ishigami"],
        Denji: ["denji", "chainsaw man"],
      }

      Object.entries(characterMap).forEach(([character, keywords]) => {
        if (keywords.some((keyword) => searchText.includes(keyword))) {
          characters.push(character)
        }
      })

      if (characters.length === 0) {
        characters.push("General")
      }

      const creators = [...(book.author_name || []), ...(book.person || [])].filter(Boolean)

      return {
        id: book.key?.replace("/works/", "") || `book-${index}`,
        title: cleanTitle,
        coverImage,
        author: book.author_name?.[0] || "Unknown Author",
        issue,
        description: "A captivating story with beautiful artwork and engaging narrative.",
        publishDate: book.first_publish_year?.toString() || "Unknown",
        publisher,
        characters,
        creators: creators.length > 0 ? creators : [book.author_name?.[0] || "Unknown Creator"],
      }
    })
  }

  // Current filters
  const applyFilters = useCallback(() => {
    let filtered = allComics

    if (filters.character) {
      filtered = filtered.filter((comic) =>
        comic.characters?.some((char) => char.toLowerCase().includes(filters.character.toLowerCase())),
      )
    }

    if (filters.creator) {
      filtered = filtered.filter((comic) =>
        comic.creators?.some((creator) => creator.toLowerCase().includes(filters.creator.toLowerCase())),
      )
    }

    setFilteredComics(filtered)
    setCurrentPage(1) 
  }, [allComics, filters])

  const applyPagination = useCallback(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setDisplayedComics(filteredComics.slice(startIndex, endIndex))

    setPagination({
      currentPage,
      totalPages: Math.max(1, Math.ceil(filteredComics.length / ITEMS_PER_PAGE)),
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: filteredComics.length,
    })
  }, [filteredComics, currentPage])

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch("/api/comics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 50 }),
        })

        const result: ApiResponse = await response.json()

        if (result.success && result.data?.length > 0) {
          const transformedComics = transformData(result.data)
          setAllComics(transformedComics)
          setFilteredComics(transformedComics)
        } else {
          setError("No titles found.")
        }
      } catch (err) {
        setError("Failed to load comics.")
      } finally {
        setLoading(false)
      }
    }

    fetchComics()
  }, [])

  useEffect(() => {
    if (allComics.length > 0) {
      applyFilters()
    }
  }, [allComics, filters, applyFilters])

  useEffect(() => {
    applyPagination()
  }, [filteredComics, currentPage, applyPagination])

  return {
    comics: displayedComics,
    loading,
    error,
    pagination,
    filters,
    availableCharacters,
    availableCreators,
    handleFilterChange,
    handlePageChange,
  }
}