import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import './app.css'
import '../packages/theme-default/src/date-picker.scss'
import { createDatePicker } from '../packages/date-picker/src'

const datePicker = createDatePicker({
  locale: 'de-DE',
  style: {
    fullWidth: true,
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

// document.addEventListener('dblclick', () => {
//   console.log(datePicker.value)
// })
//
// const changeValueBtn = document.querySelector('#change-value-btn') as HTMLElement
// changeValueBtn.addEventListener('click', () => {
//   datePicker.value = '2021-03-15'
// })

// set a listener to theme-toggle element, when clicked, set an is-dark class on the body
// or remove it if it already exists
const themeToggle = document.querySelector('#theme-toggle') as HTMLElement
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('is-dark')
})
