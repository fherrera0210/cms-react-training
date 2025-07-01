"use client"

import Image from "next/image"
import { Zap } from "lucide-react"
import styles from "./comic.module.css"

export function Comic({ title, coverImage, author, issue, description, publishDate, publisher }) {
  return (
    <div className={styles.comic}>
      <div className={styles.cover}>
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={`${title} volume ${issue} cover`}
          width={300}
          height={450}
          className={styles.image}
          unoptimized
        />
        <button className={styles.button}>
          <Zap size={16} />
        </button>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span>
            <b>Issue</b> #{issue}
          </span>
          <span>
            <b>Author:</b> {author}
          </span>
          <span>
            <b>Publisher:</b> {publisher}
          </span>
          <span>
            <b>Published:</b> {publishDate}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
