"use client"

import type React from "react"

import styles from "./comic.module.css"

interface ComicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function ComicButton({ children, onClick, disabled = false }: ComicButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
