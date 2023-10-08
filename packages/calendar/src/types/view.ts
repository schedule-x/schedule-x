import { ViewName } from './view-name'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'

export type View = {
  name: ViewName // identifier for the view
  label: string // text that will be displayed in the view dropdown
  setDateRange: (config: RangeSetterConfig) => void // function that is called when a new date is selected
  render(onElement: HTMLElement, $app: CalendarAppSingleton): void
  destroy(): void
}
