import './index.css'
import './app.css'
import '../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '../packages/date-picker/src'

const datePicker = createDatePicker({}, document.querySelector('#app')!)
datePicker.bootstrap()
