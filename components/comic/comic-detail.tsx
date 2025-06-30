import styles from "./comic.module.css"

interface ComicDetailProps {
  label: string
  value: string
}

export function ComicDetail({ label, value }: ComicDetailProps) {
  return (
    <div className={styles.detail}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
