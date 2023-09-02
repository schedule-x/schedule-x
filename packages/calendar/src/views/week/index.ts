import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { WeekWrapper } from './week-wrapper'

export const viewWeek = createPreactView(
  InternalViewName.Week,
  'Week',
  WeekWrapper
)
