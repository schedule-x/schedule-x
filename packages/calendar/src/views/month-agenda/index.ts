import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { setRangeForMonth } from '../../utils/stateless/time/range/set-range'
import { MonthAgendaWrapper } from './components/month-agenda-wrapper'

export const viewMonthAgenda = createPreactView({
  name: InternalViewName.MonthAgenda,
  label: 'Month',
  setDateRange: setRangeForMonth,
  ComponentFn: MonthAgendaWrapper,
  hasSmallScreenCompat: true,
  hasWideScreenCompat: false,
})
