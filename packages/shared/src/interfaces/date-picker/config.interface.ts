import Config from '../config.interface'
import { Placement } from './placement.enum'
import { DatePickerListeners } from './listeners.interface'
import { DatePickerStyle } from './style.interface'
import { WeekDay } from '../../enums/time/week-day.enum'
import { IANATimezone } from '../../utils/stateless/time/tzdb'

export default interface DatePickerConfigInternal extends Config {
  min: Temporal.PlainDate
  max: Temporal.PlainDate
  placement: Placement
  listeners: DatePickerListeners
  style: DatePickerStyle
  teleportTo?: HTMLElement
  label?: string
  name?: string
  disabled?: boolean
  hasPlaceholder?: boolean
}

export interface DatePickerConfigExternal
  extends Partial<
    Omit<
      DatePickerConfigInternal,
      'placement' | 'firstDayOfWeek' | 'locale' | 'timezone'
    >
  > {
  selectedDate?: Temporal.PlainDate
  placement?: Placement | string
  firstDayOfWeek?: WeekDay
  locale?: string
  timezone?: IANATimezone
}
