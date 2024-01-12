import { screen } from '@testing-library/preact'

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
  return document.querySelector(
    '.sx__view-selection-selected-item'
  ) as HTMLElement
}
