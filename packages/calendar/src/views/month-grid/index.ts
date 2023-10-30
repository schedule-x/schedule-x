import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { setRangeForMonth } from '../../utils/stateless/time/range/set-range'
import { MonthGridWrapper } from './components/month-grid-wrapper'

export const viewMonthGrid = createPreactView({
  name: InternalViewName.MonthGrid,
  label: 'Month',
  setDateRange: setRangeForMonth,
  ComponentFn: MonthGridWrapper,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: false,
})
