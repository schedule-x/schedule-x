import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const el = document.getElementById('app')
const datePicker = createDatePicker(el as HTMLElement, {
  selectedDate: '2020-01-01',
})
datePicker.bootstrap()
