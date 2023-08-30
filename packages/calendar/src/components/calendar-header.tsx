import AppWrapper from '@schedule-x/date-picker/src/components/app-wrapper'
import { useContext } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import DatePickerAppSingletonBuilder from '@schedule-x/date-picker/src/utils/stateful/app-singleton/date-picker-app-singleton.builder'

export default function CalendarHeader() {
  const $app = useContext(AppContext)

  const datePickerAppSingleton = new DatePickerAppSingletonBuilder()
    .withDatePickerState($app.datePickerState)
    .withConfig($app.datePickerConfig)
    .withTranslate($app.translate)
    .withTimeUnitsImpl($app.timeUnitsImpl)
    .build()

  return (
    <header className={'sx__calendar-header'}>
      {$app.calendarState.range.value?.start}-
      {$app.calendarState.range.value?.end}
      <AppWrapper $app={datePickerAppSingleton}></AppWrapper>
    </header>
  )
}
