'use client'

import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubDarkInit, githubLightInit } from '@uiw/codemirror-theme-github'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import { datePickerCode } from './__data__/date-picker-code'

const checkIfDark = () => {
  if (typeof window === 'undefined') return false

  const htmlEl = document.getElementsByTagName('html')[0]
  return htmlEl.classList.contains('dark')
}

export default function DatePickerDemoPage() {
  const [isDark, setIsDark] = useState(checkIfDark())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const htmlEl = document.getElementsByTagName('html')[0]
    const observer = new MutationObserver(() => {
      setIsDark(checkIfDark())
    })
    observer.observe(htmlEl, { attributes: true })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsDark(checkIfDark())

    const datePickerEl = document.getElementById('date-picker') as HTMLElement
    const datePicker = createDatePicker({
      listeners: {
        onChange: (date) => {
          console.log('date changed', date)
        },
      },
    })
    datePicker.render(datePickerEl)
  }, [])

  return (
    <div
      className={[
        'page-wrapper date-picker-demo',
        isDark ? 'is-dark' : '',
        styles.demoPageWrapper,
      ].join(' ')}
    >
      <HeadingWithIcon icon={'📅'} text={'Date picker demo'} />

      <div id="date-picker" className="date-picker-wrapper" />

      <h2 className={styles.demoSubheading}>Code</h2>

      <p className={styles.calendarDemoText}>
        The demo above is based on the code below.
      </p>

      <CodeMirror
        className={'date-picker-demo-code'}
        value={datePickerCode}
        height="300px"
        extensions={[javascript({ jsx: true })]}
        onChange={() => null}
        theme={isDark ? githubDarkInit() : githubLightInit()}
      />
    </div>
  )
}
