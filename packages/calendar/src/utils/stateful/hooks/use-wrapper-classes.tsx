import { useEffect, useState } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

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

    if ($app.calendarState.isDark.value) classes.push('is-dark')
  }, [
    $app.calendarState.isCalendarSmall.value,
    $app.calendarState.isDark.value,
  ])

  return wrapperClasses
}
