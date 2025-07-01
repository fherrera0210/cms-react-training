"use client"

import styles from "./comic.module.css"

export function ComicButton({ children, onClick, disabled = false }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
