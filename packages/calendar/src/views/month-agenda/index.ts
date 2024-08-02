import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForMonth } from '../../utils/stateless/time/range/set-range'
import { MonthAgendaWrapper } from './components/month-agenda-wrapper'
import { addMonths } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const config = {
  name: InternalViewName.MonthAgenda,
  label: 'Month',
  setDateRange: setRangeForMonth,
  Component: MonthAgendaWrapper,
  hasSmallScreenCompat: true,
  hasWideScreenCompat: false,
  backwardForwardFn: addMonths,
  backwardForwardUnits: 1,
}
export const viewMonthAgenda = createPreactView(config)
export const createViewMonthAgenda = () => createPreactView(config)
