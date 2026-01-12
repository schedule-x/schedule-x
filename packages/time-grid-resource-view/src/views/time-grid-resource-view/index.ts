import { createPreactView } from '@schedule-x/shared/src/utils/stateful/preact-view/preact-view'
import { ResourceViewWrapper } from '../../components/resource-view-wrapper'
import { setRangeForResourceView } from '../../utils/stateless/set-range-for-resource-view'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const VIEW_NAME = 'resource-view'

const config = {
  name: VIEW_NAME,
  label: 'Resources',
  Component: ResourceViewWrapper,
  setDateRange: setRangeForResourceView,
  hasSmallScreenCompat: false,
  hasWideScreenCompat: true,
  backwardForwardFn: addDays,
  backwardForwardUnits: 7,
}

export const createViewTimeGridResourceView = () => createPreactView(config)
