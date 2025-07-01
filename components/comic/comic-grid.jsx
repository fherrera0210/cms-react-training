"use client"

import { Comic } from "./comic"
import { useComics } from "../../hooks/use-comics"
import styles from "./comic-grid.module.css"

export function ComicGrid() {
  const { comics, loading, error } = useComics()

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Viz Media Collection</h1>
          <p>Loading amazing manga and comics from Viz Media...</p>
        </header>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.loadingCard}>
              <div className={styles.loadingSkeleton}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonMeta}></div>
                  <div className={styles.skeletonDescription}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Viz Media Collection</h1>
          <p>Discover incredible manga and graphic novels from Viz Media</p>
        </header>
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            <h2>Unable to Load Comics</h2>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (comics.length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Viz Media Collection</h1>
          <p>Discover incredible manga and graphic novels from Viz Media</p>
        </header>
        <div className={styles.emptyContainer}>
          <div className={styles.emptyMessage}>
            <h2>No Comics Found</h2>
            <p>We couldn't find any Viz Media comics at the moment. Please try again later.</p>
            <button className={styles.retryButton} onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Viz Media Collection</h1>
        <p>Discover incredible manga and graphic novels from Viz Media</p>
        <div className={styles.resultCount}>
          Found {comics.length} comic{comics.length !== 1 ? "s" : ""}
        </div>
      </header>

      <div className={styles.grid}>
        {comics.map((comic) => (
          <Comic
            key={comic.id}
            title={comic.title}
            coverImage={comic.coverImage}
            author={comic.author}
            issue={comic.issue}
            description={comic.description}
            publishDate={comic.publishDate}
            publisher={comic.publisher}
          />
        ))}
      </div>
    </div>
  )
}
