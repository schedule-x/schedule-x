import AppSingleton from '@schedule-x/shared/src/interfaces/app-singleton.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'

export default interface DatePickerAppSingleton extends AppSingleton {
  config: DatePickerConfigInternal
}
