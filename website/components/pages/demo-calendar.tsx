'use client'

import {
  CalendarApp,
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubDarkInit, githubLightInit } from '@uiw/codemirror-theme-github'
import { calendarDemoCode } from './__data__/calendar-code'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import { useTheme } from 'nextra-theme-docs'
import 'temporal-polyfill/global'

export default function CalendarDemoPage() {
  const { resolvedTheme } = useTheme()

  const [cal, setCal] = useState<CalendarApp|null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calendarEl = document.getElementById('calendar') as HTMLElement

    const calendar = createCalendar({
      views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
      selectedDate: Temporal.PlainDate.from('2023-12-01'),
      isDark: resolvedTheme === 'dark',
      defaultView: viewWeek.name,
      timezone: 'America/New_York',
      events: [
        {
          id: 1,
          title: 'Coffee with John',
          start: Temporal.PlainDate.from('2023-12-01'),
          end: Temporal.PlainDate.from('2023-12-01'),
        },
        {
          id: 2,
          title: 'Breakfast with Sam',
          description: 'Discuss the new project',
          location: 'Starbucks',
          start: Temporal.ZonedDateTime.from('2023-11-29T05:00:00+00:00[America/New_York]'),
          end: Temporal.ZonedDateTime.from('2023-11-29T06:00:00+00:00[America/New_York]'),
        },
        {
          id: 3,
          title: 'Gym',
          start: Temporal.ZonedDateTime.from('2023-11-27T06:00:00+00:00[America/New_York]'),
          end: Temporal.ZonedDateTime.from('2023-11-27T07:00:00+00:00[America/New_York]'),
          calendarId: 'leisure',
        },
        {
          id: 4,
          title: 'Media fasting',
          start: Temporal.PlainDate.from('2023-12-01'),
          end: Temporal.PlainDate.from('2023-12-03'),
          calendarId: 'leisure',
        },
        {
          id: 5,
          title: 'Some appointment',
          people: ['John'],
          start: Temporal.ZonedDateTime.from('2023-12-03T03:00:00+00:00[America/New_York]'),
          end: Temporal.ZonedDateTime.from('2023-12-03T04:30:00+00:00[America/New_York]'),
        },
        {
          id: 6,
          title: 'Other appointment',
          people: ['Susan', 'Mike'],
          start: Temporal.ZonedDateTime.from('2023-12-03T03:00:00+00:00[America/New_York]'),
          end: Temporal.ZonedDateTime.from('2023-12-03T04:30:00+00:00[America/New_York]'),
          calendarId: 'leisure',
        },
      ],
      calendars: {
        leisure: {
          colorName: 'leisure',
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
      plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
    })
    calendar.render(calendarEl)
    setCal(calendar)
  }, [])

  useEffect(() => {
    if (!cal) return

    cal.setTheme(resolvedTheme === 'dark' ? 'dark' : 'light')
  }, [resolvedTheme])

  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Calendar demo'} />

      <div id="calendar" className="calendar-wrapper" />

      <h2 className={styles.demoSubheading}>Code</h2>

      <p className={styles.calendarDemoText}>
        The demo above is based on the code below.
      </p>

      <CodeMirror
        className={styles.calendarDemoCode}
        value={calendarDemoCode}
        height="800px"
        extensions={[javascript({ jsx: true })]}
        onChange={() => null}
        theme={resolvedTheme === 'dark' ? githubDarkInit() : githubLightInit()}
      />
    </div>
  )
}
