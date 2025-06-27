import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForMonth } from '../../utils/stateless/time/range/set-range'
import { ListWrapper } from './components/list-wrapper'
import { addMonths } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const config = {
  name: InternalViewName.List,
  label: 'List',
  setDateRange: setRangeForMonth,
  Component: ListWrapper,
  hasSmallScreenCompat: true,
  hasWideScreenCompat: true,
  backwardForwardFn: addMonths,
  backwardForwardUnits: 1,
}

export const viewList = createPreactView(config)
export const createViewList = () => createPreactView(config)
