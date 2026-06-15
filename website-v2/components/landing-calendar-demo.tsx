'use client'

import {
  viewDay,
  viewList,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import 'temporal-polyfill/global'
import { seededEvents } from './landing-calendar-demo/data/seeded-events'

const landingFullDayEvents = [
  {
    id: 'landing-all-day-launch-freeze',
    title: 'Launch freeze',
    start: '2025-08-04',
    end: '2025-08-04',
    calendarId: 'work',
    isEditable: true,
  },
  {
    id: 'landing-all-day-team-offsite',
    title: 'Team offsite',
    start: '2025-08-05',
    end: '2025-08-06',
    calendarId: 'leisure',
    isEditable: true,
  },
  {
    id: 'landing-all-day-provider-rollout',
    title: 'Provider sync rollout',
    start: '2025-08-08',
    end: '2025-08-10',
    calendarId: 'personal',
    isEditable: true,
  },
]

export default function LandingCalendarDemo() {
  const calendarApp = useNextCalendarApp({
    views: [viewWeek, viewMonthAgenda, viewDay, viewMonthGrid, viewList],
    defaultView: viewWeek.name,
    timezone: 'America/New_York',
    selectedDate: Temporal.PlainDate.from('2025-08-08'),
    events: [...landingFullDayEvents, ...seededEvents].map((event) => ({
      ...event,
      start: /^\d{4}-\d{2}-\d{2}$/.test(event.start)
        ? Temporal.PlainDate.from(event.start)
        : Temporal.ZonedDateTime.from(event.start),
      end: /^\d{4}-\d{2}-\d{2}$/.test(event.end)
        ? Temporal.PlainDate.from(event.end)
        : Temporal.ZonedDateTime.from(event.end),
    })),
    plugins: [createEventModalPlugin()],
    calendars: {
      personal: {
        colorName: 'personal',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800',
        },
        darkColors: {
          main: '#fff5c0',
          onContainer: '#fff5de',
          container: '#a29742',
        },
      },
      work: {
        colorName: 'work',
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
      leisure: {
        colorName: 'leisure',
        lightColors: {
          main: '#1cf9b0',
          container: '#dafff0',
          onContainer: '#004d3d',
        },
        darkColors: {
          main: '#c0fff5',
          onContainer: '#e6fff5',
          container: '#42a297',
        },
      },
      school: {
        colorName: 'school',
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
    },
  })

  return (
    <div className="sx-live-calendar-wrapper">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  )
}
