import AppSingleton from '../app-singleton.interface'
import DatePickerConfigInternal from './config.interface'

export default interface DatePickerAppSingleton extends AppSingleton {
  config: DatePickerConfigInternal
}
