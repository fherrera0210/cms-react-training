import { render, screen, fireEvent } from "@testing-library/react"
import { Comic } from "@/components/comic/comic"
import jest from "jest"

const mockComic = {
  title: "Test Comic",
  coverImage: "https://example.com/cover.jpg",
  author: "Test Author",
  issue: 1,
  description: "Test description",
  publishDate: "2023",
  publisher: "Viz Media",
}

describe("Comic Component", () => {
  it("renders comic information", () => {
    const mockOnBuy = jest.fn()
    render(<Comic {...mockComic} onBuy={mockOnBuy} />)

    expect(screen.getByText("Test Comic")).toBeInTheDocument()
    expect(screen.getByText("Test Author")).toBeInTheDocument()
    expect(screen.getByText("Viz Media")).toBeInTheDocument()
  })

  it("calls onBuy when button clicked", () => {
    const mockOnBuy = jest.fn()
    render(<Comic {...mockComic} onBuy={mockOnBuy} />)

    fireEvent.click(screen.getByRole("button"))
    expect(mockOnBuy).toHaveBeenCalled()
  })
})
