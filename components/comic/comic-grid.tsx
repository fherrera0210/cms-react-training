"use client"

import { Comic } from "./comic"
import { useComics } from "@/hooks/use-comics"
import styles from "./comic-grid.module.css"

interface ComicGridProps {
  onBuy?: (comicId: string) => void
}

export function ComicGrid({ onBuy }: ComicGridProps) {
  const { comics, loading, error } = useComics()

  const handleBuy = (comicId: string) => {
    if (onBuy) {
      onBuy(comicId)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Viz Media Collection</h1>
          <p>Loading amazing manga and comics from Viz Media...</p>
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
          <h1>Viz Media Collection</h1>
        </header>
        <div className={styles.error}>
          <h2>Unable to Load Comics</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  if (comics.length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Viz Media Collection</h1>
        </header>
        <div className={styles.error}>
          <h2>No Comics Found</h2>
          <p>We couldn't find any Viz Media comics at the moment. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Viz Media Collection</h1>
        <p>Discover incredible manga from Viz Media</p>
        <span className={styles.count}>
          Found {comics.length} comic{comics.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className={styles.grid}>
        {comics.map((comic) => (
          <Comic key={comic.id} {...comic} onBuy={() => handleBuy(comic.id)} />
        ))}
      </div>
    </div>
  )
}
