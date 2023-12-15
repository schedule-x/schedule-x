import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const el = document.getElementById('app') as HTMLElement
const datePicker = createDatePicker({
  selectedDate: '1999-03-16',
})
datePicker.render(el)
