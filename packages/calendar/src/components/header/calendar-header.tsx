import { useContext, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import RangeHeading from './range-heading'
import TodayButton from './today-button'
import ViewSelection from './view-selection'
import ForwardBackwardNavigation from './forward-backward-navigation'
import hideSidePanelIcon from './hide_sidebar_horizontal_icon_128227.svg'
import showSidePanelIcon from './show_sidebar_horizontal_icon_128225.svg'
import changeIcon from './change_icon.svg'
import calendarIcon from './calendar_icon.svg'

export default function CalendarHeader() {
  const $app = useContext(AppContext)

  const [isOpen, setIsOpen] = useState(false)

  const handleChangeAppointments = () => {
    console.log('change to my appointments')
  }

  const handleAddTimeOff = () => {
    $app.customCallbacks?.onAddTimeOff()
    console.log('handleAddTimeOff function')
  }

  return (
    <header className={'sx__calendar-header'}>
      <div className={'sx__calendar-header-content'}>
        <div>
          {isOpen ? (
            <img
              src={hideSidePanelIcon}
              className="cursor-pointer"
              alt="Icon hide side panel"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <img
              src={showSidePanelIcon}
              className="cursor-pointer"
              alt="Icon open side panel"
              onClick={() => setIsOpen(true)}
            />
          )}

          <div className={'sx__calendar-header-change-btn-appointments'}>
            <img
              src={changeIcon}
              onClick={() => handleChangeAppointments()}
              width={30}
              alt=""
            />
            {$app.translate('My appointments')}
          </div>
        </div>

        <div>
          <TodayButton />
          {!$app.calendarState.isCalendarSmall.value && (
            <ForwardBackwardNavigation />
          )}
          <RangeHeading />
        </div>

        <ViewSelection toggleView={true} />

        <div
          className={'sx__calendar-header-content-add-time-off'}
          onClick={() => handleAddTimeOff()}
        >
          <img src={calendarIcon} alt="Calendar icon" width="24" />
          <span>{$app.translate('Add time off')}</span>
        </div>
        <div></div>
      </div>
    </header>
  )
}
