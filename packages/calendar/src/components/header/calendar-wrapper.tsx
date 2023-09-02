import CalendarHeader from './calendar-header'
import CalendarAppSingleton from '../../utils/stateful/app-singleton/calendar-app-singleton'
import { AppContext } from '../../utils/stateful/app-context'
import { useEffect, useState } from 'preact/compat'
import { View } from '../../types/view'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
  const viewContainerId = Math.random().toString(36).substring(2, 11)
  const [currentView, setCurrentView] = useState<View | null>()

  useEffect(() => {
    const newView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    const viewElement = document.getElementById(viewContainerId)

    if (!newView || !viewElement) return

    if (currentView) currentView.destroy()
    setCurrentView(newView)
    newView.render(viewElement, $app)
  }, [$app.calendarState.view.value])

  return (
    <>
      <div className={'sx__calendar-wrapper'}>
        <AppContext.Provider value={$app}>
          <CalendarHeader />

          <div id={viewContainerId}></div>
        </AppContext.Provider>
      </div>
    </>
  )
}
