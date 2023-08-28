import React, { useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'
import { useColorMode } from '@docusaurus/theme-common'
import styles from './date-picker.module.css'

import '../index.module.css'

function DatePickerComponent(): JSX.Element {
  const [datePicker, setDatePicker] = React.useState(null)
  const { colorMode } = useColorMode();

  useEffect(() => {
    const datePickerElement = document.getElementById('date-picker')
    setDatePicker(createDatePicker(datePickerElement, {
      style: {
        dark: colorMode === 'dark',
        fullWidth: true,
      }
    }))
  }, [colorMode])

  useEffect(() => {
    datePicker?.bootstrap()
  }, [datePicker])


  return (
    <div id="date-picker" className={styles.datePicker}/>
  )
}

export default function DatePicker(): JSX.Element {

  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className={styles.mainWrapper}>
        <DatePickerComponent />
      </main>
    </Layout>
  )
}
