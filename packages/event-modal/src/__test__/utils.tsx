import { stubInterface } from 'ts-sinon'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const setup = () => {
  const $app = stubInterface<CalendarAppSingleton>()
  const eventModalPlugin = stubInterface<EventModalPlugin>()
  const calendarEvent = stubInterface<CalendarEventInternal>()
  calendarEvent.id = '1'
  calendarEvent.title = 'test'
  calendarEvent.time = {
    start: '2023-10-07',
    end: '2023-10-08',
  }
  calendarEvent._isMultiDayFullDay = true
  calendarEvent._isSingleDayFullDay = false
  calendarEvent._isSingleDayTimed = false
  calendarEvent._isMultiDayTimed = false
  eventModalPlugin.calendarEvent.value = calendarEvent
  eventModalPlugin.calendarEventElement.value = document.createElement('div')
  const calendarWrapperEl = document.createElement('div')
  const mockModalEl = document.createElement('div')
  mockModalEl.classList.add('sx__event-modal')
  calendarWrapperEl.appendChild(mockModalEl)
  $app.elements.calendarWrapper = calendarWrapperEl
  $app.config.plugins = {}
  $app.config.plugins.eventModal = eventModalPlugin
  return { $app, calendarEvent }
}

export const getLocationEl = () =>
  document.querySelector('.sx__event-modal__location')

export const getPeopleEl = () =>
  document.querySelector('.sx__event-modal__people')

export const getDescriptionEl = () =>
  document.querySelector('.sx__event-modal__description')
