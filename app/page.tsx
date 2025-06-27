import { ComicGrid } from "@/components/comic/comic-grid"
import { marvelComics } from "@/lib/comic-data"
import styles from "./page.module.css"

export default function Page() {
  const handleBuy = (comicId: string) => {
    console.log(`Buying comic: ${comicId}`)
  }

  return (
    <div className={styles.page}>
      <ComicGrid comics={marvelComics} onBuy={handleBuy} />
    </div>
  )
}
