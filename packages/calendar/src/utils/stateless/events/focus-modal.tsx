import { CalendarAppSingleton } from '@schedule-x/shared/src'

export const focusModal = ($app: CalendarAppSingleton) => {
  const calendarWrapper = $app.elements.calendarWrapper
  if (!(calendarWrapper instanceof HTMLElement)) return
  const eventModal = calendarWrapper.querySelector('.sx__event-modal')
  if (!(eventModal instanceof HTMLElement)) return

  setTimeout(() => {
    eventModal.focus()
  }, 100)
}
