import AppSingleton from '../../../../../../shared/interfaces/app-singleton.interface'
import CalendarConfigInternal from '../config/calendar-config'

export default interface CalendarAppSingleton extends AppSingleton {
  config: CalendarConfigInternal
}
