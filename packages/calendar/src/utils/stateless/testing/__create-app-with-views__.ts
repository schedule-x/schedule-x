import { createCalendarAppSingleton } from '../../../factory'
import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { viewDay } from '../../../views/day'
import { viewWeek } from '../../../views/week'
import { viewMonthGrid } from '../../../views/month-grid'
import { viewList } from '../../../views/list'

export const __createAppWithViews__ = (
  config: Partial<CalendarConfigExternal> = {}
) => {
  return createCalendarAppSingleton(
    {
      views: [viewDay, viewWeek, viewMonthGrid, viewList],
      ...config,
    },
    config.plugins || []
  )
}
