import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendarAppSingleton } from '../../../../factory'
import { renderComponent } from './utils'
import { screen } from '@testing-library/preact'
import { viewMonthGrid } from '../../../../views/month-grid'
import { viewWeek } from '../../../../views/week'
import { viewDay } from '../../../../views/day'

describe('RangeHeading', () => {
  describe('displaying the localized range heading', () => {
    it.each([
      ['en-US', '2020-01-01', 'December 2019 – January 2020'],
      ['en-US', '2020-01-10', 'January 2020'],
      ['en-US', '2023-07-31', 'July – August 2023'],
      ['zh-CN', '2020-01-01', '十二月 2019年 – 一月 2020年'],
      ['zh-CN', '2020-01-10', '一月 2020年'],
      ['zh-CN', '2023-07-31', '七月 – 八月 2023年'],
    ])(
      'should display the localized range heading when in the week view',
      (locale, selectedDate, expectedRangeHeading) => {
        const $app = createCalendarAppSingleton({
          locale,
          selectedDate: Temporal.PlainDate.from(selectedDate),
          views: [viewMonthGrid, viewWeek, viewDay],
        }, [])
        renderComponent($app)

        expect(screen.queryByText(expectedRangeHeading)).toBeTruthy()
      }
    )
  })
})
