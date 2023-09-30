import { ViewName } from './view-name'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export type View = {
  name: ViewName // identifier for the view
  label: string // text that will be displayed in the view dropdown
  render(onElement: HTMLElement, $app: CalendarAppSingleton): void
  destroy(): void
}
