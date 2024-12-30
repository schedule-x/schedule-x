import {
  beforeEach,
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { renderComponent } from './utils'
import { viewDay } from '../../../../views/day'
import { viewWeek } from '../../../../views/week'
import { viewMonthGrid } from '../../../../views/month-grid'
import { openViewSelection } from '../../../../utils/stateless/testing/page-objects/view-selection'
import { clickByText } from '../../../../utils/stateless/testing/click-by-text'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

describe('CalendarHeader', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('changing view', () => {
    it('should set the view to month and update range heading, when selecting month view', async () => {
      const $app = __createAppWithViews__({
        defaultView: 'week',
        selectedDate: '2010-01-01',
        views: [viewMonthGrid, viewWeek, viewDay],
      })
      renderComponent($app)
      const expectedRangeHeadingBeforeChange = 'December 2009 – January 2010'
      expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeTruthy()

      openViewSelection()
      await clickByText('Month') // select month view

      await waitFor(() => {
        expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeFalsy()
        const expectedRangeHeadingAfterChange = 'January 2010'
        expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
      })
    })

    it('should set the view to week and update range heading, when selecting week view', async () => {
      const $app = __createAppWithViews__({
        defaultView: 'day',
        selectedDate: '2010-01-01',
        views: [viewMonthGrid, viewWeek, viewDay],
      })
      renderComponent($app)
      const expectedRangeHeadingBeforeChange = 'January 2010'
      expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeTruthy()

      openViewSelection()
      await clickByText('Week') // select week view

      await waitFor(() => {
        expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeFalsy()
        const expectedRangeHeadingAfterChange = 'December 2009 – January 2010'
        expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
      })
    })
  })
})
