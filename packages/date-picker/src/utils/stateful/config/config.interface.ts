import Config from '../../../../../../shared/interfaces/config.interface'
import { Placement } from '../../../enums/placement.enum'
import { DatePickerListeners } from './listeners.interface'



export default interface DatePickerConfigInternal extends Config {
  min: string
  max: string
  placement: Placement
  listeners?: DatePickerListeners
}

export interface DatePickerConfigExternal
  extends Partial<Omit<DatePickerConfigInternal, 'placement'>> {
  selectedDate?: string
  placement?: Placement | string
}
