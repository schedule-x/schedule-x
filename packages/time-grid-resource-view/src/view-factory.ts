import { createPreactView } from '@schedule-x/calendar/src/utils/stateful/preact-view/preact-view'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setRangeForWeek } from '@schedule-x/calendar/src/utils/stateless/time/range/set-range'
import { TimeGridResourceView } from './components/time-grid-resource-view'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const config = {
  name: InternalViewName.TimeGridResource,
  label: 'Time Grid Resource',
  Component: TimeGridResourceView,
  setDateRange: setRangeForWeek,
  hasSmallScreenCompat: false,
  hasWideScreenCompat: true,
  backwardForwardFn: addDays,
  backwardForwardUnits: 7,
}

export const createViewTimeGridResource = () => createPreactView(config)
