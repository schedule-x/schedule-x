import { screen } from '@testing-library/preact'
import { assertIsButton } from '../../../../../../../libs/assertions/src'

export function queryDropdown() {
  return screen.queryByTestId('view-selection-items')
}

export const isDropdownOpen = () => {
  return queryDropdown() !== null
}

export const openViewSelection = () => {
  ;(
    document.querySelector('.sx__view-selection-selected-item') as HTMLElement
  ).click()
}

export const getViewSelectionElement = () => {
  const el = document.querySelector('.sx__view-selection-selected-item')
  assertIsButton(el)

  return el
}

export const getViewOptionN = (n: number) => {
  const els = document.querySelectorAll('.sx__view-selection-item')
  const el = els[n - 1]
  assertIsButton(el)

  return el
}
