import Config from '../config.interface'
import { Placement } from './placement.enum'
import { DatePickerListeners } from './listeners.interface'
import { DatePickerStyle } from './style.interface'
import { WeekDay } from '../../enums/time/week-day.enum'
import TimeUnits from '../../utils/stateful/time-units/time-units.interface'

export default interface DatePickerConfigInternal extends Config {
  min: string
  max: string
  placement: Placement
  listeners: DatePickerListeners
  style: DatePickerStyle
  teleportTo?: HTMLElement
  label?: string
  name?: string
  disabled?: boolean
}

export interface DatePickerConfigExternal
  extends Partial<
    Omit<
      DatePickerConfigInternal,
      'placement' | 'firstDayOfWeek' | 'locale' | 'timeUnits'
    >
  > {
  selectedDate?: string
  placement?: Placement | string
  firstDayOfWeek?: WeekDay
  locale?: string
  timeUnits?: TimeUnits
}
