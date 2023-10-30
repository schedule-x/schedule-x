import CalendarHeader from './header/calendar-header'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { AppContext } from '../utils/stateful/app-context'
import { useEffect, useState } from 'preact/compat'
import { View } from '../types/view'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { setWrapperElement } from '../utils/stateless/dom/set-wrapper-element'
import { handleWindowResize } from '../utils/stateless/dom/handle-window-resize'

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

  const onResize = () => {
    handleWindowResize($app)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <>
      <div className={'sx__calendar-wrapper'} id={calendarId}>
        <div className={'sx__calendar'}>
          <AppContext.Provider value={$app}>
            <CalendarHeader />

            <div className="sx__view-container" id={viewContainerId}></div>

            {$app.config.plugins.eventModal &&
              $app.config.plugins.eventModal.calendarEvent.value && (
                <$app.config.plugins.eventModal.ComponentFn $app={$app} />
              )}
          </AppContext.Provider>
        </div>
      </div>
    </>
  )
}
