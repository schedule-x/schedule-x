import { createContext } from 'preact'
import DatePickerSingleton from '../../interfaces/app-singleton.interface'

export const AppContext = createContext<DatePickerSingleton>(
  {} as DatePickerSingleton
)
