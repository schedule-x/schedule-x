/* eslint-disable max-lines */
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { calendars } from './data/calendars';
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createInteractiveEventModal } from "@sx-premium/interactive-event-modal";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import {createHourlyView, createConfig} from "@sx-premium/resource-scheduler";
import {createEventRecurrencePlugin} from "@schedule-x/event-recurrence";

export default function ResourceCalendarWithCustomLabels() {
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

  const rConfig = createConfig();
  const hourlyView = createHourlyView(rConfig);

  rConfig.resourceHeight.value = 100

  rConfig.resources.value = [
    {
      id: 'trevor',
      labelHTML: `<div style="display: flex; align-items: center; gap: 20px; font-size: 20px; margin: 0 auto;"><img style="width: 60px; height: 60px; border-radius: 100%; object-fit: cover" src="https://d19hgxvhjb2new.cloudfront.net/website/trevor_resource_view.jpg" alt="image of man">Trevor</div>`,
    },
    {
      id: 'sheila',
      labelHTML: `<div style="display: flex; align-items: center; gap: 20px; font-size: 20px; margin: 0 auto;"><img style="width: 60px; height: 60px; border-radius: 100%; object-fit: cover" src="https://d19hgxvhjb2new.cloudfront.net/website/sheila_resource_view.jpg" alt="image of man">Sheila</div>`,
      colorName: 'sheila',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
    },
    {
      id: 'robert',
      labelHTML: `<div style="display: flex; align-items: center; gap: 20px; font-size: 20px; margin: 0 auto;"><img style="width: 60px; height: 60px; border-radius: 100%; object-fit: cover" src="https://d19hgxvhjb2new.cloudfront.net/website/robert_resource_view.jpg" alt="image of man">Robert</div>`,
      colorName: 'robert',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
    },
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
    views: [hourlyView],
    selectedDate: '2024-05-06',
    events: [
      {
        id: 3,
        title: 'DB migration',
        start: '2024-05-06 00:00',
        end: '2024-05-06 03:00',
        resourceId: 'robert',
      },
      {
        id: 6,
        title: 'DB migration follow-up',
        start: '2024-05-06 06:00',
        end: '2024-05-06 09:00',
        resourceId: 'robert',
      },
      {
        id: 8,
        title: 'Manual testing',
        start: '2024-05-06 08:00',
        end: '2024-05-06 14:00',
        resourceId: 'trevor',
      },
      {
        id: 9,
        title: 'Customer support',
        start: '2024-05-06 08:00',
        end: '2024-05-06 13:55',
        resourceId: 'sheila',
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
