import 'temporal-polyfill/global'
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
import { viewList } from '../views/list'
import { getFirstEventElement } from './utils'
import { vi } from 'vitest'

describe('CalendarApp', () => {
  beforeEach(() => {
    window.IntersectionObserver = vi.fn().mockImplementation(() => {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      }
    })
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the list event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId = '1'
    const eventTitle = 'test title 123'
    const eventStart = Temporal.ZonedDateTime.from(
      '2022-08-27T21:57:00.00+00:00[UTC]'
    )
    const eventEnd = Temporal.ZonedDateTime.from(
      '2022-08-27T22:42:00.00+00:00[UTC]'
    )
    const foreignPropertyValue = 'some value'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2022-08-27'),
        views: [viewList],
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
      calendarApp._setCustomComponentFn('listEvent', customComponentFn)
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
        expect(elementCCID).toMatch(/custom-list-event-\w+/)
        expect(callSecondArgument.calendarEvent.id).toBe(eventId)
        expect(callSecondArgument.calendarEvent.title).toBe(eventTitle)
        expect(callSecondArgument.calendarEvent.start).toEqual(eventStart)
        expect(callSecondArgument.calendarEvent.end).toEqual(eventEnd)
        expect(callSecondArgument.calendarEvent.foreignProperty).toBe(
          foreignPropertyValue
        )
        expect(callSecondArgument.eventInstanceInfo).toBeDefined()
        expect(callSecondArgument.eventInstanceInfo.isFirstDay).toBe(true)
        expect(callSecondArgument.eventInstanceInfo.isLastDay).toBe(true)
        expect(callSecondArgument.eventInstanceInfo.isMultiDay).toBe(false)
        expect(callSecondArgument.eventInstanceInfo.forDayOf).toBe('2022-08-27')
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

  describe('Using _customContent.listEvent for the list event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)

    const eventId = '1'
    const eventTitle = 'test title 123'
    const eventStart = Temporal.ZonedDateTime.from(
      '2022-08-27T21:57:00.00+00:00[UTC]'
    )
    const eventEnd = Temporal.ZonedDateTime.from(
      '2022-08-27T22:42:00.00+00:00[UTC]'
    )
    const customHtml =
      '<div class="custom-list-content">My custom content</div>'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2022-08-27'),
        views: [viewList],
        events: [
          {
            id: eventId,
            title: eventTitle,
            start: eventStart,
            end: eventEnd,
            _customContent: {
              listEvent: customHtml,
            },
          },
        ],
      })
      calendarApp.render(calendarEl)
    })

    it('should render the custom html content', async () => {
      await waitFor(() => {
        const customContent = calendarEl.querySelector('.custom-list-content')
        expect(customContent).toBeTruthy()
        expect(customContent?.textContent).toBe('My custom content')
      })
    })

    it('should not render default markup when custom content is provided', async () => {
      await waitFor(() => {
        expect(calendarEl.querySelector('.sx__list-event-title')).toBeFalsy()
        expect(
          calendarEl.querySelector('.sx__list-event-color-line')
        ).toBeFalsy()
        expect(calendarEl.querySelector('.sx__list-event-content')).toBeFalsy()
      })
    })
  })
})
