import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import { calendars } from './data/calendars';
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createViewTimeGridResourceView } from "@sx-premium/time-grid-resource-view";
import 'temporal-polyfill/global'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller';

export default function TimeGridResourceCalendar() {
  const eventsService = createEventsServicePlugin()

  const resources = [
    {
      id: 'room-1',
      label: 'Room A',
      colorName: 'room-a',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
      darkColors: {
        main: '#c0dfff',
        onContainer: '#dee6ff',
        container: '#426aa2',
      },
    },
    {
      id: 'room-2',
      label: 'Room B',
      colorName: 'room-b',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
  ]

  const calendarApp = useNextCalendarApp({
    locale: 'en-US',
    views: [createViewTimeGridResourceView()],
    selectedDate: Temporal.PlainDate.from('2024-05-06'),
    timezone: 'America/New_York',
    resources,
    events: [
      {
        id: '1',
        title: 'Team standup',
        start: Temporal.ZonedDateTime.from('2024-05-06T09:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T09:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '2',
        title: 'Client presentation',
        start: Temporal.ZonedDateTime.from('2024-05-06T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T12:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '3',
        title: 'Product review',
        start: Temporal.ZonedDateTime.from('2024-05-06T09:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T10:30:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '4',
        title: 'Design workshop',
        start: Temporal.ZonedDateTime.from('2024-05-06T13:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T15:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '5',
        title: 'Sprint planning',
        start: Temporal.ZonedDateTime.from('2024-05-06T14:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T16:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '6',
        title: 'One-on-one',
        start: Temporal.ZonedDateTime.from('2024-05-06T11:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T11:30:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
    ],
    calendars: calendars,
    plugins: [
      eventsService,
      createScrollControllerPlugin({ initialScroll: '07:00' }),
    ],
  })

  return <>
    <ScheduleXCalendar calendarApp={calendarApp} />
  </>
}

