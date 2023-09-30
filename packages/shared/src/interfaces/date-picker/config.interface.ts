import Config from '../config.interface'
import { Placement } from './placement.enum'
import { DatePickerListeners } from './listeners.interface'
import { DatePickerStyle } from './style.interface'

export default interface DatePickerConfigInternal extends Config {
  min: string
  max: string
  placement: Placement
  listeners: DatePickerListeners
  style: DatePickerStyle
}

export interface DatePickerConfigExternal
  extends Partial<Omit<DatePickerConfigInternal, 'placement'>> {
  selectedDate?: string
  placement?: Placement | string
}
