// import { createDatePicker } from '@schedule-x/date-picker'
// import '@schedule-x/theme-default/dist/date-picker.css'

import { createDatePicker } from '@schedule-x/date-picker/src'
import '../../../packages/theme-default/src/date-picker.scss'

const datePickerTopLeft = document.querySelector('.date-picker-top-left')
const datePickerTopRight = document.querySelector('.date-picker-top-right')
const datePickerBottomLeft = document.querySelector('.date-picker-bottom-left')
const datePickerBottomRight = document.querySelector(
  '.date-picker-bottom-right'
)

createDatePicker({
  placement: 'bottom-start',
}).render(datePickerTopLeft as HTMLElement)

createDatePicker({
  placement: 'bottom-end',
}).render(datePickerTopRight as HTMLElement)

createDatePicker({
  placement: 'top-start',
}).render(datePickerBottomLeft as HTMLElement)

createDatePicker({
  placement: 'top-end',
  teleportTo: document.body,
}).render(datePickerBottomRight as HTMLElement)
