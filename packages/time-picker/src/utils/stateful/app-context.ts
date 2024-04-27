import { createContext } from 'preact'
import { TimePickerAppContext } from '../../types/time-picker-app.context'

export const AppContext = createContext<TimePickerAppContext>(
  {} as TimePickerAppContext
)
