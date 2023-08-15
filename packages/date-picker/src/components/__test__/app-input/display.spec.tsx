import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { screen, waitFor, cleanup } from '@testing-library/preact'

import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { factory } from './utils'

const DATE_PICKER_INPUT_TEST_ID = 'date-picker-input'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it.each([
    ['2021-02-01', 'en-US', '2/1/2021'],
    ['2021-02-01', 'de-DE', '1.2.2021'],
  ])('should display selected date for locale %s', (
    selectedDate: string,
    locale: string,
    expectedDisplayedDate: string
  ) => {
    factory(__createDatePickerAppSingleton__(selectedDate, locale))

    const inputElement = screen.getByTestId(DATE_PICKER_INPUT_TEST_ID)
    expect(screen.getByDisplayValue(expectedDisplayedDate) === inputElement).toBe(true)
  })

  it.each([
    ['MM/DD/YYYY', 'en-US'],
    ['TT.MM.JJJJ', 'de-DE'],
  ])('should display placeholder %s for locale %swhen selected date is an empty string', (
    placeholder: string,
    locale: string
  ) => {
    factory(__createDatePickerAppSingleton__('', locale))

    const inputElement = screen.getByTestId(DATE_PICKER_INPUT_TEST_ID)
    expect(screen.getByDisplayValue(placeholder) === inputElement).toBe(true)
  })

  it('should update displayed selected date', async () => {
    const expectedInitialDate = '1/1/2021'
    const expectedUpdatedDate = '1/2/2021'
    const $app = __createDatePickerAppSingleton__('2021-01-01', 'en-US')
    factory($app)
    const inputElement = screen.getByTestId(DATE_PICKER_INPUT_TEST_ID)
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
