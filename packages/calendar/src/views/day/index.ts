import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { setRangeForDay } from '../../utils/stateless/time/range/set-range'
import { DayWrapper } from './components/day-wrapper'

export const viewDay = createPreactView({
  name: InternalViewName.Day,
  label: 'Day',
  setDateRange: setRangeForDay,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  ComponentFn: DayWrapper,
})
