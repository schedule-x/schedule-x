import CalendarHeader from './header/calendar-header'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { AppContext } from '../utils/stateful/app-context'
import { useEffect, useState } from 'preact/compat'
import { View } from '../types/view'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { setWrapperElement } from '../utils/stateless/dom/set-wrapper-element'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
  const calendarId = randomStringId()
  const viewContainerId = randomStringId()
  const [currentView, setCurrentView] = useState<View | null>()

  const changeView = () => {
    const newView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    const viewElement = document.getElementById(viewContainerId)

    if (!newView || !viewElement) return

    if (currentView) currentView.destroy()
    setCurrentView(newView)
    newView.render(viewElement, $app)
  }
  useEffect(changeView, [$app.calendarState.view.value])

  useEffect(() => setWrapperElement($app, calendarId), [])

  return (
    <>
      <div className={'sx__calendar-wrapper'} id={calendarId}>
        <div className={'sx__calendar'}>
          <AppContext.Provider value={$app}>
            {$app.config.plugins.eventModal &&
              $app.calendarState.lastClickedEvent.value &&
              $app.config.plugins.eventModal.ComponentFn({
                calendarEvent: $app.calendarState.lastClickedEvent.value,
              })}

            <CalendarHeader />

            <div className="sx__view-container" id={viewContainerId}></div>
          </AppContext.Provider>
        </div>
      </div>
    </>
  )
}
