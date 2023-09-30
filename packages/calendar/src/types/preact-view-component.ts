import { JSXInternal } from 'preact/src/jsx'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export type PreactViewComponent = (props: {
  $app: CalendarAppSingleton
  id: string
}) => JSXInternal.Element
