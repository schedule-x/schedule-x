import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { scrollOnDateSelection } from '../scroll-on-date-selection'
import { vi } from 'vitest'

describe('scrolling the list view on date selection', () => {
  describe('when a day element for the selected date is found', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('should scroll the day element into view', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      const wrapperRef = {
        current: document.createElement('div'),
      }

      const selectedDateElement = document.createElement('div')
      selectedDateElement.className = 'sx__list-day'
      selectedDateElement.dataset.date = '2023-10-01'
      selectedDateElement.scrollIntoView = vi.fn()
      wrapperRef.current.appendChild(selectedDateElement)

      scrollOnDateSelection($app, wrapperRef)

      expect(selectedDateElement.scrollIntoView).not.toHaveBeenCalled()

      vi.advanceTimersToNextFrame()

      expect(selectedDateElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'instant',
        block: 'start',
      })
    })
  })
})
