import { ComicGrid } from "@/components/comic/comic-grid"

export default function Page() {
  const handleBuy = (comicId: string) => {
    alert(`Added comic ${comicId} to cart!`)
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" }}>
      <ComicGrid onBuy={handleBuy} />
    </div>
  )
}
