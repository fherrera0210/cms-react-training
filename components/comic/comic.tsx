"use client"

import Image from "next/image"
import { Zap } from "lucide-react"
import type { Comic as ComicType } from "@/types/comic"
import styles from "./comic.module.css"

interface ComicProps extends ComicType {
  onBuy: () => void
}

export function Comic({ title, coverImage, author, issue, description, publishDate, publisher, onBuy }: ComicProps) {
  return (
    <div className={styles.comic}>
      <div className={styles.cover}>
        <Image
          src={coverImage || "/placeholder.svg?height=450&width=300"}
          alt={`${title} volume ${issue} cover`}
          width={300}
          height={450}
          className={styles.image}
          unoptimized
        />
        <button className={styles.button} onClick={onBuy} type="button">
          <Zap size={16} />
        </button>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span>
            <b>Volume</b> #{issue}
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
