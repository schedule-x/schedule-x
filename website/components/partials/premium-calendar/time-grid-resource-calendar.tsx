import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import { calendars } from './data/calendars';
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createViewTimeGridResource } from "@sx-premium/time-grid-resource-view";
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
    views: [createViewTimeGridResource()],
    selectedDate: Temporal.PlainDate.from('2024-05-06'),
    timezone: 'America/New_York',
    resources,
    events: [
      // Monday (2024-05-06)
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
      // Tuesday (2024-05-07)
      {
        id: '7',
        title: 'Morning sync',
        start: Temporal.ZonedDateTime.from('2024-05-07T08:30:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-07T09:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '8',
        title: 'Code review',
        start: Temporal.ZonedDateTime.from('2024-05-07T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-07T11:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '9',
        title: 'Training session',
        start: Temporal.ZonedDateTime.from('2024-05-07T09:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-07T12:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '10',
        title: 'Team lunch',
        start: Temporal.ZonedDateTime.from('2024-05-07T12:30:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-07T13:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '11',
        title: 'Project kickoff',
        start: Temporal.ZonedDateTime.from('2024-05-07T14:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-07T16:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      // Wednesday (2024-05-08)
      {
        id: '12',
        title: 'Daily standup',
        start: Temporal.ZonedDateTime.from('2024-05-08T09:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-08T09:15:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '13',
        title: 'Architecture discussion',
        start: Temporal.ZonedDateTime.from('2024-05-08T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-08T11:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '14',
        title: 'UX workshop',
        start: Temporal.ZonedDateTime.from('2024-05-08T09:30:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-08T11:30:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '15',
        title: 'Client call',
        start: Temporal.ZonedDateTime.from('2024-05-08T13:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-08T14:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '16',
        title: 'Retrospective',
        start: Temporal.ZonedDateTime.from('2024-05-08T15:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-08T16:30:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      // Thursday (2024-05-09)
      {
        id: '17',
        title: 'Planning meeting',
        start: Temporal.ZonedDateTime.from('2024-05-09T08:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-09T09:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '18',
        title: 'Design review',
        start: Temporal.ZonedDateTime.from('2024-05-09T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-09T11:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '19',
        title: 'All hands',
        start: Temporal.ZonedDateTime.from('2024-05-09T11:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-09T12:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '20',
        title: 'Technical deep dive',
        start: Temporal.ZonedDateTime.from('2024-05-09T13:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-09T15:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '21',
        title: 'Q&A session',
        start: Temporal.ZonedDateTime.from('2024-05-09T15:30:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-09T16:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      // Friday (2024-05-10)
      {
        id: '22',
        title: 'Week review',
        start: Temporal.ZonedDateTime.from('2024-05-10T09:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-10T10:00:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '23',
        title: 'Demo day prep',
        start: Temporal.ZonedDateTime.from('2024-05-10T10:30:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-10T12:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
      {
        id: '24',
        title: 'Sprint demo',
        start: Temporal.ZonedDateTime.from('2024-05-10T14:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-10T15:30:00-04:00[America/New_York]'),
        resourceId: 'room-1',
      },
      {
        id: '25',
        title: 'Team building',
        start: Temporal.ZonedDateTime.from('2024-05-10T15:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-10T17:00:00-04:00[America/New_York]'),
        resourceId: 'room-2',
      },
    ],
    calendars: calendars,
    plugins: [
      eventsService,
      createScrollControllerPlugin({ initialScroll: '08:00' }),
    ],
  })

  return <>
    <ScheduleXCalendar calendarApp={calendarApp} />
  </>
}

