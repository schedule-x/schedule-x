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

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the week date grid event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId1 = '1'
    const eventTitle1 = 'test title 123'
    const eventStart1 = '2020-01-01'
    const eventEnd1 = '2020-01-01'
    const event1ForeignPropertyValue = 'foreign property 1'

    const eventId2 = '2'
    const eventTitle2 = 'test title 456'
    const eventStart2 = '2019-12-29'
    const eventEnd2 = '2020-01-01'

    const eventId3 = '3'
    const eventTitle3 = 'test title 789'
    const eventStart3 = '2020-01-01'
    const eventEnd3 = '2020-01-06'

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2020-01-01',
        views: [viewWeek],
        events: [
          {
            id: eventId1,
            title: eventTitle1,
            start: eventStart1,
            end: eventEnd1,
            foreignProperty: event1ForeignPropertyValue,
          },
          {
            id: eventId2,
            title: eventTitle2,
            start: eventStart2,
            end: eventEnd2,
          },
          {
            id: eventId3,
            title: eventTitle3,
            start: eventStart3,
            end: eventEnd3,
          },
        ],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('dateGridEvent', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(customComponentFn.calledThrice).toBe(true)

        const event1 = customComponentFn.getCalls()[2]
        const callFirstArgument = event1.args[0]
        const callSecondArgument = event1.args[1]
        expect(callFirstArgument).toBeInstanceOf(HTMLDivElement)
        const elementCCID = callFirstArgument.dataset.ccid
        expect(elementCCID).toMatch(/custom-date-grid-event-\w+$/)
        expect(callSecondArgument.calendarEvent.id).toBe(eventId1)
        expect(callSecondArgument.calendarEvent.title).toBe(eventTitle1)
        expect(callSecondArgument.calendarEvent.start).toBe(eventStart1)
        expect(callSecondArgument.calendarEvent.end).toBe(eventEnd1)
        expect(callSecondArgument.calendarEvent.foreignProperty).toBe(
          event1ForeignPropertyValue
        )

        const event2 = customComponentFn.getCalls()[0]
        const callFirstArgument2 = event2.args[0]
        const callSecondArgument2 = event2.args[1]
        expect(callFirstArgument2).toBeInstanceOf(HTMLDivElement)
        const elementCCID2 = callFirstArgument2.dataset.ccid
        expect(elementCCID2).toMatch(/custom-date-grid-event-\w+$/)
        expect(callSecondArgument2.calendarEvent.id).toBe(eventId2)
        expect(callSecondArgument2.calendarEvent.title).toBe(eventTitle2)
        expect(callSecondArgument2.calendarEvent.start).toBe(eventStart2)
        expect(callSecondArgument2.calendarEvent.end).toBe(eventEnd2)

        const event3 = customComponentFn.getCalls()[1]
        const callFirstArgument3 = event3.args[0]
        const callSecondArgument3 = event3.args[1]
        expect(callFirstArgument3).toBeInstanceOf(HTMLDivElement)
        const elementCCID3 = callFirstArgument3.dataset.ccid
        expect(elementCCID3).toMatch(/custom-date-grid-event-\w+$/)
        expect(callSecondArgument3.calendarEvent.id).toBe(eventId3)
        expect(callSecondArgument3.calendarEvent.title).toBe(eventTitle3)
        expect(callSecondArgument3.calendarEvent.start).toBe(eventStart3)
        expect(callSecondArgument3.calendarEvent.end).toBe(eventEnd3)
      })
    })

    it('should not render any default markup', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.innerHTML).toBe('')
    })

    it('should not have a background color defined', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.backgroundColor).toBe('')
    })

    it('should not have any border radius defined', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.borderBottomLeftRadius).toBe('0px')
      expect(eventEl.style.borderBottomRightRadius).toBe('0px')
      expect(eventEl.style.borderTopLeftRadius).toBe('0px')
      expect(eventEl.style.borderTopRightRadius).toBe('0px')
    })

    it('should have 0 padding', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.padding).toBe('0px')
    })
  })
})
