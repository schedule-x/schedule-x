import { ViewName } from './view-name'
import CalendarAppSingleton from '../utils/stateful/app-singleton/calendar-app-singleton'

export type View = {
  name: ViewName // identifier for the view
  label: string // text that will be displayed in the view dropdown
  render(onElement: HTMLElement, $app: CalendarAppSingleton): void
  destroy(): void
}
