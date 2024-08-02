import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForDay } from '../../utils/stateless/time/range/set-range'
import { DayWrapper } from './components/day-wrapper'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const config = {
  name: InternalViewName.Day,
  label: 'Day',
  setDateRange: setRangeForDay,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  Component: DayWrapper,
  backwardForwardFn: addDays,
  backwardForwardUnits: 1,
}

export const viewDay = createPreactView(config)

export const createViewDay = () => createPreactView(config)
