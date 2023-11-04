import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { screen, waitFor, cleanup } from '@testing-library/preact'

import { renderComponent, getInputElement } from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it.each([
    ['2021-02-01', 'en-US', '2/1/2021'],
    ['2021-02-01', 'de-DE', '1.2.2021'],
  ])(
    'should display selected date for locale %s',
    (selectedDate: string, locale: string, expectedDisplayedDate: string) => {
      renderComponent(createAppSingleton({ selectedDate, locale }))
      const inputElement = getInputElement()

      expect(
        screen.getByDisplayValue(expectedDisplayedDate) === inputElement
      ).toBe(true)
    }
  )

  it.each([
    ['MM/DD/YYYY', 'en-US'],
    ['TT.MM.JJJJ', 'de-DE'],
  ])(
    'should display placeholder %s for locale %swhen selected date is an empty string',
    (placeholder: string, locale: string) => {
      renderComponent(createAppSingleton({ selectedDate: '', locale }))
      const inputElement = getInputElement()

      expect(screen.getByDisplayValue(placeholder) === inputElement).toBe(true)
    }
  )

  it('should update displayed selected date', async () => {
    const expectedInitialDate = '1/1/2021'
    const expectedUpdatedDate = '1/2/2021'
    const $app = createAppSingleton({ selectedDate: '2021-01-01' })
    renderComponent($app)
    const inputElement = getInputElement()
    expect(screen.getByDisplayValue(expectedInitialDate) === inputElement).toBe(
      true
    )

    $app.datePickerState.selectedDate.value = '2021-01-02'

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(expectedUpdatedDate) === inputElement
      ).toBe(true)
    })
  })
})
