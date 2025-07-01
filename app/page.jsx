import { ComicGrid } from "../components/comic/comic-grid"
import styles from "./page.module.css"

export default function Page() {

  return (
    <div className={styles.page}>
      <ComicGrid />
    </div>
  )
}
