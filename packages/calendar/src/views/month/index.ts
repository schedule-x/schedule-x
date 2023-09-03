import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { MonthWrapper } from './month-wrapper'

export const viewMonth = createPreactView(
  InternalViewName.Month,
  'Month',
  MonthWrapper
)
