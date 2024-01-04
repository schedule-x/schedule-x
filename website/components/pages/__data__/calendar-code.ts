export const calendarDemoCode = `import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'

const calendar = createCalendar({
  views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
  datePicker: {
    selectedDate: '2023-12-01'
  },
  defaultView: viewWeek.name,
  events: [
    {
      id: 1,
      title: 'Coffee with John',
      start: '2023-12-01',
      end: '2023-12-01',
    },
    {
      id: 2,
      title: 'Breakfast with Sam',
      description: 'Discuss the new project',
      location: 'Starbucks',
      start: '2023-11-29 05:00',
      end: '2023-11-29 06:00',
    },
    {
      id: 3,
      title: 'Gym',
      start: '2023-11-27 06:00',
      end: '2023-11-27 07:00',
      calendarId: 'leisure'
    },
    {
      id: 4,
      title: 'Media fasting',
      start: '2023-12-01',
      end: '2023-12-03',
      calendarId: 'leisure'
    },
    {
      id: 5,
      title: 'Some appointment',
      people: ['John'],
      start: '2023-12-03 03:00',
      end: '2023-12-03 04:30',
    },
    {
      id: 6,
      title: 'Other appointment',
      people: ['Susan', 'Mike'],
      start: '2023-12-03 03:00',
      end: '2023-12-03 04:00',
      calendarId: 'leisure',
    },
  ],
  calendars: {
    leisure: {
      colorName: 'leisure',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
      darkColors: {
        main: '#c0dfff',
        onContainer: '#dee6ff',
        container: '#426aa2',
      },
    },
  },
  plugins: [createDragAndDropPlugin(), createEventModalPlugin()]
})

const calendarEl = document.getElementById('calendar') as HTMLElement

calendar.render(calendarEl)`
