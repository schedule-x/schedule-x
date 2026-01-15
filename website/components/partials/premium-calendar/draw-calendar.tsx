import { viewDay, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import { calendars } from './data/calendars'
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createDrawPlugin } from "@sx-premium/draw";
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { randomStringId } from '@schedule-x/shared'
import 'temporal-polyfill/global'

export default function DrawCalendar() {
  const eventsService = createEventsServicePlugin()

  const drawPlugin = createDrawPlugin({
    onFinishDrawing: (event) => {
      console.log('Event drawn:', event)
      // In a real app, you would save the event to your server here
    },
    snapDuration: 30, // Snap to 30-minute intervals
  })

  const calendarApp = useNextCalendarApp({
    views: [viewMonthGrid, viewWeek, viewDay],
    selectedDate: Temporal.PlainDate.from('2024-05-06'),
    defaultView: viewWeek.name,
    timezone: 'America/New_York',
    events: [
      {
        id: randomStringId(),
        title: 'Existing event',
        start: Temporal.ZonedDateTime.from('2024-05-06T10:00:00-04:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2024-05-06T12:00:00-04:00[America/New_York]'),
        calendarId: 'personal',
      },
      {
        id: randomStringId(),
        title: 'All-day event',
        start: Temporal.PlainDate.from('2024-05-07'),
        end: Temporal.PlainDate.from('2024-05-07'),
        calendarId: 'team',
      }
    ],
    calendars: calendars,
    callbacks: {
      onMouseDownDateTime(dateTime, mouseDownEvent) {
        drawPlugin.drawTimeGridEvent(dateTime, mouseDownEvent, {
          title: 'New event',
          calendarId: 'personal',
        })
      },
      onMouseDownMonthGridDate(date) {
        drawPlugin.drawMonthGridEvent(date, {
          title: 'New event',
          calendarId: 'personal',
        })
      },
      onMouseDownDateGridDate(date, mouseDownEvent) {
        drawPlugin.drawDateGridEvent(date, mouseDownEvent, {
          title: 'New event',
          calendarId: 'personal',
        })
      }
    },
    plugins: [
      createDragAndDropPlugin(),
      createScrollControllerPlugin({ initialScroll: '05:50' }),
      eventsService,
      drawPlugin,
      createEventModalPlugin(),
    ],
  })

  return (
    <div className="appCalendarWrapper">
      <div style={{ 
        marginBottom: '16px', 
        padding: '12px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Try it out:</strong> Click and drag on the calendar to draw events. Works in week, day, and month views.
      </div>
      <ScheduleXCalendar calendarApp={calendarApp}/>
    </div>
  )
}

