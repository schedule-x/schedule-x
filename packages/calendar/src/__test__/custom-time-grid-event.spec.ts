import 'temporal-polyfill/global'
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
import { getFirstEventElement } from './utils'
import { vi } from 'vitest'

const resizeObserver = class ResizeObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

window.ResizeObserver = resizeObserver

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the week time grid event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId = '1'
    const eventTitle = 'test title 123'
    const eventStart = Temporal.ZonedDateTime.from(
      '2020-01-01T04:00:00.00+00:00[UTC]'
    )
    const eventEnd = Temporal.ZonedDateTime.from(
      '2020-01-01T06:00:00.00+00:00[UTC]'
    )
    const foreignPropertyValue = 'foreign property value'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2020-01-01'),
        views: [viewWeek],
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
      calendarApp._setCustomComponentFn('timeGridEvent', customComponentFn)
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
        expect(elementCCID).toMatch(/^custom-time-grid-event-\w+$/)
        expect(callSecondArgument.calendarEvent.id).toBe(eventId)
        expect(callSecondArgument.calendarEvent.title).toBe(eventTitle)
        expect(callSecondArgument.calendarEvent.start).toEqual(eventStart)
        expect(callSecondArgument.calendarEvent.end).toEqual(eventEnd)
        expect(callSecondArgument.calendarEvent.foreignProperty).toBe(
          foreignPropertyValue
        )
      })
    })

    it('should not render any default markup', () => {
      const eventEl = calendarEl.querySelector('.sx__time-grid-event-inner')
      expect(eventEl?.innerHTML).toBe('')
    })

    it('should have 0 padding', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.padding).toBe('0px')
    })

    it('should have an undefined border', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.borderLeft).toBe('')
    })
  })
})
