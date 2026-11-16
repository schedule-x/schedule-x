import { createCalendar, viewWeek } from '@schedule-x/calendar'
import { Temporal } from 'temporal-polyfill'

// @ts-expect-error Calendar's declarations must leave the global scope alone.
void globalThis.Temporal

const start = Temporal.ZonedDateTime.from('2026-11-14T10:00:00[UTC]')

createCalendar({
  views: [viewWeek],
  selectedDate: start.toPlainDate(),
  events: [{ id: 'event', start, end: start.add({ hours: 1 }) }],
  callbacks: {
    onSelectedDateUpdate(date) {
      const selectedDate: Temporal.PlainDate = date
      selectedDate.add({ days: 1 })
    },
  },
})
