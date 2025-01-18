import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import ResourceCalendar from '../partials/premium-calendar/resource-calendar'
import headingWithIconStyles from '../partials/heading-with-icon/heading-with-icon.module.scss'
import ResourceCalendarWithCustomLabels from '../partials/premium-calendar/resource-calendar-with-custom-labels'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import { createViewDay, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createDrawPlugin } from '@sx-premium/draw'

export default function CalendarDemoPage() {
  const calendarApp = useNextCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
      createViewDay(),
    ],
    plugins: [
      createDrawPlugin({}),
    ]
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  )
}
