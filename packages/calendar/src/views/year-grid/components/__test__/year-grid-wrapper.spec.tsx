import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import { signal } from '@preact/signals'
import { stubInterface } from 'ts-sinon'
import { createCalendarAppSingleton } from '../../../../factory'
import { viewYearGrid } from '../../index'
import { viewDay } from '../../../day'
import { YearGridWrapper } from '../year-grid-wrapper'
import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'

const renderYear = (
  config: Partial<Parameters<typeof createCalendarAppSingleton>[0]> = {}
) => {
  const $app = createCalendarAppSingleton(
    {
      views: [viewYearGrid],
      selectedDate: Temporal.PlainDate.from('2026-09-28'),
      ...config,
    },
    []
  )
  render(<YearGridWrapper $app={$app} id="year-grid" />)
  return $app
}

describe('YearGridWrapper', () => {
  afterEach(cleanup)

  it('renders twelve months and every day in the selected year', () => {
    renderYear()

    expect(document.querySelectorAll('.sx__year-grid-month')).toHaveLength(12)
    expect(document.querySelectorAll('.sx__year-grid-day')).toHaveLength(365)
  })

  it('updates the selected date and calls the date callback', () => {
    const onClickDate = vi.fn()
    const $app = renderYear({ callbacks: { onClickDate } })
    const day = document.querySelector('[data-date="2026-01-12"]') as Element

    fireEvent.click(day)

    expect($app.datePickerState.selectedDate.value.toString()).toBe(
      '2026-01-12'
    )
    expect(onClickDate).toHaveBeenCalledWith(
      Temporal.PlainDate.from('2026-01-12'),
      expect.any(UIEvent)
    )
  })

  it('limits event indicators according to the year-grid config', () => {
    renderYear({
      yearGridOptions: { nEventIndicatorsPerDay: 2 },
      events: [1, 2, 3].map((id) => ({
        id,
        start: Temporal.PlainDate.from('2026-01-12'),
        end: Temporal.PlainDate.from('2026-01-12'),
      })),
    })

    const day = document.querySelector('[data-date="2026-01-12"]') as Element
    expect(day.querySelectorAll('.sx__year-grid-day__event-icon')).toHaveLength(
      2
    )
  })

  it('opens a day-events modal and opens the event modal from it', () => {
    const onEventClick = vi.fn()
    const $app = renderYear({
      callbacks: { onEventClick },
      events: [
        {
          id: 1,
          title: 'Planning session',
          start: Temporal.PlainDate.from('2026-01-12'),
          end: Temporal.PlainDate.from('2026-01-12'),
        },
      ],
    })
    const mockEventModal = stubInterface<EventModalPlugin>()
    mockEventModal.setCalendarEvent =
      vi.fn() as unknown as typeof mockEventModal.setCalendarEvent
    mockEventModal.calendarEventElement = signal(null)
    $app.config.plugins.eventModal = mockEventModal

    fireEvent.click(
      document.querySelector('[data-date="2026-01-12"]') as Element
    )
    const eventElement = document.querySelector(
      '.sx__year-grid-day-events-modal .sx__month-agenda-event'
    ) as Element

    expect(eventElement.textContent).toContain('Planning session')
    fireEvent.click(eventElement)

    expect(mockEventModal.setCalendarEvent).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
      expect.any(Object)
    )
    expect(mockEventModal.calendarEventElement.value).toBe(eventElement)
    expect(onEventClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
      expect.any(UIEvent)
    )
  })

  it('opens the day view on double click when it is configured', () => {
    const $app = renderYear({ views: [viewYearGrid, viewDay] })
    const setView = vi.spyOn($app.calendarState, 'setView')
    const day = document.querySelector('[data-date="2026-01-12"]') as Element

    fireEvent.dblClick(day)

    expect(setView).toHaveBeenCalledWith(
      'day',
      Temporal.PlainDate.from('2026-01-12')
    )
  })

  it('uses the custom year-grid double-click handler instead of changing view', () => {
    const onDoubleClickYearGridDate = vi.fn()
    const $app = renderYear({
      views: [viewYearGrid, viewDay],
      callbacks: { onDoubleClickYearGridDate },
    })
    const setView = vi.spyOn($app.calendarState, 'setView')
    const day = document.querySelector('[data-date="2026-01-12"]') as Element

    fireEvent.dblClick(day)

    expect(onDoubleClickYearGridDate).toHaveBeenCalledWith(
      Temporal.PlainDate.from('2026-01-12'),
      expect.any(UIEvent)
    )
    expect(setView).not.toHaveBeenCalled()
  })

  it('reacts to event filters', async () => {
    const $app = renderYear({
      events: [
        {
          id: 1,
          title: 'visible',
          start: Temporal.PlainDate.from('2026-01-12'),
          end: Temporal.PlainDate.from('2026-01-12'),
        },
        {
          id: 2,
          title: 'hidden',
          start: Temporal.PlainDate.from('2026-01-12'),
          end: Temporal.PlainDate.from('2026-01-12'),
        },
      ],
    })
    const iconsForDate = () =>
      document
        .querySelector('[data-date="2026-01-12"]')
        ?.querySelectorAll('.sx__year-grid-day__event-icon')

    expect(iconsForDate()).toHaveLength(2)
    $app.calendarEvents.filterPredicate.value = (event) =>
      event.title === 'visible'

    await waitFor(() => expect(iconsForDate()).toHaveLength(1))
  })
})
