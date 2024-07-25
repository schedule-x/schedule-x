import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import '../app.css'
import '../../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '@schedule-x/date-picker/src'

const datePicker = createDatePicker({
  teleportTo: document.body,
  locale: 'de-DE',
  // disabled: true,
  // locale: 'fr-FR',
  style: {
    fullWidth: true,
    // dark: true,
  },
  // locale: 'sv-SE',
  firstDayOfWeek: 0,
  selectedDate: '',
  // selectedDate: '1991-07-13',
  // placement: 'top-end',
  // min: '2021-03-01',
  // max: '2021-03-31',
  // listeners: {
  //   onChange: (value) => {
  //     console.log('onChange', value)
  //   },
  // },
})
datePicker.render(document.querySelector('#app') as HTMLElement)

// set a listener to theme-toggle element, when clicked, set an is-dark class on the body
// or remove it if it already exists
const themeToggle = document.querySelector('#theme-toggle') as HTMLElement
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('is-dark')
})

const disabledToggle = document.querySelector('#disabled-toggle') as HTMLElement
disabledToggle.addEventListener('click', () => {
  datePicker.disabled = !datePicker.disabled
})
