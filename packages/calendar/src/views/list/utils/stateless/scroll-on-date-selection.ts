import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { RefObject } from 'preact'

export const scrollOnDateSelection = (
  $app: CalendarAppSingleton,
  wrapperRef: RefObject<HTMLDivElement>
) => {
  if (!wrapperRef.current) return

  const selectedDate = $app.datePickerState.selectedDate.value
  const selectedDayElement = wrapperRef.current.querySelector(
    `.sx__list-day[data-date="${selectedDate}"]`
  )

  if (
    typeof HTMLElement !== 'undefined' &&
    selectedDayElement instanceof HTMLElement
  ) {
    requestAnimationFrame(() => {
      selectedDayElement.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    })
  }
}
