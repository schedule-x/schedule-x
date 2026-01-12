import { createContext } from 'preact'
import CalendarAppSingleton from '../../interfaces/calendar/calendar-app-singleton'

export const AppContext = createContext<CalendarAppSingleton>(
  {} as CalendarAppSingleton
)
