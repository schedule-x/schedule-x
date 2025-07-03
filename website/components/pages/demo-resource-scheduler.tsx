'use client'

import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import ResourceCalendar from '../partials/premium-calendar/resource-calendar'
import headingWithIconStyles from '../partials/heading-with-icon/heading-with-icon.module.scss'
import ResourceCalendarWithCustomLabels from '../partials/premium-calendar/resource-calendar-with-custom-labels'

export default function CalendarDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Resource scheduler demo'}/>

      <ResourceCalendar/>

      <h2 className={headingWithIconStyles.headingWithIcon}>
        <span className={headingWithIconStyles.calendarIcon}>🏷️️</span>
        With custom resource labels
      </h2>

      <ResourceCalendarWithCustomLabels />
    </div>
  )
}
