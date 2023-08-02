import AppSingleton from '../../../../../../shared/interfaces/app-singleton.interface'
import DatePickerConfig from '../config/config.interface'

export default interface DatePickerAppSingleton extends AppSingleton {
  config: DatePickerConfig
}
