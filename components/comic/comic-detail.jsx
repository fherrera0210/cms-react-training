import styles from "./comic.module.css"

export function ComicDetail({ label, value }) {
  return (
    <div className={styles.detail}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
