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
            title: 'Market research',
            duration: 3,
            progress: 100,
            colorName: 'cyan',
          },
          {
            id: 'requirements',
            parentId: 'launch',
            title: 'Define requirements',
            duration: 3,
            progress: 100,
            dependencies: [{ taskId: 'research' }],
            colorName: 'cyan',
          },
          {
            id: 'content-audit',
            parentId: 'launch',
            title: 'Content audit',
            duration: 2,
            progress: 100,
            dependencies: [{ taskId: 'research' }],
            colorName: 'yellow',
          },
          {
            id: 'ux-architecture',
            parentId: 'launch',
            title: 'UX architecture',
            duration: 4,
            progress: 80,
            dependencies: [{ taskId: 'requirements' }],
            colorName: 'purple',
          },
          {
            id: 'visual-design',
            parentId: 'launch',
            title: 'Visual design',
            duration: 5,
            progress: 65,
            dependencies: [{ taskId: 'ux-architecture' }],
            colorName: 'purple',
          },
          {
            id: 'prototype',
            parentId: 'launch',
            title: 'Interactive prototype',
            duration: 3,
            progress: 40,
            dependencies: [{ taskId: 'visual-design' }],
            colorName: 'pink',
          },
          {
            id: 'content-production',
            parentId: 'launch',
            title: 'Content production',
            duration: 6,
            progress: 50,
            dependencies: [{ taskId: 'content-audit' }],
            colorName: 'yellow',
          },
          {
            id: 'frontend',
            parentId: 'launch',
            title: 'Frontend development',
            duration: 8,
            progress: 25,
            dependencies: [{ taskId: 'prototype' }],
            colorName: 'pink',
          },
          {
            id: 'cms-integration',
            parentId: 'launch',
            title: 'CMS integration',
            duration: 4,
            progress: 10,
            dependencies: [
              { taskId: 'frontend' },
              { taskId: 'content-production' },
            ],
            colorName: 'blue',
          },
          {
            id: 'analytics',
            parentId: 'launch',
            title: 'Analytics setup',
            duration: 2,
            dependencies: [{ taskId: 'frontend' }],
            colorName: 'green',
          },
          {
            id: 'accessibility',
            parentId: 'launch',
            title: 'Accessibility review',
            duration: 3,
            dependencies: [{ taskId: 'frontend' }],
            colorName: 'green',
          },
          {
            id: 'qa',
            parentId: 'launch',
            title: 'Cross-browser QA',
            duration: 4,
            dependencies: [
              { taskId: 'cms-integration' },
              { taskId: 'analytics' },
              { taskId: 'accessibility' },
            ],
            colorName: 'orange',
          },
          {
            id: 'stakeholder-review',
            parentId: 'launch',
            title: 'Stakeholder review',
            duration: 2,
            dependencies: [{ taskId: 'qa' }],
            colorName: 'orange',
          },
          {
            id: 'launch-prep',
            parentId: 'launch',
            title: 'Launch preparation',
            duration: 2,
            dependencies: [{ taskId: 'stakeholder-review' }],
            colorName: 'red',
          },
          {
            id: 'release',
            parentId: 'launch',
            title: 'Release',
            kind: 'milestone',
            dependencies: [{ taskId: 'launch-prep' }],
            colorName: 'red',
          },
          {
            id: 'monitoring',
            parentId: 'launch',
            title: 'Post-launch monitoring',
            duration: 3,
            dependencies: [{ taskId: 'release' }],
            colorName: 'green',
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
