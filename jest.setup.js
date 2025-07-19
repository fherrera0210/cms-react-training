import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

// Mock fetch
global.fetch = jest.fn()
global.alert = jest.fn()
