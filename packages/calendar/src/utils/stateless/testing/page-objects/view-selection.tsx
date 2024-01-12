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

export const getFirstViewOption = () => {
  return document.querySelector(
    '.sx__view-selection-item:nth-child(1)'
  ) as HTMLElement
}

export const getSecondViewOption = () => {
  return document.querySelector(
    '.sx__view-selection-item:nth-child(2)'
  ) as HTMLElement
}

export const getThirdViewOption = () => {
  return document.querySelector(
    '.sx__view-selection-item:nth-child(3)'
  ) as HTMLElement
}
