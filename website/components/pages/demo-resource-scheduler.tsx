import '@schedule-x/theme-default/dist/index.css'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubLightInit } from '@uiw/codemirror-theme-github'
import { calendarDemoCode } from './__data__/calendar-code'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import ResourceCalendar from '../partials/premium-calendar/resource-calendar'

export default function CalendarDemoPage() {
  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Resource scheduler demo'} />

      <ResourceCalendar />

      <h2 className={styles.demoSubheading}>Code</h2>

      <p className={styles.calendarDemoText}>
        The demo above is based on the code below.
      </p>

      <CodeMirror
        className={styles.calendarDemoCode}
        value={calendarDemoCode}
        height="800px"
        extensions={[javascript({ jsx: true })]}
        onChange={() => null}
        theme={githubLightInit()}
      />
    </div>
  )
}
