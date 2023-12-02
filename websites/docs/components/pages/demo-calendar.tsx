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

const checkIfDark = () => {
  if (typeof window === 'undefined') return false

  const htmlEl = document.getElementsByTagName('html')[0]
  return htmlEl.classList.contains('dark')
}

export default function CalendarDemoPage() {
  const [isDark, setIsDark] = useState(checkIfDark())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const htmlEl = document.getElementsByTagName('html')[0]
    const observer = new MutationObserver(() => {
      setIsDark(checkIfDark())
    })
    observer.observe(htmlEl, { attributes: true })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calendarEl = document.getElementById('calendar') as HTMLElement
    if (!calendarEl) return

    const calendar = createCalendar(calendarEl, {
      views: [viewMonthGrid, viewWeek, viewDay, viewMonthAgenda],
      datePicker: {
        selectedDate: '2023-12-01',
      },
      isDark,
      defaultView: viewWeek.name,
      events: [
        {
          id: 1,
          title: 'Coffee with John',
          time: {
            start: '2023-12-01',
            end: '2023-12-01',
          },
        },
        {
          id: 2,
          title: 'Breakfast with Sam',
          description: 'Discuss the new project',
          location: 'Starbucks',
          time: {
            start: '2023-11-29 05:00',
            end: '2023-11-29 06:00',
          },
        },
        {
          id: 3,
          title: 'Gym',
          time: {
            start: '2023-11-27 06:00',
            end: '2023-11-27 07:00',
          },
          calendarId: 'leisure',
        },
        {
          id: 4,
          title: 'Media fasting',
          time: {
            start: '2023-12-01',
            end: '2023-12-03',
          },
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
    calendar.bootstrap()
  }, [isDark])

  return (
    <div className={'page-wrapper calendar-demo'}>
      <HeadingWithIcon icon={'🗓️'} text={'Calendar demo'} />

      <div id="calendar" className="calendar-wrapper" />

      <h2>Code</h2>

      <p className="calendar-demo-text">
        The demo above is based on the code below.
      </p>

      <CodeMirror
        className={'calendar-demo-code'}
        value={calendarDemoCode}
        height="800px"
        extensions={[javascript({ jsx: true })]}
        onChange={() => null}
        theme={isDark ? githubDarkInit() : githubLightInit()}
      />
    </div>
  )
}
