import {
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

export default function CalendarDemoPage() {
  const { resolvedTheme } = useTheme()

  const [cal, setCal] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calendarEl = document.getElementById('calendar') as HTMLElement

    const calendar = createCalendar({
      views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
      datePicker: {
        selectedDate: '2023-12-01',
      },
      isDark: resolvedTheme === 'dark',
      defaultView: viewWeek.name,
      events: [
        {
          id: 1,
          title: 'Coffee with John',
          start: '2023-12-01',
          end: '2023-12-01',
        },
        {
          id: 2,
          title: 'Breakfast with Sam',
          description: 'Discuss the new project',
          location: 'Starbucks',
          start: '2023-11-29 05:00',
          end: '2023-11-29 06:00',
        },
        {
          id: 3,
          title: 'Gym',
          start: '2023-11-27 06:00',
          end: '2023-11-27 07:00',
          calendarId: 'leisure',
        },
        {
          id: 4,
          title: 'Media fasting',
          start: '2023-12-01',
          end: '2023-12-03',
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
    setCal(calendar as any)
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
