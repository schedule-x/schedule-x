/* eslint-disable max-lines */
import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { calendars } from './data/calendars'
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createEventRecurrencePlugin} from "@schedule-x/event-recurrence";
import { useEffect } from 'react'
import { randomStringId } from '@schedule-x/shared'
import { createEventModalPlugin } from '@schedule-x/event-modal'

export default function DragToCreateCalendar() {
  const eventsService = createEventsServicePlugin()

  const dragToCreatePlugin = createDragToCreatePlugin()

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
        rrule: 'FREQ=WEEKLY;UNTIL=20240701T235959'
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
