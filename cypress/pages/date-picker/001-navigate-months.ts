import { createDatePicker } from '@schedule-x/date-picker'
import '../../../packages/theme-default/src/date-picker.scss'

const el = document.getElementById('app')
const datePicker = createDatePicker(el as HTMLElement, {
  selectedDate: '2020-01-01',
})
datePicker.bootstrap()
