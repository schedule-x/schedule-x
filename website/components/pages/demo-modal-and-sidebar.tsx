'use client'

import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import ModalCalendar from '../partials/premium-calendar/modal-calendar'

export default function CalendarDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Premium modal and sidebar'} />

      <ModalCalendar />
    </div>
  )
}
