import './index.css'
import './app.css'
import '../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '../packages/date-picker/src'

const datePicker = createDatePicker(
  {
    locale: 'en-US',
    firstDayOfWeek: 0,
  },
  document.querySelector('#app') as HTMLElement
)
datePicker.bootstrap()
