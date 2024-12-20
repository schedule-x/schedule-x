import { JSX } from 'preact'
import CalendarAppSingleton from '../../interfaces/calendar/calendar-app-singleton'

export type PreactViewComponent = (props: {
  $app: CalendarAppSingleton
  id: string
}) => JSX.Element
