import { renderHook, waitFor } from "@testing-library/react"
import { useComics } from "@/hooks/use-comics"
import type { ApiResponse } from "@/types/comic"
import type { jest } from "@jest/globals"

const mockApiResponse: ApiResponse = {
  success: true,
  data: [
    {
      key: "/works/test1",
      title: "Test Manga",
      author_name: ["Test Author"],
      first_publish_year: 2023,
      cover_i: 12345,
      publisher: ["Viz Media"],
    },
  ],
}

describe("useComics Hook", () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it("fetches comics successfully", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    })

    const { result } = renderHook(() => useComics())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.comics).toHaveLength(1)
    expect(result.current.comics[0].title).toBe("Test Manga")
  })

  it("handles errors", async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    const { result } = renderHook(() => useComics())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Failed to load comics.")
  })
})
