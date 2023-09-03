import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '../../enums/internal-view.enum'
import { DayWrapper } from './day-wrapper'

export const viewDay = createPreactView(InternalViewName.Day, 'Day', DayWrapper)
