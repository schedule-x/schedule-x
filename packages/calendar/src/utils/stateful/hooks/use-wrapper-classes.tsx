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
    if ($app.config.theme === 'shadcn') classes.push('is-shadcn')
    classes.push(`is-${$app.calendarState.view.value}-view`)

    setWrapperClasses(classes)
  })

  return wrapperClasses
}
