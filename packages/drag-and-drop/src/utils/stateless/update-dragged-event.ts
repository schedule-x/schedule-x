import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export class EventUpdater {
  constructor(
    private $app: CalendarAppSingleton,
    private startPreDrag: string,
    private endPreDrag: string
  ) {}

  updateDraggedEvent = (eventCopy: CalendarEventInternal) => {
    if (
      'rrule' in eventCopy._getForeignProperties() &&
      this.$app.config.plugins.eventRecurrence
    ) {
      this.updateRecurringEvent(eventCopy, this.startPreDrag)
    } else {
      this.updateNonRecurringEvent(eventCopy)
    }

    if (this.$app.config.callbacks.onEventUpdate) {
      this.$app.config.callbacks.onEventUpdate(eventCopy._getExternalEvent())
    }
  }

  updateRecurringEvent = (
    eventCopy: CalendarEventInternal,
    startPreDrag: string
  ) => {
    this.$app.config.plugins.eventRecurrence?.updateRecurrenceDND(
      eventCopy.id,
      startPreDrag,
      eventCopy.start
    )
  }

  updateNonRecurringEvent = (eventCopy: CalendarEventInternal) => {
    const eventToUpdate = this.$app.calendarEvents.list.value.find(
      (event) => event.id === eventCopy.id
    )
    if (!eventToUpdate) return

    eventToUpdate.start = eventCopy.start
    eventToUpdate.end = eventCopy.end
    this.$app.calendarEvents.list.value = [
      ...this.$app.calendarEvents.list.value,
    ]

    const undoRedoPlugin = this.$app.config.plugins.undoRedo

    if (undoRedoPlugin) {
      undoRedoPlugin.addUndoAction(
        () => {
          eventToUpdate.start = this.startPreDrag
          eventToUpdate.end = this.endPreDrag
          this.$app.calendarEvents.list.value = [
            ...this.$app.calendarEvents.list.value,
          ]
        },
        () => {
          eventToUpdate.start = eventCopy.start
          eventToUpdate.end = eventCopy.end
          this.$app.calendarEvents.list.value = [
            ...this.$app.calendarEvents.list.value,
          ]
        }
      )
    }
  }
}
