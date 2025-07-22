"use client"

import { render, screen } from "@testing-library/react"
import Page from "@/app/page"
import jest from "jest"

jest.mock("@/components/comic/comic-grid", () => ({
  ComicGrid: ({ onBuy }: { onBuy: (id: string) => void }) => (
    <div data-testid="comic-grid">
      <button onClick={() => onBuy("test-id")}>Test Buy Button</button>
    </div>
  ),
}))

global.alert = jest.fn()

describe("Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the page correctly", () => {
    render(<Page />)

    expect(screen.getByTestId("comic-grid")).toBeInTheDocument()
  })

  it("handles buy action correctly", () => {
    render(<Page />)

    const buyButton = screen.getByText("Test Buy Button")
    buyButton.click()

    expect(global.alert).toHaveBeenCalledWith("Added comic test-id to cart!")
  })
})
