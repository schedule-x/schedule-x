import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { cleanup, waitFor } from '@testing-library/preact'
import CalendarApp from '../calendar.app'
import { spy } from 'sinon'
import { viewMonthAgenda } from '../views/month-agenda'
import { getFirstEventElement } from './utils'

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the month agenda event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId = '1'
    const eventTitle = 'test title 123'
    const eventStart = '2022-08-27 21:57'
    const eventEnd = '2020-08-27 22:42'
    const foreignPropertyValue = 'some value'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2022-08-27',
        views: [viewMonthAgenda],
        events: [
          {
            id: eventId,
            title: eventTitle,
            start: eventStart,
            end: eventEnd,
            foreignProperty: foreignPropertyValue,
          },
        ],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('monthAgendaEvent', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(customComponentFn.calledOnce).toBe(true)
        const singleCall = customComponentFn.getCalls()[0]
        const callFirstArgument = singleCall.args[0]
        const callSecondArgument = singleCall.args[1]
        expect(callFirstArgument).toBeInstanceOf(HTMLDivElement)
        const elementCCID = callFirstArgument.dataset.ccid
        expect(elementCCID).toMatch(/custom-month-agenda-event-\w+/)
        expect(callSecondArgument.calendarEvent.id).toBe(eventId)
        expect(callSecondArgument.calendarEvent.title).toBe(eventTitle)
        expect(callSecondArgument.calendarEvent.start).toBe(eventStart)
        expect(callSecondArgument.calendarEvent.end).toBe(eventEnd)
        expect(callSecondArgument.calendarEvent.foreignProperty).toBe(
          foreignPropertyValue
        )
      })
    })

    it('should not render any default markup', () => {
      const eventEl = calendarEl.querySelector('.sx__event')
      expect(eventEl?.innerHTML).toBe('')
    })

    it('should have 0 padding', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.padding).toBe('0px')
    })
  })
})
