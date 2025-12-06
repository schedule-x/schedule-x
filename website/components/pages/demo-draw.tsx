'use client'

import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import DrawCalendar from '../partials/premium-calendar/draw-calendar'

export default function DrawDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'✏️'} text={'Draw demo'} />

      <DrawCalendar />
    </div>
  )
}

