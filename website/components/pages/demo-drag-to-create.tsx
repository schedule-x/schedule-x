import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import DragToCreateCalendar from '../partials/premium-calendar/drag-to-create-calendar'

export default function DragToCreateDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Premium modal and sidebar'} />

      <DragToCreateCalendar />
    </div>
  )
}
