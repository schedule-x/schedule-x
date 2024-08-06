import { createTimePicker } from '../../../packages/time-picker'
// import '../../../packages/theme-default/src/time-picker.scss'
import '@schedule-x/theme-default/dist/time-picker.css'

const timePickerTopLeft = document.querySelector('.time-picker-top-left')
const timePickerTopRight = document.querySelector('.time-picker-top-right')
const timePickerBottomLeft = document.querySelector('.time-picker-bottom-left')
const timePickerBottomRight = document.querySelector(
  '.time-picker-bottom-right'
)
const timePickerInModal = document.querySelector('.time-picker-in-modal')

createTimePicker({
  placement: 'bottom-start',
}).render(timePickerTopLeft as HTMLElement)

createTimePicker({
  placement: 'bottom-end',
}).render(timePickerTopRight as HTMLElement)

createTimePicker({
  placement: 'top-start',
}).render(timePickerBottomLeft as HTMLElement)

createTimePicker({
  placement: 'top-end',
}).render(timePickerBottomRight as HTMLElement)

createTimePicker({
  placement: 'bottom-start',
  teleportTo: document.body,
}).render(timePickerInModal as HTMLElement)
