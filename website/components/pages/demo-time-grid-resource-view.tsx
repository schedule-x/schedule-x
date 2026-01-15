'use client'

import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import TimeGridResourceCalendar from '../partials/premium-calendar/time-grid-resource-calendar'

export default function TimeGridResourceViewDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Time Grid Resource View demo'}/>

      <TimeGridResourceCalendar/>
    </div>
  )
}

