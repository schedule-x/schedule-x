import { createDatePicker } from '../../../packages/date-picker/src'
import '../../../packages/theme-default/src/date-picker.scss'

const el = document.getElementById('app')
const datePicker = createDatePicker(
  el as HTMLElement,
  {
    selectedDate: '2022-08-09',
  },
)
datePicker.bootstrap()
