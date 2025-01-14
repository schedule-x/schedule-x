import { screen, waitFor, fireEvent } from '@testing-library/preact'
export const clickByText = async (text: string, event?: MouseEvent) => {
  await waitFor(() => {
    fireEvent(
      screen.getByText(text),
      event || new MouseEvent('click', { bubbles: true, cancelable: true })
    )
  })
}

export const doubleClickByText = async (text: string, event?: MouseEvent) => {
  await waitFor(() => {
    fireEvent(
      screen.getByText(text),
      event ||
        new MouseEvent('dblclick', {
          bubbles: true,
          cancelable: true,
        })
    )
  })
}
