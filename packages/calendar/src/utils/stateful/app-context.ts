import { createContext } from 'preact'
import CalendarAppSingleton from './app-singleton/calendar-app-singleton'

export const AppContext = createContext<CalendarAppSingleton>(
  {} as CalendarAppSingleton
)
