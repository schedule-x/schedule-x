import Config from '../../../../../../shared/interfaces/config.interface'

export default interface DatePickerConfigInternal extends Config {
  min: string
  max: string
}

export interface DatePickerConfigExternal
  extends Partial<DatePickerConfigInternal> {
  selectedDate?: string
}
