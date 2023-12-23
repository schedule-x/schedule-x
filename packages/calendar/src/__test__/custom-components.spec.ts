import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { cleanup, waitFor } from '@testing-library/preact'
import CalendarApp from '../calendar.app'
import { viewWeek } from '../views/week'
import { spy } from 'sinon'

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the time grid', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId = '1'
    const eventTitle = 'test title 123'
    const eventStart = '2020-01-01 04:00'
    const eventEnd = '2020-01-01 06:00'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2020-01-01',
        views: [viewWeek],
        events: [
          {
            id: eventId,
            title: eventTitle,
            start: eventStart,
            end: eventEnd,
          },
        ],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('timeGridEvent', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(customComponentFn.calledOnce).toBe(true)
        const singleCall = customComponentFn.getCalls()[0]
        const callFirstArgument = singleCall.args[0]
        const callSecondArgument = singleCall.args[1]
        expect(callFirstArgument).toBeInstanceOf(HTMLElement)
        const elementCCID = callFirstArgument.dataset.ccid
        expect(elementCCID).toBe('custom-time-grid-event-1')
        expect(callSecondArgument.calendarEvent.id).toBe(eventId)
        expect(callSecondArgument.calendarEvent.title).toBe(eventTitle)
        expect(callSecondArgument.calendarEvent.start).toBe(eventStart)
        expect(callSecondArgument.calendarEvent.end).toBe(eventEnd)
      })
    })

    it('should not render any default markup', () => {
      const eventEl = calendarEl.querySelector('.sx__event')
      expect(eventEl?.innerHTML).toBe('')
    })
  })
})
