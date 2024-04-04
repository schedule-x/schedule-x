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

  if ($app.config.plugins.sidebar) {
    setIsOpen($app.config.plugins.sidebar.isOpen.value)
  }

  const handleChangeAppointments = () => {
    if ($app.config.callbacks.onChangeToAppointments) {
      $app.config.callbacks.onChangeToAppointments()
    }
  }

  const handleAddTimeOff = () => {
    if ($app.config.callbacks.onAddTimeOff) {
      $app.config.callbacks.onAddTimeOff()
    }
  }

  const handleToggleSidePanel = () => {
    if (!$app.config.plugins.sidebar) return
    $app.config.plugins.sidebar.isOpen.value =
      !$app.config.plugins.sidebar?.isOpen.value
    setIsOpen($app.config.plugins.sidebar.isOpen.value)
    if ($app.config.callbacks.onToggleSidePanel) {
      $app.config.callbacks.onToggleSidePanel(
        $app.config.plugins.sidebar.isOpen.value
      )
    }
  }

  return (
    <header className={'sx__calendar-header'}>
      <div className={'sx__calendar-header-content'}>
        <div>
          {$app.config.plugins.sidebar &&
            (isOpen ? (
              <img
                src={hideSidePanelIcon}
                className="cursor-pointer"
                alt="Icon hide side panel"
                onClick={handleToggleSidePanel}
              />
            ) : (
              <img
                src={showSidePanelIcon}
                className="cursor-pointer"
                alt="Icon open side panel"
                onClick={handleToggleSidePanel}
              />
            ))}

          <div
            className={'sx__calendar-header-change-btn-appointments'}
            onClick={handleChangeAppointments}
          >
            <img src={changeIcon} width={30} alt="" />
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
          onClick={handleAddTimeOff}
        >
          <img src={calendarIcon} alt="Calendar icon" width="24" />
          <span>{$app.translate('Add time off')}</span>
        </div>
        <div></div>
      </div>
    </header>
  )
}
