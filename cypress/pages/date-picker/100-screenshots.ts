import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'
import 'temporal-polyfill/global'

const el = document.getElementById('app')
const datePicker = createDatePicker({
  selectedDate: Temporal.PlainDate.from('2022-08-09'),
})
datePicker.render(el as HTMLElement)
