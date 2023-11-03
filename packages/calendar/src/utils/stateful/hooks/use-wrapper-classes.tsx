import { useEffect, useState } from 'preact/compat'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { handleWindowResize } from '../../stateless/dom/handle-window-resize'

export default function useWrapperClasses($app: CalendarAppSingleton) {
  const calendarWrapperClass = 'sx__calendar-wrapper'
  const [wrapperClasses, setWrapperClasses] = useState<string[]>([
    calendarWrapperClass,
  ])

  useEffect(() => {
    const classes = [calendarWrapperClass]
    if ($app.calendarState.isCalendarSmall.value)
      classes.push('sx__is-calendar-small')
    setWrapperClasses(classes)

    handleWindowResize($app) // remove and do this somewhere more appropriate. We cannot do this here, since the initially rendered view will then be overwritten in a few ms
  }, [$app.calendarState.isCalendarSmall.value])

  return wrapperClasses
}
