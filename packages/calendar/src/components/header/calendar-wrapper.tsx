import CalendarHeader from './calendar-header'
import CalendarAppSingleton from '../../utils/stateful/app-singleton/calendar-app-singleton'
import { AppContext } from '../../utils/stateful/app-context'
import { useEffect, useState } from 'preact/compat'
import { View } from '../../types/view'
import { randomStringId } from '../../../../../shared/utils/stateless/strings/random'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
  const viewContainerId = randomStringId()
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
