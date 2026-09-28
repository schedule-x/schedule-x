import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { addMonths } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { createPreactView } from '../../utils/stateful/preact-view/preact-view'
import { setRangeForYear } from '../../utils/stateless/time/range/set-range'
import { YearGridWrapper } from './components/year-grid-wrapper'

const config = {
  name: InternalViewName.YearGrid,
  label: 'Year',
  setDateRange: setRangeForYear,
  Component: YearGridWrapper,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  backwardForwardFn: addMonths,
  backwardForwardUnits: 12,
}

export const viewYearGrid = createPreactView(config)
export const createViewYearGrid = () => createPreactView(config)
