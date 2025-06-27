"use client"

import Image from "next/image"
import { Zap } from "lucide-react"
import styles from "./comic.module.css"

interface ComicProps {
  title: string
  coverImage: string
  author: string
  issue: number
  description: string
  publishDate: string
  onBuy?: () => void
}

export function Comic({ title, coverImage, author, issue, description, publishDate, onBuy }: ComicProps) {
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
        <button className={styles.button} onClick={onBuy}>
          <Zap size={16} />
        </button>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          {issue > 0 && <span><b>Issue</b> #{issue}</span>}
          <span><b>Creator:</b> {author}</span>
          <span><b>Published:</b> {publishDate}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
