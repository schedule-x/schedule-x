import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { WeekWrapper } from './components/week-wrapper'
import { setRangeForWeek } from '../../utils/stateless/time/range/set-range'

export const viewWeek = createPreactView({
  name: InternalViewName.Week,
  label: 'Week',
  ComponentFn: WeekWrapper,
  setDateRange: setRangeForWeek,
  hasSmallScreenCompat: false,
  hasWideScreenCompat: true,
})
