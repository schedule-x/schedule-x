'use client'

import { createCalendar } from '@schedule-x/calendar'
import { createGanttView } from '@sx-premium/gantt-chart'
import 'temporal-polyfill/global'
import { useEffect, useRef } from 'react'

export default function GanttCalendar() {
  const calendarElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!calendarElement.current) return

    const gantt = createGanttView({
      project: {
        start: Temporal.PlainDate.from('2026-09-07'),
        tasks: [
          { id: 'launch', title: 'Website launch', kind: 'summary' },
          {
            id: 'research',
            parentId: 'launch',
            title: 'Research',
            duration: 4,
            progress: 100,
            colorName: 'cyan',
          },
          {
            id: 'design',
            parentId: 'launch',
            title: 'Design',
            duration: 5,
            progress: 70,
            dependencies: [{ taskId: 'research' }],
            colorName: 'purple',
          },
          {
            id: 'implementation',
            parentId: 'launch',
            title: 'Implementation',
            duration: 8,
            progress: 25,
            dependencies: [{ taskId: 'design' }],
            colorName: 'pink',
          },
          {
            id: 'qa',
            parentId: 'launch',
            title: 'Quality assurance',
            duration: 4,
            dependencies: [{ taskId: 'implementation' }],
          },
          {
            id: 'release',
            parentId: 'launch',
            title: 'Release',
            kind: 'milestone',
            dependencies: [{ taskId: 'qa' }],
          },
        ],
      },
    })
    const calendar = createCalendar({
      defaultView: gantt.name,
      locale: 'en-US',
      selectedDate: Temporal.PlainDate.from('2026-09-14'),
      timezone: 'UTC',
      views: [gantt],
    })

    calendar.render(calendarElement.current)

    return () => calendar.destroy()
  }, [])

  return <div className="appCalendarWrapper" ref={calendarElement} />
}
