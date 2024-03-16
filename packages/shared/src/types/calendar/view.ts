import { ViewName } from './view-name'
import CalendarAppSingleton from '../../interfaces/calendar/calendar-app-singleton'
import { RangeSetterConfig } from '../../interfaces/calendar/range-setter-config.interface'
import { PreactViewComponent } from './preact-view-component'
import {
  addDays,
  addMonths,
} from '../../utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '../date-range'

export type ViewConfig<FrameworkComponent = PreactViewComponent> = {
  /**
   * a unique identifier for the view
   * */
  name: ViewName

  /**
   * text that will be displayed in the view dropdown
   * */
  label: string

  /**
   * function that is called when a new date is selected
   * */
  setDateRange: (config: RangeSetterConfig) => DateRange

  /**
   * should the view be displayed on small screens (< 700px calendar width)
   * */
  hasSmallScreenCompat: boolean

  /**
   * should the view be displayed on wide screens (> 700px calendar width)
   * */
  hasWideScreenCompat: boolean

  /**
   * The component you want to render
   * */
  Component: FrameworkComponent

  /**
   * function that is called when the user clicks the backward/forward button
   * */
  backwardForwardFn: typeof addDays | typeof addMonths

  /**
   * number of units to add into the backwardForwardFn function. Result behind the scenes for example:
   * backwardForwardFn = addDays
   * backwardForwardUnits = 1
   * result (behind the scenes) = addDays(date, 1)
   * */
  backwardForwardUnits: number
}

export type View<FrameworkComponent = PreactViewComponent> =
  ViewConfig<FrameworkComponent> & {
    render(onElement: HTMLElement, $app: CalendarAppSingleton): void
    destroy(): void
  }
