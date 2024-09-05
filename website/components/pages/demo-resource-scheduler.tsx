import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import ResourceCalendar from '../partials/premium-calendar/resource-calendar'

export default function CalendarDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Resource scheduler demo'} />

      <ResourceCalendar />
    </div>
  )
}
