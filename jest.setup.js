import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

global.fetch = jest.fn()
global.alert = jest.fn()
