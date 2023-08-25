import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

import '../index.module.css';

export default function DatePicker(): JSX.Element {
  const [datePicker, setDatePicker] = React.useState(null)

  useEffect(() => {
    const datePickerElement = document.getElementById('date-picker')
    setDatePicker(
      createDatePicker(datePickerElement)
    )
  }, [])

  useEffect(() => {
    datePicker?.bootstrap()
  }, [datePicker])

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main style={{ display: 'flex', marginTop: '200px', justifyContent: 'center', flex: 1 }}>
        <div id="date-picker" />
      </main>
    </Layout>
  );
}
