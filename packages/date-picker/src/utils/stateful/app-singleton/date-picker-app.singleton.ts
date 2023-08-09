import AppSingleton from '../../../../../../shared/interfaces/app-singleton.interface'
import DatePickerConfigInternal from '../config/config.interface'

export default interface DatePickerAppSingleton extends AppSingleton {
  config: DatePickerConfigInternal
}
