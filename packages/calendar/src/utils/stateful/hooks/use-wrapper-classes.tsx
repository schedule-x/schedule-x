import { useState } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { useSignalEffect } from '@preact/signals'

const getClassForView = ($app: CalendarAppSingleton) => {
  return `is-${$app.calendarState.view.value}-view`
}

export default function useWrapperClasses($app: CalendarAppSingleton) {
  const calendarWrapperClass = 'sx__calendar-wrapper'
  const [wrapperClasses, setWrapperClasses] = useState<string[]>([
    calendarWrapperClass,
    getClassForView($app),
  ])

  useSignalEffect(() => {
    const classes = [calendarWrapperClass]
    if ($app.calendarState.isCalendarSmall.value)
      classes.push('sx__is-calendar-small')
    if ($app.calendarState.isDark.value) classes.push('is-dark')
    if ($app.config.theme === 'shadcn') classes.push('is-shadcn')
    classes.push(getClassForView($app))

    setWrapperClasses(classes)
  })

  return wrapperClasses
}
