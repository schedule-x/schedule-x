import { createTimePicker } from '../../../packages/time-picker'
// import '../../../packages/theme-default/src/time-picker.scss'
import '@schedule-x/theme-default/dist/time-picker.css'
import { translate, translations } from '@schedule-x/translations'
import { signal } from '@preact/signals'


const timePickerTopLeft = document.querySelector('.time-picker-top-left')
const timePickerTopRight = document.querySelector('.time-picker-top-right')
const timePickerBottomLeft = document.querySelector('.time-picker-bottom-left')
const timePickerBottomRight = document.querySelector('.time-picker-bottom-right')
const timePickerInModal = document.querySelector(
  '.time-picker-in-modal'
)

createTimePicker({
  placement: 'bottom-start',
}, translate(signal('en-US'), signal(translations))).render(timePickerTopLeft as HTMLElement)

createTimePicker({
  placement: 'bottom-end',
}, translate(signal('en-US'), signal(translations))).render(timePickerTopRight as HTMLElement)

createTimePicker({
  placement: 'top-start',
}, translate(signal('en-US'), signal(translations))).render(timePickerBottomLeft as HTMLElement)

createTimePicker({
  placement: 'top-end',
}, translate(signal('en-US'), signal(translations))).render(timePickerBottomRight as HTMLElement)

createTimePicker({
  placement: 'bottom-start',
  teleportTo: document.body,
}, translate(signal('en-US'), signal(translations))).render(timePickerInModal as HTMLElement)
