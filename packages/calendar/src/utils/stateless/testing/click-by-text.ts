import { screen, waitFor } from '@testing-library/preact'

export const clickByText = async (text: string) => {
  await waitFor(() => {
    screen.getByText(text).click()
  })
}
