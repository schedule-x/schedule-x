import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import './app.css'
import '../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '../packages/date-picker/src'

const datePicker = createDatePicker(
  {
    locale: 'de-DE',
    firstDayOfWeek: 0,
    // placement: 'top-start',
    // min: '2021-03-01',
    // max: '2021-03-31',
  },
  document.querySelector('.date-picker') as HTMLElement
)
datePicker.bootstrap()
