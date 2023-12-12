import CalendarHeader from './header/calendar-header'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { AppContext } from '../utils/stateful/app-context'
import { useEffect, useState } from 'preact/hooks'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { setWrapperElement } from '../utils/stateless/dom/set-wrapper-element'
import { handleWindowResize } from '../utils/stateless/dom/handle-window-resize'
import useWrapperClasses from '../utils/stateful/hooks/use-wrapper-classes'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
  const calendarId = randomStringId()
  const viewContainerId = randomStringId()

  useEffect(() => setWrapperElement($app, calendarId), [])

  const onResize = () => {
    handleWindowResize($app)
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const wrapperClasses = useWrapperClasses($app)

  const [currentView, setCurrentView] = useState<View | null>()

  const renderSelectedView = () => {
    const newView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    const viewElement = document.getElementById(viewContainerId)

    if (!newView || !viewElement || newView.name === currentView?.name) return

    if (currentView) currentView.destroy()
    setCurrentView(newView)
    newView.render(viewElement, $app)
  }
  useEffect(renderSelectedView, [$app.calendarState.view.value])

  const [previousRangeStart, setPreviousRangeStart] = useState('')
  const [transitionClass, setTransitionClass] = useState('')

  useEffect(() => {
    const isLater =
      ($app.calendarState.range.value?.start || '') > previousRangeStart
    setTransitionClass(isLater ? 'sx__slide-left' : 'sx__slide-right')

    setTimeout(() => {
      setTransitionClass('')
    }, 300)
    setPreviousRangeStart($app.calendarState.range.value?.start || '')
  }, [$app.calendarState.range.value])

  return (
    <>
      <div className={wrapperClasses.join(' ')} id={calendarId}>
        <div className={'sx__calendar'}>
          <AppContext.Provider value={$app}>
            <CalendarHeader />

            <div
              className={['sx__view-container', transitionClass].join(' ')}
              id={viewContainerId}
            ></div>

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
