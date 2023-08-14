import { createDatePicker } from '../../../packages/date-picker/src'
import '../../../packages/theme-default/src/date-picker.scss'

const datePickerTopLeft = document.querySelector('.date-picker-top-left')
const datePickerTopRight = document.querySelector('.date-picker-top-right')
const datePickerBottomLeft = document.querySelector('.date-picker-bottom-left')
const datePickerBottomRight = document.querySelector(
  '.date-picker-bottom-right'
)

createDatePicker(
  { placement: 'bottom-start' },
  datePickerTopLeft as HTMLElement
).bootstrap()
createDatePicker(
  { placement: 'bottom-end' },
  datePickerTopRight as HTMLElement
).bootstrap()
createDatePicker(
  { placement: 'top-start' },
  datePickerBottomLeft as HTMLElement
).bootstrap()
createDatePicker(
  { placement: 'top-end' },
  datePickerBottomRight as HTMLElement
).bootstrap()
