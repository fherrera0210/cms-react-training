import { render, screen } from "@testing-library/react"
import { ComicGrid } from "@/components/comic/comic-grid"
import jest from "jest" // Declare the jest variable

// Mock the useComics hook
jest.mock("@/hooks/use-comics", () => ({
  useComics: jest.fn(),
}))

const { useComics } = require("@/hooks/use-comics")

const mockComics = [
  {
    id: "1",
    title: "Test Comic 1",
    coverImage: "https://example.com/cover1.jpg",
    author: "Author 1",
    issue: 1,
    description: "Description 1",
    publishDate: "2023",
    publisher: "Publisher 1",
  },
  {
    id: "2",
    title: "Test Comic 2",
    coverImage: "https://example.com/cover2.jpg",
    author: "Author 2",
    issue: 2,
    description: "Description 2",
    publishDate: "2023",
    publisher: "Publisher 2",
  },
]

describe("ComicGrid Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("displays loading state correctly", () => {
    useComics.mockReturnValue({
      comics: [],
      loading: true,
      error: null,
    })

    render(<ComicGrid onBuy={jest.fn()} />)

    expect(screen.getByText("Viz Media Collection")).toBeInTheDocument()
    expect(screen.getByText("Loading amazing manga and comics from Viz Media...")).toBeInTheDocument()

    // Should show 6 loading skeleton cards
    const skeletonCards = screen.getAllByTestId(/loading-card/i)
    expect(skeletonCards).toHaveLength(6)
  })

  it("displays error state correctly", () => {
    useComics.mockReturnValue({
      comics: [],
      loading: false,
      error: "Failed to load comics",
    })

    render(<ComicGrid onBuy={jest.fn()} />)

    expect(screen.getByText("Unable to Load Comics")).toBeInTheDocument()
    expect(screen.getByText("Failed to load comics")).toBeInTheDocument()
    expect(screen.getByText("Try Again")).toBeInTheDocument()
  })

  it("displays empty state when no comics found", () => {
    useComics.mockReturnValue({
      comics: [],
      loading: false,
      error: null,
    })

    render(<ComicGrid onBuy={jest.fn()} />)

    expect(screen.getByText("No Comics Found")).toBeInTheDocument()
    expect(
      screen.getByText("We couldn't find any Viz Media comics at the moment. Please try again later."),
    ).toBeInTheDocument()
    expect(screen.getByText("Refresh")).toBeInTheDocument()
  })

  it("displays comics when data is loaded", () => {
    useComics.mockReturnValue({
      comics: mockComics,
      loading: false,
      error: null,
    })

    render(<ComicGrid onBuy={jest.fn()} />)

    expect(screen.getByText("Viz Media Collection")).toBeInTheDocument()
    expect(screen.getByText("Found 2 comics")).toBeInTheDocument()
    expect(screen.getByText("Test Comic 1")).toBeInTheDocument()
    expect(screen.getByText("Test Comic 2")).toBeInTheDocument()
  })

  it("handles singular comic count correctly", () => {
    useComics.mockReturnValue({
      comics: [mockComics[0]],
      loading: false,
      error: null,
    })

    render(<ComicGrid onBuy={jest.fn()} />)

    expect(screen.getByText("Found 1 comic")).toBeInTheDocument()
  })
})
