import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import { calendars } from './data/calendars'
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createEventRecurrencePlugin} from "@schedule-x/event-recurrence";
import { useEffect } from 'react'
import { randomStringId } from '@schedule-x/shared'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import 'temporal-polyfill/global'

export default function DragToCreateCalendar() {
  const eventsService = createEventsServicePlugin()

  const dragToCreatePlugin = createDragToCreatePlugin()

  const calendarApp = useNextCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: Temporal.PlainDate.from('2024-05-06'),
    defaultView: viewWeek.name,
    timezone: 'America/New_York',
    events: [
      {
        id: 1,
        title: 'Weekly event',
        start: Temporal.ZonedDateTime.from('2024-05-11T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T12:00:00-04:00[America/New_York]'),
        calendarId: 'personal',
        people: ['Ted Mosby', 'Barney Stinson'],
        rrule: 'FREQ=WEEKLY;UNTIL=20240701T235959'
      },
      {
        id: 2,
        title: 'Event 2',
        start: Temporal.ZonedDateTime.from('2024-05-11T14:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T16:00:00-04:00[America/New_York]'),
        calendarId: 'personal',
      },
      {
        id: 3,
        title: 'Event 3',
        start: Temporal.ZonedDateTime.from('2024-05-11T08:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T09:00:00-04:00[America/New_York]'),
        calendarId: 'team',
      },
      {
        id: 4,
        title: 'Event 4',
        start: Temporal.ZonedDateTime.from('2024-05-11T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-11T11:00:00-04:00[America/New_York]'),
        calendarId: 'team',
      },
      {
        id: 5,
        title: 'Event 5',
        start: Temporal.ZonedDateTime.from('2024-05-06T07:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T09:10:00-04:00[America/New_York]'),
        calendarId: 'clients',
      },
      {
        id: 6,
        title: 'Event 6',
        start: Temporal.PlainDate.from('2024-05-07'),
        end: Temporal.PlainDate.from('2024-05-07'),
        calendarId: 'clients',
      }
    ],
    calendars: calendars,
    plugins: [
      createDragAndDropPlugin(),
      createScrollControllerPlugin({ initialScroll: '05:50' }),
      eventsService,
      dragToCreatePlugin,
      createEventRecurrencePlugin(),
      createEventModalPlugin(),
    ],
  })

  useEffect(() => {
    const personal1 = document.getElementById('event-to-drag-personal-1')
    const personal2 = document.getElementById('event-to-drag-personal-2')

    personal1?.addEventListener('dragstart', () => {
      dragToCreatePlugin.dragToCreate(randomStringId(), {
        calendarId: 'personal',
      })
    })

    personal2?.addEventListener('dragstart', () => {
      dragToCreatePlugin.dragToCreate(randomStringId(), {
        calendarId: 'personal',
        people: ['John', 'Jane', 'Josephine'],
      })
    })
  }, []);

  return <>
    <div className="appCalendarWrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '20px'}}>
        <div draggable="true" id="event-to-drag-personal-1"
             style={{ backgroundColor: '#fff5aa', color: '#594800', cursor: 'pointer', borderLeft: '3px solid #d0b316', borderRadius: '2px', width: '120px', padding: '2px 4px' }}>
          (No title)
        </div>

        <div draggable="true" id="event-to-drag-personal-2"
             style={{ backgroundColor: '#fff5aa', color: '#594800', cursor: 'pointer', borderLeft: '3px solid #d0b316', borderRadius: '2px', width: '120px', padding: '4px 8px'}}>
          <div>(No title)</div>
          <div>John, Jane & Josephine</div>
        </div>
      </div>

      <ScheduleXCalendar calendarApp={calendarApp}/>
    </div>
  </>
}
