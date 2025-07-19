import { render } from "@testing-library/react"

// Custom render function that includes providers if needed
const customRender = (ui, options) => render(ui, options)

// Re-export everything
export * from "@testing-library/react"

// Override render method
export { customRender as render }
