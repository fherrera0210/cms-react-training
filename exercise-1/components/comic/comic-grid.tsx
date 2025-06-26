"use client"

import { Comic } from "./comic"
import styles from "./comic-grid.module.css"

interface ComicData {
  id: string
  title: string
  coverImage: string
  author: string
  issue: number
  description: string
  publishDate: string
}

interface ComicGridProps {
  comics: ComicData[]
  onBuy?: (comicId: string) => void
}

export function ComicGrid({ comics, onBuy }: ComicGridProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Comic Collection</h1>
        <p>List Subtitle</p>
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
            onBuy={() => onBuy?.(comic.id)}
          />
        ))}
      </div>
    </div>
  )
}
