import AppWrapper from '@schedule-x/date-picker/src/components/app-wrapper'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerAppSingletonBuilder from '@schedule-x/shared/src/utils/stateful/date-picker/app-singleton/date-picker-app-singleton.builder'
import RangeHeading from './range-heading'
import TodayButton from './today-button'
import ViewSelection from './view-selection'
import ForwardBackwardNavigation from './forward-backward-navigation'

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
      <div className={'sx__calendar-header-content'}>
        <TodayButton />

        <ForwardBackwardNavigation />

        <RangeHeading />
      </div>

      <div className={'sx__calendar-header-content'}>
        <ViewSelection />

        <AppWrapper $app={datePickerAppSingleton}></AppWrapper>
      </div>
    </header>
  )
}
