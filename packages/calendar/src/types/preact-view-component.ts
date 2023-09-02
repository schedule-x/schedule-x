import { JSXInternal } from 'preact/src/jsx'
import CalendarAppSingleton from '../utils/stateful/app-singleton/calendar-app-singleton'

export type PreactViewComponent = (props: {
  $app: CalendarAppSingleton
  id: string
}) => JSXInternal.Element
