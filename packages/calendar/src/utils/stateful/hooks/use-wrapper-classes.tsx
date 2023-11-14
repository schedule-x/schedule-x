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
  }, [$app.calendarState.isCalendarSmall.value])

  return wrapperClasses
}
