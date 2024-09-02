/* eslint-disable max-lines */
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { calendars } from './data/calendars';
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createInteractiveEventModal } from "@sx-premium/interactive-event-modal";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createResourceView} from "@sx-premium/resource-scheduler";
import {createEventRecurrencePlugin} from "@schedule-x/event-recurrence";

export default function ResourceCalendar() {
  const eventsService = createEventsServicePlugin()

  const interactiveEventModalPlugin = createInteractiveEventModal({
    eventsService,
    fields: {
      title: {
        validator: (value) => {
          return {
            message: 'Title is required',
            isValid: !!value
          }
        },
      },
      startTime: {},
      startDate: {},
      endDate: {},
      endTime: {},
      rruleFrequency: {},
      rruleUntil: {},
    },
    onAddEvent: (event) => {
      console.log(event)
    },
    onDeleteEvent: (eventId) => {
      console.log(eventId)
    }
  });

  const resourceView = createResourceView();
  resourceView.config.resources.value = [
    {
      id: 'conveyor-belt-a',
      label: 'Conveyor Belt A',
    },
    {
      id: 'conveyor-belt-b',
      label: 'Conveyor Belt B',
      colorName: 'belt-b',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
    },
    {
      id: 'welding',
      label: 'Jig Welding',
      colorName: 'welding',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
    },
    {
      id: 'cnc',
      label: 'CNC',
      colorName: 'cnc',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
    },
    {
      id: 'supervision-1',
      label: 'Supervision 1',
      colorName: 'supervision-1',
      lightColors: {
        main: '#1cf9b0',
        container: '#dafff0',
        onContainer: '#004d3d',
      },
    },
    {
      id: 'supervision-2',
      label: 'Supervision 2',
      colorName: 'supervision-2',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
    }
  ]

  const calendarApp = useNextCalendarApp({
    callbacks: {
      onDoubleClickDateTime: (dateTime: string) => {
        interactiveEventModalPlugin.clickToCreate(dateTime, { calendarId: 'clients' })
      },

      onDoubleClickDate: (date: string) => {
        interactiveEventModalPlugin.clickToCreate(date, { calendarId: 'clients' })
      }
    },
    locale: 'en-US',
    views: [resourceView],
    selectedDate: '2024-05-06',
    events: [
      {
        id: 1,
        title: 'Tom',
        start: '2024-05-06 02:00',
        end: '2024-05-06 07:55',
        resourceId: 'conveyor-belt-b',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 2,
        title: 'Deepak',
        start: '2024-05-06 02:00',
        end: '2024-05-06 07:55',
        resourceId: 'conveyor-belt-b',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 3,
        title: 'Tim',
        start: '2024-05-06 00:00',
        end: '2024-05-06 03:00',
        resourceId: 'welding',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 4,
        title: 'Zhao',
        start: '2024-05-06 01:30',
        end: '2024-05-06 03:30',
        resourceId: 'cnc',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 5,
        title: 'Ted',
        start: '2024-05-06 00:00',
        end: '2024-05-06 08:00',
        resourceId: 'supervision-1',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 6,
        title: 'Chen',
        start: '2024-05-06 06:00',
        end: '2024-05-06 09:00',
        resourceId: 'welding',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 7,
        title: 'Jane',
        start: '2024-05-06 07:30',
        end: '2024-05-06 09:30',
        resourceId: 'cnc',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 8,
        title: 'Marsha',
        start: '2024-05-06 08:00',
        end: '2024-05-06 14:00',
        resourceId: 'conveyor-belt-a',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 0,
        title: 'Jane',
        start: '2024-05-06 08:00',
        end: '2024-05-06 14:00',
        resourceId: 'conveyor-belt-a',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 9,
        title: 'Huang',
        start: '2024-05-06 08:00',
        end: '2024-05-06 13:55',
        resourceId: 'conveyor-belt-b',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
      {
        id: 10,
        title: 'Freddy',
        start: '2024-05-06 08:00',
        end: '2024-05-06 13:55',
        resourceId: 'conveyor-belt-b',
        rrule: 'FREQ=DAILY;UNTIL=20240510T235959'
      },
    ],
    calendars: calendars,
    plugins: [
      eventsService,
      interactiveEventModalPlugin,
      createEventRecurrencePlugin(),
      createDragToCreatePlugin(),
    ],
  })

  return <>
    <ScheduleXCalendar calendarApp={calendarApp} />
  </>
}
