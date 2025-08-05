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
import { spy } from 'sinon'
import { viewMonthGrid } from '../views/month-grid'
import { getFirstEventElement } from './utils'

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the month grid event', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    const eventId1 = '1'
    const eventTitle1 = 'test title 123'
    const eventStart1 = Temporal.ZonedDateTime.from('2018-07-01T04:00:00.00+00:00[UTC]')
    const eventEnd1 = Temporal.ZonedDateTime.from('2018-07-01T06:00:00.00+00:00[UTC]')
    const randomForeignPropertyValue = 'test'

    const eventId2 = '2'
    const eventTitle2 = 'test title 456'
    const eventStart2 = Temporal.ZonedDateTime.from('2018-06-18T00:00:00.00+00:00[UTC]')
    const eventEnd2 = Temporal.ZonedDateTime.from('2018-07-02T00:00:00.00+00:00[UTC]')

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2018-07-01'),
        views: [viewMonthGrid],
        events: [
          {
            id: eventId1,
            title: eventTitle1,
            start: eventStart1,
            end: eventEnd1,
            randomForeignProperty: randomForeignPropertyValue,
          },
          {
            id: eventId2,
            title: eventTitle2,
            start: eventStart2,
            end: eventEnd2,
          },
        ],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('monthGridEvent', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      const ccidPattern = /^custom-month-grid-event-.*$/

      await waitFor(() => {
        expect(customComponentFn.callCount).toBe(3) // event1 is displayed in 1 week and event2 is displayed in 2 weeks
        const event2Week1 = customComponentFn.getCalls()[0]
        const event2Week1Arg0 = event2Week1.args[0]
        const event2Week1Arg1 = event2Week1.args[1]
        expect(event2Week1Arg0).toBeInstanceOf(HTMLDivElement)
        expect(event2Week1Arg0.dataset.ccid).toMatch(ccidPattern)
        expect(event2Week1Arg1.calendarEvent.id).toBe(eventId2)
        expect(event2Week1Arg1.calendarEvent.title).toBe(eventTitle2)
        expect(event2Week1Arg1.calendarEvent.start).toBe(eventStart2)
        expect(event2Week1Arg1.calendarEvent.end).toBe(eventEnd2)
        expect(event2Week1Arg1.hasStartDate).toBe(false)

        const event2Week2 = customComponentFn.getCalls()[2]
        const event2Week2Arg0 = event2Week2.args[0]
        const event2Week2Arg1 = event2Week2.args[1]
        expect(event2Week2Arg0).toBeInstanceOf(HTMLDivElement)
        expect(event2Week2Arg0.dataset.ccid).toMatch(ccidPattern)
        expect(event2Week2Arg1.calendarEvent.id).toBe(eventId2)
        expect(event2Week2Arg1.calendarEvent.title).toBe(eventTitle2)
        expect(event2Week2Arg1.calendarEvent.start).toBe(eventStart2)
        expect(event2Week2Arg1.calendarEvent.end).toBe(eventEnd2)
        expect(event2Week2Arg1.hasStartDate).toBe(false)

        const event1 = customComponentFn.getCalls()[1]
        const event1Arg0 = event1.args[0]
        const event1Arg1 = event1.args[1]
        expect(event1Arg0).toBeInstanceOf(HTMLDivElement)
        expect(event1Arg0.dataset.ccid).toMatch(ccidPattern)
        expect(event1Arg1.calendarEvent.id).toBe(eventId1)
        expect(event1Arg1.calendarEvent.title).toBe(eventTitle1)
        expect(event1Arg1.calendarEvent.start).toBe(eventStart1)
        expect(event1Arg1.calendarEvent.end).toBe(eventEnd1)
        expect(event1Arg1.calendarEvent.randomForeignProperty).toBe(
          randomForeignPropertyValue
        )
        expect(event1Arg1.hasStartDate).toBe(true)
      })
    })

    it('should not render any default markup', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl?.innerHTML).toBe('')
    })

    it('should have 0 padding', () => {
      const eventEl = getFirstEventElement(calendarEl)
      expect(eventEl.style.padding).toBe('0px')
    })
  })
})
