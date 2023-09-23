import {
  describe,
  it,
  expect,
  afterEach,
} from '../../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { createCalendarAppSingleton } from '../../../../factory'
import { factory, isDayView, isWeekView } from './utils'
import { viewWeek } from '../../../../views/week'
import { viewDay } from '../../../../views/day'
import { openViewSelection } from '../../../../utils/stateless/testing/page-objects/view-selection'

describe('CalendarWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('changing views', () => {
    it('should change views from week to day, when clicking "Day" in view selection', async () => {
      const $app = createCalendarAppSingleton({
        views: [viewWeek, viewDay],
      })
      factory($app)
      expect(isWeekView()).toBe(true)

      openViewSelection()
      await waitFor(() => {
        screen.getByText('Day').click() // change to day view
      })

      await waitFor(() => {
        expect(isWeekView()).toBe(false)
        expect(isDayView()).toBe(true)
      })
    })
  })
})
