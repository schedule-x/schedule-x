/* eslint-disable max-lines */
import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import {useEffect, useState} from 'react'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { calendars } from './data/calendars'
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createSidebarPlugin } from "@sx-premium/sidebar";
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createInteractiveEventModal, rruleFields } from "@sx-premium/interactive-event-modal";
import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {createEventRecurrencePlugin} from "@schedule-x/event-recurrence";

export default function ModalCalendar() {
  const eventsService = createEventsServicePlugin()

  const interactiveEventModalPlugin = createInteractiveEventModal({
    eventsService,
    fields: {
      title: {
        validator: (value) => {
          return {
            message: 'Title is required',
            isValid: !!value
          }
        },
      },
      startTime: {},
      startDate: {},
      endDate: {},
      endTime: {},
      ...rruleFields(),
      people: {
        validator: (value) => {
          return {
            message: 'Choose at least one person',
            isValid: !!(value && value.length)
          }
        },
      },
      calendarId: {
        validator: (value) => {
          return {
            message: 'Choose a calendar',
            isValid: !!value
          }
        }
      }
    },
    availablePeople: [
      'Ted Mosby',
      'Robin Scherbatsky',
      'Barney Stinson',
      'Lily Aldrin',
      'Marshall Eriksen'
    ],
    onAddEvent: (event) => {
      console.log(event)
    },
    onDeleteEvent: (eventId) => {
      console.log(eventId)
    }
  });

  const calendarApp = useNextCalendarApp({
    callbacks: {
      onDoubleClickDateTime: (dateTime: string) => {
        interactiveEventModalPlugin.clickToCreate(dateTime, { calendarId: 'clients' })
      },

      onDoubleClickDate: (date: string) => {
        interactiveEventModalPlugin.clickToCreate(date, { calendarId: 'clients' })
      }
    },
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: '2024-05-06',
    defaultView: viewWeek.name,
    events: [
      {
        id: 1,
        title: 'Weekly event',
        start: '2024-05-11 10:00',
        end: '2024-05-11 12:00',
        calendarId: 'personal',
        people: ['Ted Mosby', 'Barney Stinson'],
        rrule: 'FREQ=WEEKLY;UNTIL=20240701T235959'
      },
      {
        id: 2,
        title: 'Event 2',
        start: '2024-05-11 14:00',
        end: '2024-05-11 16:00',
        calendarId: 'personal',
      },
      {
        id: 3,
        title: 'Event 3',
        start: '2024-05-11 08:00',
        end: '2024-05-11 09:00',
        calendarId: 'team',
      },
      {
        id: 4,
        title: 'Event 4',
        start: '2024-05-11 10:00',
        end: '2024-05-11 11:00',
        calendarId: 'team',
      },
      {
        id: 5,
        title: 'Event 5',
        start: '2024-05-06 07:00',
        end: '2024-05-06 09:10',
        calendarId: 'clients',
      },
      {
        id: 6,
        title: 'Event 6',
        start: '2024-05-07',
        end: '2024-05-07',
        calendarId: 'clients',
      }
    ],
    calendars: calendars,
    plugins: [
      createDragAndDropPlugin(),
      createScrollControllerPlugin({ initialScroll: '05:50' }),
      eventsService,
      interactiveEventModalPlugin,
      createDragToCreatePlugin(),
      createEventRecurrencePlugin(),
      createSidebarPlugin({
        eventsService,
        openOnRender: typeof window === 'object' && window.innerWidth > 768,
        activeCalendarIds: ['personal', 'clients', 'team'],
        placeholderEvents: [
          {
            title: 'Morning brief',
            calendarId: 'team',
            people: ['John Doe', 'Jane Doe', 'Steve Smith'],
          },
          {
            title: 'Client demo',
            calendarId: 'clients',
            people: ['John Doe', 'Jane Doe'],
          },
          {
            title: 'Team meeting',
            calendarId: 'clients',
            people: ['John Doe', 'Jane Doe', 'Steve Smith'],
          }
        ]
      })
    ],
  })

  const [tipClasses, setTipClasses] = useState(['calendar-tip'])
  const [tipWasShown, setTipWasShown] = useState(false)

  const createTipWhenHoveringCalendar = (calendarEl: Element) => {
    calendarEl?.addEventListener('mouseenter', () => {
      if (tipWasShown) return

      setTimeout(() => {
        setTipClasses([...tipClasses, 'is-open'])
        setTipWasShown(true)

        setTimeout(() => {
          setTipClasses(tipClasses.filter(c => c !== 'is-open'))
        }, 7500)
      }, 1000)
    }, { once: true })
  }

  useEffect(() => {
    let calendarEl = document.querySelector('.sx__calendar');

    if (!calendarEl) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            calendarEl = document.querySelector('.sx__calendar');
            if (calendarEl) {
              createTipWhenHoveringCalendar(calendarEl);
              observer.disconnect();
            }
          }
        })
      })
      observer.observe(document.body, { childList: true, subtree: true });
    }

    createTipWhenHoveringCalendar(calendarEl);
  }, []);

  return <>
    <div className="appCalendarWrapper">
      <div className={tipClasses.join(' ')}>
        <span className={'lampEmoji'}>💡</span> Double click somewhere in the grid to create an event

        <div className={'tipTimer'}>
          <CountdownCircleTimer key={String(tipWasShown)} size={24} strokeWidth={3} isPlaying duration={7.5} colors={['#329189', '#08837f', '#65a9dc']} colorsTime={[7, 3, 0]} />
        </div>
      </div>

      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  </>
}
