"use client"

import { ComicGrid } from "../components/comic/comic-grid"

export default function Page() {
  const handleBuy = (comicId: string) => {
    alert(`Added comic ${comicId} to cart!`)
  }

  return (
    <div>
      <ComicGrid onBuy={handleBuy} />
    </div>
  )
}