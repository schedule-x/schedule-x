import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const datePickerTopLeft = document.querySelector('.date-picker-top-left')
const datePickerTopRight = document.querySelector('.date-picker-top-right')
const datePickerBottomLeft = document.querySelector('.date-picker-bottom-left')
const datePickerBottomRight = document.querySelector(
  '.date-picker-bottom-right'
)

createDatePicker(datePickerTopLeft as HTMLElement, {
  placement: 'bottom-start',
}).bootstrap()
createDatePicker(datePickerTopRight as HTMLElement, {
  placement: 'bottom-end',
}).bootstrap()
createDatePicker(datePickerBottomLeft as HTMLElement, {
  placement: 'top-start',
}).bootstrap()
createDatePicker(datePickerBottomRight as HTMLElement, {
  placement: 'top-end',
}).bootstrap()
