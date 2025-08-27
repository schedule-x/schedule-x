import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'
import 'temporal-polyfill/global'

const datePicker = createDatePicker({
  selectedDate: Temporal.PlainDate.from('2020-01-01'),
})
datePicker.render(document.getElementById('app') as HTMLElement)
