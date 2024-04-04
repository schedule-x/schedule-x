import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const datePickerTopLeft = document.querySelector('.date-picker-top-left')
const datePickerTopRight = document.querySelector('.date-picker-top-right')
const datePickerBottomLeft = document.querySelector('.date-picker-bottom-left')
const datePickerBottomRight = document.querySelector('.date-picker-bottom-right')
const datePickerInModal = document.querySelector(
  '.date-picker-in-modal'
)

createDatePicker({
  placement: 'bottom-start',
  selectedDate: '2020-01-01'
}).render(datePickerTopLeft as HTMLElement)

createDatePicker({
  placement: 'bottom-end',
  selectedDate: '2020-01-01'
}).render(datePickerTopRight as HTMLElement)

createDatePicker({
  placement: 'top-start',
  selectedDate: '2020-01-01'
}).render(datePickerBottomLeft as HTMLElement)

createDatePicker({
  placement: 'top-end',
  selectedDate: '2020-01-01'
}).render(datePickerBottomRight as HTMLElement)

createDatePicker({
  placement: 'bottom-start',
  selectedDate: '2020-01-01',
  teleportTo: document.body,
}).render(datePickerInModal as HTMLElement)
