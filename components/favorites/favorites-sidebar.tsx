"use client"

import { X, Heart, Trash2 } from "lucide-react"
import type { FavoriteComic } from "../../types/comic"
import styles from "./favorites-sidebar.module.css"

interface FavoritesSidebarProps {
  isOpen: boolean
  onClose: () => void
  favorites: FavoriteComic[]
  onRemoveFavorite: (comicId: string) => void
  onClearAll: () => void
}

export function FavoritesSidebar({ isOpen, onClose, favorites, onRemoveFavorite, onClearAll }: FavoritesSidebarProps) {
  if (!isOpen) return null

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Heart className={styles.heartIcon} />
            <h2>My Favorites</h2>
            <span className={styles.count}>({favorites.length}/10)</span>
          </div>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close favorites">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {favorites.length === 0 ? (
            <div className={styles.empty}>
              <Heart size={48} className={styles.emptyIcon} />
              <p>No favorites yet</p>
              <span>Add titles to your favorites to see them here!</span>
            </div>
          ) : (
            <>
              <div className={styles.actions}>
                <button onClick={onClearAll} className={styles.clearButton}>
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>

              <div className={styles.favoritesList}>
                {favorites.map((favorite) => (
                  <div key={favorite.id} className={styles.favoriteItem}>
                    <img
                      src={favorite.coverImage || "/placeholder.svg"}
                      alt={`${favorite.title} cover`}
                      className={styles.coverImage}
                    />
                    <div className={styles.info}>
                      <h3 className={styles.favoriteTitle}>{favorite.title}</h3>
                      <p className={styles.favoriteAuthor}>{favorite.author}</p>
                      <span className={styles.addedDate}>Added {new Date(favorite.addedAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => onRemoveFavorite(favorite.id)}
                      className={styles.removeButton}
                      aria-label={`Remove ${favorite.title} from favorites`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
