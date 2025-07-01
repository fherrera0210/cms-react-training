"use client"

import { Comic } from "./comic"
import styles from "./comic-grid.module.css"

export function ComicGrid({ comics }) {
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
          />
        ))}
      </div>
    </div>
  )
}
