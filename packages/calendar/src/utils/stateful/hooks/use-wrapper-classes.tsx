import { useEffect, useState } from 'preact/compat'
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

    if ($app.config.isDark) classes.push('is-dark')
  }, [$app.calendarState.isCalendarSmall.value, $app.config.isDark])

  return wrapperClasses
}
