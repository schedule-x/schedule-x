import AppWrapper from '@schedule-x/date-picker/src/components/app-wrapper'
import { useContext, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerAppSingletonBuilder from '@schedule-x/shared/src/utils/stateful/date-picker/app-singleton/date-picker-app-singleton.builder'
import RangeHeading from './range-heading'
import TodayButton from './today-button'
import ViewSelection from './view-selection'
import ForwardBackwardNavigation from './forward-backward-navigation'
import hideSidePanelIcon from './hide_sidebar_horizontal_icon_128227.svg'
import showSidePanelIcon from './show_sidebar_horizontal_icon_128225.svg'

export default function CalendarHeader() {
  const $app = useContext(AppContext)

  const datePickerAppSingleton = new DatePickerAppSingletonBuilder()
    .withDatePickerState($app.datePickerState)
    .withConfig($app.datePickerConfig)
    .withTranslate($app.translate)
    .withTimeUnitsImpl($app.timeUnitsImpl)
    .build()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={'sx__calendar-header'}>
      <div className={'sx__calendar-header-content'}>
        {isOpen ? (
          <>
            <img src={hideSidePanelIcon} onClick={() => setIsOpen(false)} />
          </>
        ) : (
          <>
            <img src={showSidePanelIcon} onClick={() => setIsOpen(true)} />
          </>
        )}
        <TodayButton />
        {!$app.calendarState.isCalendarSmall.value && (
          <ForwardBackwardNavigation />
        )}
        <RangeHeading />
      </div>

      <div className={'sx__calendar-header-content'}>
        <ViewSelection toggleView={true} />

        <AppWrapper $app={datePickerAppSingleton}></AppWrapper>
      </div>
    </header>
  )
}
