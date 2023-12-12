import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForDay } from '../../utils/stateless/time/range/set-range'
import { DayWrapper } from './components/day-wrapper'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

export const viewDay = createPreactView({
  name: InternalViewName.Day,
  label: 'Day',
  setDateRange: setRangeForDay,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  ComponentFn: DayWrapper,
  backwardForwardFn: addDays,
  backwardForwardUnits: 1,
})
