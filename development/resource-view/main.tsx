import 'temporal-polyfill/global'
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import { createCalendar } from '@schedule-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../../packages/time-grid-resource-view/src/styles/index.scss'
import '../app.css'
import { createViewTimeGridResource } from '../../packages/time-grid-resource-view/src/view-factory'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller/src'

const calendarElement = document.getElementById('calendar') as HTMLElement

const scrollController = createScrollControllerPlugin()

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-11-22'),
  defaultView: 'time-grid-resource',
  views: [createViewTimeGridResource()],
  plugins: [scrollController],
  resources: [
    { id: 'room-a', label: 'Room A', ordering: 1 },
    { id: 'room-b', label: 'Room B', ordering: 2 },
  ],
  locale: 'en-US',
  timezone: 'Europe/London',
  events: [
    // Room A events (week of Nov 22, 2025)
    {
      id: 1,
      title: 'Meeting A1',
      start: Temporal.ZonedDateTime.from('2025-11-17T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-17T10:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 2,
      title: 'Meeting A2',
      start: Temporal.ZonedDateTime.from('2025-11-17T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-17T15:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 3,
      title: 'Meeting A3',
      start: Temporal.ZonedDateTime.from('2025-11-18T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-18T11:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 4,
      title: 'Meeting A4',
      start: Temporal.ZonedDateTime.from('2025-11-19T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-19T14:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 5,
      title: 'Meeting A5',
      start: Temporal.ZonedDateTime.from('2025-11-17T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-17T11:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 6,
      title: 'Meeting A6',
      start: Temporal.ZonedDateTime.from('2025-11-18T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-18T12:30[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 7,
      title: 'Meeting A7',
      start: Temporal.ZonedDateTime.from('2025-11-19T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-19T11:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 8,
      title: 'Meeting A8',
      start: Temporal.ZonedDateTime.from('2025-11-20T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-20T15:00[Europe/London]'),
      resourceId: 'room-a',
    },
    // Room B events
    {
      id: 9,
      title: 'Meeting B1',
      start: Temporal.ZonedDateTime.from('2025-11-17T09:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-17T10:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 10,
      title: 'Meeting B2',
      start: Temporal.ZonedDateTime.from('2025-11-17T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-17T12:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 11,
      title: 'Meeting B3',
      start: Temporal.ZonedDateTime.from('2025-11-18T14:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-18T16:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 12,
      title: 'Meeting B4',
      start: Temporal.ZonedDateTime.from('2025-11-20T10:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-20T11:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 13,
      title: 'Meeting B5',
      start: Temporal.ZonedDateTime.from('2025-11-18T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-18T10:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 14,
      title: 'Meeting B6',
      start: Temporal.ZonedDateTime.from('2025-11-19T15:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-19T16:30[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 15,
      title: 'Meeting B7',
      start: Temporal.ZonedDateTime.from('2025-11-20T13:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-20T14:00[Europe/London]'),
      resourceId: 'room-b',
    },
    {
      id: 16,
      title: 'Meeting B8',
      start: Temporal.ZonedDateTime.from('2025-11-21T11:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-21T12:00[Europe/London]'),
      resourceId: 'room-b',
    },
    // Concurrent events for testing concurrency algorithm
    {
      id: 17,
      title: 'Concurrent A1',
      start: Temporal.ZonedDateTime.from('2025-11-21T09:00[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-21T10:00[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 18,
      title: 'Concurrent A2',
      start: Temporal.ZonedDateTime.from('2025-11-21T09:15[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-21T10:15[Europe/London]'),
      resourceId: 'room-a',
    },
    {
      id: 19,
      title: 'Concurrent A3',
      start: Temporal.ZonedDateTime.from('2025-11-21T09:30[Europe/London]'),
      end: Temporal.ZonedDateTime.from('2025-11-21T10:30[Europe/London]'),
      resourceId: 'room-a',
    },
    // Full day events
    {
      id: 20,
      title: 'Full Day Event',
      start: Temporal.PlainDate.from('2025-11-22'),
      end: Temporal.PlainDate.from('2025-11-22'),
      resourceId: 'room-b',
    },
    {
      id: 21,
      title: 'Conference Day 1',
      start: Temporal.PlainDate.from('2025-11-17'),
      end: Temporal.PlainDate.from('2025-11-17'),
      resourceId: 'room-a',
    },
    {
      id: 22,
      title: 'Training Session',
      start: Temporal.PlainDate.from('2025-11-19'),
      end: Temporal.PlainDate.from('2025-11-19'),
      resourceId: 'room-a',
    },
    {
      id: 23,
      title: 'Maintenance Day',
      start: Temporal.PlainDate.from('2025-11-21'),
      end: Temporal.PlainDate.from('2025-11-21'),
      resourceId: 'room-b',
    },
  ],
})

calendar.render(calendarElement)

