import { ComicGrid } from "@/components/comic/comic-grid"

export default function Page() {
  return (
    <div className={styles.page}>
      <ComicGrid comics={marvelComics} />
    </div>
  )
}
