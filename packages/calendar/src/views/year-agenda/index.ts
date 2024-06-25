import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { addYears } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { setRangeForYear } from '../../utils/stateless/time/range/set-range'
import { YearAgendaWrapper } from './components/year-agenda-wrapper'

export const viewYearAgenda = createPreactView({
  name: InternalViewName.YearAgenda,
  label: 'Year',
  setDateRange: setRangeForYear,
  Component: YearAgendaWrapper,
  hasSmallScreenCompat: true,
  hasWideScreenCompat: true,
  backwardForwardFn: addYears,
  backwardForwardUnits: 1,
})
