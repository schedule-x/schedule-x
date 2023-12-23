import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '../index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'

const calendarElement = document.getElementById('calendar') as HTMLElement

const calendar = createCalendar({
  datePicker: {
    selectedDate: '2023-09-21',
  },
  locale: 'en-US',
  views: [viewWeek, viewMonthGrid, viewMonthAgenda, viewDay],
  defaultView: 'week',
  plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
  events: [],
})

calendar.render(calendarElement)

const addEventButton = document.getElementById('add-event') as HTMLButtonElement
addEventButton.addEventListener('click', () => {
  console.log('add')
  calendar.events.add({
    id: 1,
    title: 'New event',
    start: '2023-09-21',
    end: '2023-09-21',
  })
})

const updateEventButton = document.getElementById(
  'update-event'
) as HTMLButtonElement
updateEventButton.addEventListener('click', () => {
  const event = calendar.events.get(1)
  if (event) {
    calendar.events.update({
      ...event,
      title: 'Updated event',
    })
  }
})

const removeEventButton = document.getElementById(
  'remove-event'
) as HTMLButtonElement
removeEventButton.addEventListener('click', () => {
  calendar.events.remove('1')
})
