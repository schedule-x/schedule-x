/* eslint-disable max-lines */
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import {
  ScheduleXCalendar,
  useNextCalendarApp,
} from '@schedule-x/react/dist/index'
import { calendars } from './data/calendars'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'
import { createSidebarPlugin } from '@sx-premium/sidebar'
import { createEventsServicePlugin } from '@schedule-x/event-recurrence'
import { createDragToCreatePlugin } from '@sx-premium/drag-to-create'
import { createEventRecurrencePlugin } from '@schedule-x/event-recurrence'

export default function SidebarCalendar() {
  const eventsService = createEventsServicePlugin()

  const calendarApp = useNextCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: '2024-05-06',
    defaultView: viewWeek.name,
    events: [
      {
        id: 1,
        title: 'Weekly event',
        start: '2024-05-11 10:00',
        end: '2024-05-11 12:00',
        calendarId: 'personal',
        people: ['Ted Mosby', 'Barney Stinson'],
        rrule: 'FREQ=WEEKLY;UNTIL=20240701T235959',
      },
      {
        id: 2,
        title: 'Event 2',
        start: '2024-05-11 14:00',
        end: '2024-05-11 16:00',
        calendarId: 'personal',
      },
      {
        id: 3,
        title: 'Event 3',
        start: '2024-05-11 08:00',
        end: '2024-05-11 09:00',
        calendarId: 'team',
      },
      {
        id: 4,
        title: 'Event 4',
        start: '2024-05-11 10:00',
        end: '2024-05-11 11:00',
        calendarId: 'team',
      },
      {
        id: 5,
        title: 'Event 5',
        start: '2024-05-06 07:00',
        end: '2024-05-06 09:10',
        calendarId: 'clients',
      },
      {
        id: 6,
        title: 'Event 6',
        start: '2024-05-07',
        end: '2024-05-07',
        calendarId: 'clients',
      },
    ],
    calendars: calendars,
    plugins: [
      createDragAndDropPlugin(),
      createScrollControllerPlugin({ initialScroll: '05:50' }),
      eventsService,
      createDragToCreatePlugin(),
      createEventRecurrencePlugin(),
      createSidebarPlugin({
        eventsService,
        openOnRender: typeof window === 'object' && window.innerWidth > 768,
        activeCalendarIds: ['personal', 'clients', 'team'],
        placeholderEvents: [
          {
            title: 'Morning brief',
            calendarId: 'team',
            people: ['John Doe', 'Jane Doe', 'Steve Smith'],
          },
          {
            title: 'Client demo',
            calendarId: 'clients',
            people: ['John Doe', 'Jane Doe'],
          },
          {
            title: 'Team meeting',
            calendarId: 'clients',
            people: ['John Doe', 'Jane Doe', 'Steve Smith'],
          },
        ],
      }),
    ],
  })

  return (
    <>
      <div className={['appCalendarWrapper'].join(' ')}>
        <ScheduleXCalendar calendarApp={calendarApp} />
      </div>
    </>
  )
}
