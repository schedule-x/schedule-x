import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const createClickOutsideListener = (
  $app: CalendarAppSingleton,
  modalId: string
) => {
  return function (e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.closest(`#${modalId}`)) return
    console.log('click outside')

    $app.calendarState.setLastClickedEvent(null)
  }
}
