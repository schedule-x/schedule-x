import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'

export const createClickOutsideListener = (
  $app: CalendarAppSingleton,
  modalId: string
) => {
  return function (e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.closest(`#${modalId}`)) return

    ;($app.config.plugins.eventModal as EventModalPlugin).setCalendarEvent(
      null,
      null
    )
  }
}
