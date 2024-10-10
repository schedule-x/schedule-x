import Config from '../config.interface'
import { Placement } from './placement.enum'
import { DatePickerListeners } from './listeners.interface'
import { DatePickerStyle } from './style.interface'
import { WeekDay } from '../../enums/time/week-day.enum'

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
    Omit<DatePickerConfigInternal, 'placement' | 'firstDayOfWeek' | 'locale'>
  > {
  selectedDate?: string
  placement?: Placement | string
  firstDayOfWeek?: WeekDay
  locale?: string
}
