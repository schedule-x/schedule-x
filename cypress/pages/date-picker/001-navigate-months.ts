import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const datePicker = createDatePicker({
  selectedDate: '2020-01-01',
})
datePicker.render(document.getElementById('app') as HTMLElement)
