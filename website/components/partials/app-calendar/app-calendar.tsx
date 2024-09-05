import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { seededEvents } from './data/seeded-events'
import { useEffect } from 'react'
import { useTheme } from 'nextra-theme-docs'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { createResizePlugin } from '@schedule-x/resize'

const getTheme = (resolvedTheme: string) => resolvedTheme === 'dark' ? 'dark' : 'light'

export default function AppCalendar() {
  const { resolvedTheme } = useTheme()

  const calendarApp = useNextCalendarApp({
    views: [viewWeek, viewMonthAgenda, viewDay, viewMonthGrid],
    defaultView: viewWeek.name,
    events: seededEvents,
    plugins: [createDragAndDropPlugin(), createEventModalPlugin(), createResizePlugin()],
    selectedDate: '2024-01-13',
    isDark: getTheme(resolvedTheme) === 'dark',
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
    }
  })

  useEffect(() => {
    if (calendarApp) {
      calendarApp.setTheme(getTheme(resolvedTheme))
    }
  }, [resolvedTheme])

  return <>
    <ScheduleXCalendar calendarApp={calendarApp} />
  </>
}
