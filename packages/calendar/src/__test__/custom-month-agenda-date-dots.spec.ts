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
import { viewMonthAgenda } from '../views/month-agenda'
import { vi } from 'vitest'

describe('custom month agenda date dots', () => {
  let calendarApp: CalendarApp
  const calendarEl = document.createElement('div')
  document.body.appendChild(calendarEl)
  let customComponentFn = vi.fn()

  beforeEach(() => {
    calendarApp = createCalendar({
      selectedDate: Temporal.PlainDate.from('2022-08-27'),
      views: [viewMonthAgenda],
      events: [
        {
          id: '1',
          title: 'event 1',
          start: Temporal.ZonedDateTime.from(
            '2022-08-27T09:00:00.00+00:00[UTC]'
          ),
          end: Temporal.ZonedDateTime.from('2022-08-27T09:30:00.00+00:00[UTC]'),
        },
        {
          id: '2',
          title: 'event 2',
          start: Temporal.ZonedDateTime.from(
            '2022-08-27T10:00:00.00+00:00[UTC]'
          ),
          end: Temporal.ZonedDateTime.from('2022-08-27T10:30:00.00+00:00[UTC]'),
        },
        {
          id: '3',
          title: 'event 3',
          start: Temporal.ZonedDateTime.from(
            '2022-08-27T11:00:00.00+00:00[UTC]'
          ),
          end: Temporal.ZonedDateTime.from('2022-08-27T11:30:00.00+00:00[UTC]'),
        },
        {
          id: '4',
          title: 'event 4',
          start: Temporal.ZonedDateTime.from(
            '2022-08-27T12:00:00.00+00:00[UTC]'
          ),
          end: Temporal.ZonedDateTime.from('2022-08-27T12:30:00.00+00:00[UTC]'),
        },
      ],
    })
    customComponentFn = vi.fn()
    calendarApp._setCustomComponentFn('monthAgendaDateDots', customComponentFn)
    calendarApp.render(calendarEl)
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should call custom component and pass up to three events', async () => {
    await waitFor(() => {
      expect(customComponentFn).toHaveBeenCalled()
    })

    customComponentFn.mock.calls.forEach((call) => {
      const callFirstArgument = call[0]
      const callSecondArgument = call[1] as {
        date: number
        jsDate: Date
        events: { id: string }[]
      }
      expect(callFirstArgument).toBeInstanceOf(HTMLElement)
      expect(callSecondArgument.jsDate).toBeInstanceOf(Date)
      expect(callSecondArgument.events.length).toBeLessThanOrEqual(3)
    })

    const targetCall = customComponentFn.mock.calls.find((call) => {
      const props = call[1] as { jsDate: Date }
      return (
        props.jsDate.getFullYear() === 2022 &&
        props.jsDate.getMonth() === 7 &&
        props.jsDate.getDate() === 27
      )
    })
    const targetProps = targetCall?.[1] as {
      date: number
      events: { id: string }[]
    }

    expect(targetProps.date).toBe(27)
    expect(targetProps.events.map((event) => event.id)).toEqual(['1', '2', '3'])
  })

  it('should not render any default date dots', () => {
    expect(calendarEl.querySelector('.sx__month-agenda-day__event-icon')).toBe(
      null
    )
  })
})
