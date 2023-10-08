import { createCalendarAppSingleton } from '../../../factory'
import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { viewDay } from '../../../views/day'
import { viewWeek } from '../../../views/week'
import { viewMonth } from '../../../views/month'

export const __createAppWithViews__ = (config: CalendarConfigExternal = {}) => {
  return createCalendarAppSingleton({
    ...config,
    views: [viewDay, viewWeek, viewMonth],
  })
}
