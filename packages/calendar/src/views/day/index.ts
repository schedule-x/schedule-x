import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { DayWrapper } from './components/day-wrapper'
import { setRangeForDay } from '../../utils/stateless/time/range/set-range'

export const viewDay = createPreactView(
  InternalViewName.Day,
  'Day',
  DayWrapper,
  setRangeForDay
)
