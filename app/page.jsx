import { ComicGrid } from "@/components/comic/comic-grid"
import { marvelComics } from "@/lib/comic-data"
import styles from "./page.module.css"

export default function Page() {
  return (
    <div className={styles.page}>
      <ComicGrid comics={marvelComics} />
    </div>
  )
}
