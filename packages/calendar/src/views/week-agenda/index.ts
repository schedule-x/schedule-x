import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForWeek } from '../../utils/stateless/time/range/set-range'
import { WeekAgendaWrapper } from './components/week-agenda-wrapper'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const config = {
  name: InternalViewName.WeekAgenda,
  label: 'Week Agenda',
  setDateRange: setRangeForWeek,
  Component: WeekAgendaWrapper,
  hasSmallScreenCompat: true,
  hasWideScreenCompat: false,
  backwardForwardFn: addDays,
  backwardForwardUnits: 7,
}
export const viewWeekAgenda = createPreactView(config)
export const createViewWeekAgenda = () => createPreactView(config)
