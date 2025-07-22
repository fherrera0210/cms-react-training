"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Comic } from "./comic"
import { ComicFilters } from "../filters/comic-filters"
import { Pagination } from "../pagination/pagination"
import { FavoritesSidebar } from "../favorites/favorites-sidebar"
import { useComics } from "../../hooks/use-comics"
import { useFavorites } from "../../hooks/use-favorites"
import styles from "./comic-grid.module.css"

type ComicGridProps = {}

export function ComicGrid() {
  const [isFavoritesSidebarOpen, setIsFavoritesSidebarOpen] = useState(false)

  const {
    comics,
    loading,
    error,
    pagination,
    filters,
    availableCharacters,
    availableCreators,
    handleFilterChange,
    handlePageChange,
  } = useComics()

  const { favorites, favoritesCount, isAtLimit, isFavorite, toggleFavorite, removeFromFavorites, clearAllFavorites } =
    useFavorites()

  const handleToggleFavorite = (comic: any) => {
    toggleFavorite(comic)
  }

  const handleOpenFavorites = () => {
    setIsFavoritesSidebarOpen(true)
  }

  const handleCloseFavorites = () => {
    setIsFavoritesSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Manga Collection</h1>
          <p>Loading amazing titles...</p>
        </header>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeleton} data-testid={`loading-card-${index}`} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Manga Collection</h1>
        </header>
        <div className={styles.error}>
          <h2>Unable to load titles :(</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>Manga Collection</h1>
            <p>Discover incredible titles!</p>
            {pagination && pagination.totalItems > 0 && (
              <span className={styles.count}>
                Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                {pagination.totalItems}
              </span>
            )}
          </div>

          <button onClick={handleOpenFavorites} className={styles.favoritesButton}>
            <Heart size={20} fill={favoritesCount > 0 ? "currentColor" : "none"} />
            <span>Favorites</span>
            {favoritesCount > 0 && <span className={styles.favoritesCount}>{favoritesCount}</span>}
          </button>
        </div>
      </header>

      <ComicFilters
        onFilterChange={handleFilterChange}
        availableCharacters={availableCharacters}
        availableCreators={availableCreators}
      />

      {isAtLimit && (
        <div className={styles.limitWarning}>
          <p>You've reached the maximum of 10 favorites. Remove some to add more!</p>
        </div>
      )}

      {comics.length === 0 && !loading ? (
        <div className={styles.error}>
          <h2>No Titles Found</h2>
          <p>
            {filters.character || filters.creator
              ? "No titles match your current filters. Try adjusting your selection."
              : "We couldn't find any titles at the moment. Please try again later."}
          </p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {comics.map((comic) => (
              <Comic
                key={comic.id}
                {...comic}
                onToggleFavorite={() => handleToggleFavorite(comic)}
                isFavorite={isFavorite(comic.id)}
                isDisabled={!isFavorite(comic.id) && isAtLimit}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <FavoritesSidebar
        isOpen={isFavoritesSidebarOpen}
        onClose={handleCloseFavorites}
        favorites={favorites}
        onRemoveFavorite={removeFromFavorites}
        onClearAll={clearAllFavorites}
      />
    </div>
  )
}