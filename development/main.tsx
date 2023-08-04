import "@fontsource/open-sans"
import "@fontsource/roboto-condensed"
import './app.css'
import '../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '../packages/date-picker/src'

const datePicker = createDatePicker(
  {
    locale: 'en-US',
    firstDayOfWeek: 0,
    // min: '2021-03-01',
    // max: '2021-03-31',
  },
  document.querySelector('#app') as HTMLElement
)
datePicker.bootstrap()
