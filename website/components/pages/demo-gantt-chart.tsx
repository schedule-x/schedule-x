'use client'

import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import GanttCalendar from '../partials/premium-calendar/gantt-calendar'
import styles from './demo.module.scss'

export default function GanttChartDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'📊'} text={'Gantt chart demo'} />

      <GanttCalendar />
    </div>
  )
}
