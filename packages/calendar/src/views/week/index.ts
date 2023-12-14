import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { WeekWrapper } from './components/week-wrapper'
import { setRangeForWeek } from '../../utils/stateless/time/range/set-range'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

export const viewWeek = createPreactView({
  name: InternalViewName.Week,
  label: 'Week',
  ComponentFn: WeekWrapper,
  setDateRange: setRangeForWeek,
  hasSmallScreenCompat: false,
  hasWideScreenCompat: true,
  backwardForwardFn: addDays,
  backwardForwardUnits: 7,
})
