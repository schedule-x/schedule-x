import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setNewDateAndPressEnter } from '@schedule-x/date-picker/src/components/__test__/app-input/utils'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { openViewSelection } from '../../utils/stateless/testing/page-objects/view-selection'
import { renderComponent } from './utils'

describe('CalendarWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('selecting a date in the date picker', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: '2023-12-01',
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      setNewDateAndPressEnter('2024-01-01')

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: '2024-01-01 00:00',
          end: '2024-02-04 23:59',
        })
      })
    })
  })

  describe('changing from week to month view', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: '2023-12-01',
        defaultView: InternalViewName.Week,
      })
      renderComponent($app)

      openViewSelection()
      await waitFor(() => {
        screen.getByText('Month').click() // select month view
      })

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: '2023-11-27 00:00',
          end: '2023-12-31 23:59',
        })
      })
    })
  })
})
