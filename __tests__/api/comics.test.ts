import { POST } from "@/app/api/comics/route"
import { NextRequest } from "next/server"
import jest from "jest"

global.fetch = jest.fn()

describe("/api/comics", () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it("returns comics successfully", async () => {
    const mockOpenLibraryResponse = {
      docs: [
        {
          key: "/works/test",
          title: "Test Comic",
          author_name: ["Test Author"],
          first_publish_year: 2023,
          cover_i: 12345,
          subject: ["manga"],
          publisher: ["Viz Media"],
        },
      ],
    }
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockOpenLibraryResponse,
    })

    const request = new NextRequest("http://localhost:3000/api/comics", {
      method: "POST",
      body: JSON.stringify({ limit: 50 }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(1)
    expect(data.data[0].title).toBe("Test Comic")
  })

  it("handles API errors gracefully", async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error("Network error"))

    const request = new NextRequest("http://localhost:3000/api/comics", {
      method: "POST",
      body: JSON.stringify({ limit: 50 }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe("Network error")
    expect(data.data).toEqual([])
  })

  it("filters results correctly", async () => {
    const mockOpenLibraryResponse = {
      docs: [
        {
          key: "/works/viz-comic",
          title: "Viz Comic",
          author_name: ["Author"],
          first_publish_year: 2023,
          cover_i: 12345,
          subject: ["manga"],
          publisher: ["Viz Media"],
        },
        {
          key: "/works/non-comic",
          title: "Regular Book",
          author_name: ["Author"],
          first_publish_year: 2023,
          cover_i: null, // No cover image
          subject: ["fiction"],
          publisher: ["Other Publisher"],
        },
      ],
    }
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockOpenLibraryResponse,
    })

    const request = new NextRequest("http://localhost:3000/api/comics", {
      method: "POST",
      body: JSON.stringify({ limit: 50 }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(1)
    expect(data.data[0].title).toBe("Viz Comic")
  })
})
