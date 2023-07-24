import { createContext } from 'preact'
import DatePickerAppSingleton from './app-singleton/date-picker-app.singleton'

export const AppContext = createContext<DatePickerAppSingleton>(
  {} as DatePickerAppSingleton
)
