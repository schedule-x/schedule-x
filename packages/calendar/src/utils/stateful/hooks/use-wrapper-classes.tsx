import { useState } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { useSignalEffect } from '@preact/signals'

export default function useWrapperClasses($app: CalendarAppSingleton) {
  const calendarWrapperClass = 'sx__calendar-wrapper'
  const [wrapperClasses, setWrapperClasses] = useState<string[]>([
    calendarWrapperClass,
  ])

  useSignalEffect(() => {
    const classes = [calendarWrapperClass]
    if ($app.calendarState.isCalendarSmall.value)
      classes.push('sx__is-calendar-small')
    if ($app.calendarState.isDark.value) classes.push('is-dark')

    setWrapperClasses(classes)
  })

  return wrapperClasses
}
