export const datePickerCode = `import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/index.css'

const datePickerEl = document.getElementById('date-picker') as HTMLElement
const datePicker = createDatePicker({
  listeners: {
    onChange: (date) => {
      console.log('date changed', date)
    }
  },
})
datePicker.render(datePickerEl)`
