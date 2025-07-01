"use client"

import Image from "next/image"
import { Zap } from "lucide-react"
import styles from "./comic.module.css"
import { ComicButton } from "./comic-button"
import { ComicDetail } from "./comic-detail"

export function Comic({ title, coverImage, author, issue, description, publishDate }) {
  return (
    <div className={styles.comic}>
      <div className={styles.cover}>
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={`${title} cover`}
          width={300}
          height={450}
          className={styles.image}
        />
        <ComicButton>
          <Zap size={16} />
        </ComicButton>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <ComicDetail label="Issue" value={issue} />
          <ComicDetail label="Creator" value={author} />
          <ComicDetail label="Published" value={publishDate} />
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
