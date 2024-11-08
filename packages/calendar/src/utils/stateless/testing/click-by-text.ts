import { screen, waitFor, fireEvent } from '@testing-library/preact'
export const clickByText = async (text: string) => {
  await waitFor(() => {
    screen.getByText(text).click()
  })
}

export const doubleClickByText = async (text: string, window: Window) => {
  await waitFor(() => {
    fireEvent(
      screen.getByText(text),
      new MouseEvent('dblclick', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    )
  })
}
