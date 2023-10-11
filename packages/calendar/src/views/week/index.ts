import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { WeekWrapper } from './components/week-wrapper'
import { setRangeForWeek } from '../../utils/stateless/time/range/set-range'

export const viewWeek = createPreactView(
  InternalViewName.Week,
  'Week',
  WeekWrapper,
  setRangeForWeek
)
