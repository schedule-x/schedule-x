import { ViewName } from './view-name'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'
import { PreactViewComponent } from './preact-view-component'

export type ViewConfig = {
  name: ViewName // identifier for the view
  label: string // text that will be displayed in the view dropdown
  setDateRange: (config: RangeSetterConfig) => void // function that is called when a new date is selected
  hasSmallScreenCompat: boolean
  hasWideScreenCompat: boolean
  ComponentFn: PreactViewComponent
}

export type View = ViewConfig & {
  render(onElement: HTMLElement, $app: CalendarAppSingleton): void
  destroy(): void
}
