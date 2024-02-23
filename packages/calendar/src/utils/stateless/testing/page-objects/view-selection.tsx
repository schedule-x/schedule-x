import { screen } from '@testing-library/preact'
import {
  assertIsDIV,
  assertIsLI,
} from '../../../../../../../libs/assertions/src'

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
  assertIsDIV(el)

  return el
}

export const getViewOptionN = (n: number) => {
  const el = document.querySelector(`.sx__view-selection-item:nth-child(${n})`)
  assertIsLI(el)

  return el
}
