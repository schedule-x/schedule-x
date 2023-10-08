import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { MonthWrapper } from './month-wrapper'
import { setRangeForMonth } from '../../utils/stateless/time/range/set-range'

export const viewMonth = createPreactView(
  InternalViewName.Month,
  'Month',
  MonthWrapper,
  setRangeForMonth
)
