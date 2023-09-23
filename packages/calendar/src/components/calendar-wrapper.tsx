import CalendarHeader from './header/calendar-header'
import CalendarAppSingleton from '../utils/stateful/app-singleton/calendar-app-singleton'
import { AppContext } from '../utils/stateful/app-context'
import { useEffect, useState } from 'preact/compat'
import { View } from '../types/view'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import PerfectScrollbar from 'perfect-scrollbar'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
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

  const initScrollbar = () => {
    const scrollContainer = document.querySelector('.sx__view-container')
    if (!scrollContainer) return
    const ps = new PerfectScrollbar(scrollContainer)
    return () => ps.destroy()
  }
  useEffect(initScrollbar, [])

  return (
    <>
      <div className={'sx__calendar-wrapper'}>
        <div className={'sx__calendar'}>
          <AppContext.Provider value={$app}>
            <CalendarHeader />

            <div className="sx__view-container" id={viewContainerId}></div>
          </AppContext.Provider>
        </div>
      </div>
    </>
  )
}
