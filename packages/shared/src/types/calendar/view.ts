import { ViewName } from './view-name'
import CalendarAppSingleton from '../../interfaces/calendar/calendar-app-singleton'
import { RangeSetterConfig } from '../../interfaces/calendar/range-setter-config.interface'
import { PreactViewComponent } from './preact-view-component'
import {
  addDays,
  addMonths,
} from '../../utils/stateless/time/date-time-mutation/adding'

export type ViewConfig = {
  name: ViewName // identifier for the view
  label: string // text that will be displayed in the view dropdown
  setDateRange: (config: RangeSetterConfig) => void // function that is called when a new date is selected
  hasSmallScreenCompat: boolean
  hasWideScreenCompat: boolean
  ComponentFn: PreactViewComponent
  backwardForwardFn: typeof addDays | typeof addMonths
  backwardForwardUnits: number
}

export type View = ViewConfig & {
  render(onElement: HTMLElement, $app: CalendarAppSingleton): void
  destroy(): void
}
