import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendarAppSingleton } from '../../../../factory'
import { factory } from './utils'
import { setNewInputValueAndPressEnter } from '@schedule-x/date-picker/src/components/__test__/app-input/utils'
import { cleanup, screen, waitFor } from '@testing-library/preact'

describe('CalendarHeader', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('changing date', () => {
    it('should change date when typing a date in the input', () => {
      const initialDate = '2010-01-01'
      const $app = createCalendarAppSingleton({
        datePicker: { selectedDate: initialDate },
      })
      factory($app)
      const expectedRangeHeadingAfterChange = 'March 2022'
      expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeFalsy()

      setNewInputValueAndPressEnter('2022-03-10')

      expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
    })

    it('should set date to today when clicking today button', () => {
      const initialDate = '2010-01-15'
      const $app = createCalendarAppSingleton({
        datePicker: { selectedDate: initialDate },
      })
      factory($app)
      const initialRangeHeading = 'January 2010'
      expect(screen.queryByText(initialRangeHeading)).toBeTruthy()

      screen.getByText('Today').click()

      waitFor(() => {
        expect(screen.queryByText(initialRangeHeading)).toBeFalsy()
      })
    })
  })
})
