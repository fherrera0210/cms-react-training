"use client"

import { useState, useEffect, useCallback } from "react"
import type { Comic, FavoriteComic } from "../types/comic"

const FAVORITES_STORAGE_KEY = "comic-favorites"
const MAX_FAVORITES = 10

interface UseFavoritesReturn {
  favorites: FavoriteComic[]
  favoriteIds: Set<string>
  favoritesCount: number
  isAtLimit: boolean
  isFavorite: (comicId: string) => boolean
  addToFavorites: (comic: Comic) => boolean
  removeFromFavorites: (comicId: string) => void
  toggleFavorite: (comic: Comic) => void
  clearAllFavorites: () => void
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteComic[]>([])
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  // Load favorites
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        const parsedFavorites: FavoriteComic[] = JSON.parse(stored)
        setFavorites(parsedFavorites)
        setFavoriteIds(new Set(parsedFavorites.map((fav) => fav.id)))
      }
    } catch (error) {
      console.error("Error loading favorites from local:", error)
    }
  }, [])

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error("Error saving favorites to local:", error)
    }
  }, [favorites])

  const isFavorite = useCallback(
    (comicId: string): boolean => {
      return favoriteIds.has(comicId)
    },
    [favoriteIds],
  )

  const addToFavorites = useCallback(
    (comic: Comic): boolean => {
      if (favorites.length >= MAX_FAVORITES) {
        return false
      }

      if (favoriteIds.has(comic.id)) {
        return true
      }

      const newFavorite: FavoriteComic = {
        id: comic.id,
        title: comic.title,
        coverImage: comic.coverImage,
        author: comic.author,
        addedAt: new Date().toISOString(),
      }

      setFavorites((prev) => [...prev, newFavorite])
      setFavoriteIds((prev) => new Set([...prev, comic.id]))
      return true
    },
    [favorites.length, favoriteIds],
  )

  const removeFromFavorites = useCallback((comicId: string): void => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== comicId))
    setFavoriteIds((prev) => {
      const newSet = new Set(prev)
      newSet.delete(comicId)
      return newSet
    })
  }, [])

  const toggleFavorite = useCallback(
    (comic: Comic): void => {
      if (isFavorite(comic.id)) {
        removeFromFavorites(comic.id)
      } else {
        addToFavorites(comic)
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites],
  )

  const clearAllFavorites = useCallback((): void => {
    setFavorites([])
    setFavoriteIds(new Set())
  }, [])

  return {
    favorites,
    favoriteIds,
    favoritesCount: favorites.length,
    isAtLimit: favorites.length >= MAX_FAVORITES,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearAllFavorites,
  }
}
