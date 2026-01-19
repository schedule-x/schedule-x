import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import { cleanup, render, waitFor } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../stateless/testing/__create-app-with-views__'
import useFetchEvents from '../use-fetch-events'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

const TestComponent = ({ $app }: { $app: CalendarAppSingleton }) => {
  useFetchEvents($app)
  return <div>Test</div>
}

describe('useFetchEvents', () => {
  afterEach(() => {
    cleanup()
  })

  describe('on initial render', () => {
    it('should call fetchEvents when range is available', async () => {
      const mockEvents: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Test Event',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
      ]

      const fetchEvents = vi.fn().mockResolvedValue(mockEvents)
      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      render(<TestComponent $app={$app} />)

      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(1)
        expect(fetchEvents).toHaveBeenCalledWith($app.calendarState.range.value)
      })

      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('1')
        expect($app.calendarEvents.list.value[0].title).toBe('Test Event')
      })
    })

    it('should not call fetchEvents when range is not available', async () => {
      const fetchEvents = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
      })

      // Manually set range to null
      $app.calendarState.range.value = null

      render(<TestComponent $app={$app} />)

      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(fetchEvents).not.toHaveBeenCalled()
    })
  })

  describe('on range change', () => {
    it('should call fetchEvents when range changes', async () => {
      const mockEvents1: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Event 1',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
      ]

      const mockEvents2: CalendarEventExternal[] = [
        {
          id: '2',
          title: 'Event 2',
          start: Temporal.ZonedDateTime.from('2024-02-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-02-01T11:00:00.000Z[UTC]'),
        },
      ]

      const fetchEvents = vi
        .fn()
        .mockResolvedValueOnce(mockEvents1)
        .mockResolvedValueOnce(mockEvents2)

      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      render(<TestComponent $app={$app} />)

      // Wait for initial call
      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(1)
      })

      // Change the range
      $app.calendarState.range.value = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-02-07T23:59:59.999Z[UTC]'),
      }

      // Wait for the second call
      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(2)
      })

      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('2')
        expect($app.calendarEvents.list.value[0].title).toBe('Event 2')
      })
    })
  })

  describe('event conversion', () => {
    it('should convert external events to internal events', async () => {
      const mockEvents: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Test Event',
          description: 'Test Description',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
      ]

      const fetchEvents = vi.fn().mockResolvedValue(mockEvents)
      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      render(<TestComponent $app={$app} />)

      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(1)
        const internalEvent = $app.calendarEvents.list.value[0]
        expect(internalEvent.id).toBe('1')
        expect(internalEvent.title).toBe('Test Event')
        expect(internalEvent.description).toBe('Test Description')
        // Verify it's an internal event (has _getExternalEvent method)
        expect(typeof internalEvent._getExternalEvent).toBe('function')
      })
    })

    it('should handle multiple events', async () => {
      const mockEvents: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Event 1',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
        {
          id: '2',
          title: 'Event 2',
          start: Temporal.ZonedDateTime.from('2024-01-01T14:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T15:00:00.000Z[UTC]'),
        },
        {
          id: '3',
          title: 'Event 3',
          start: Temporal.ZonedDateTime.from('2024-01-01T16:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T17:00:00.000Z[UTC]'),
        },
      ]

      const fetchEvents = vi.fn().mockResolvedValue(mockEvents)
      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      render(<TestComponent $app={$app} />)

      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(3)
        expect($app.calendarEvents.list.value[0].id).toBe('1')
        expect($app.calendarEvents.list.value[1].id).toBe('2')
        expect($app.calendarEvents.list.value[2].id).toBe('3')
      })
    })

    it('should replace existing events when new events are fetched', async () => {
      const initialEvents: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Initial Event',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
      ]

      const newEvents: CalendarEventExternal[] = [
        {
          id: '2',
          title: 'New Event',
          start: Temporal.ZonedDateTime.from('2024-02-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-02-01T11:00:00.000Z[UTC]'),
        },
      ]

      const fetchEvents = vi
        .fn()
        .mockResolvedValueOnce(initialEvents)
        .mockResolvedValueOnce(newEvents)

      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      render(<TestComponent $app={$app} />)

      // Wait for initial call
      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('1')
      })

      // Change range to trigger new fetch
      $app.calendarState.range.value = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-02-07T23:59:59.999Z[UTC]'),
      }

      // Wait for new events
      await waitFor(() => {
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('2')
        expect($app.calendarEvents.list.value[0].title).toBe('New Event')
      })
    })

    it('should call fetchEvents when navigating back to the initial range', async () => {
      const initialEvents: CalendarEventExternal[] = [
        {
          id: '1',
          title: 'Initial Event',
          start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        },
      ]

      const differentEvents: CalendarEventExternal[] = [
        {
          id: '2',
          title: 'Different Event',
          start: Temporal.ZonedDateTime.from('2024-02-01T10:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-02-01T11:00:00.000Z[UTC]'),
        },
      ]

      const backToInitialEvents: CalendarEventExternal[] = [
        {
          id: '3',
          title: 'Back to Initial Event',
          start: Temporal.ZonedDateTime.from('2024-01-01T12:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-01-01T13:00:00.000Z[UTC]'),
        },
      ]

      const initialRange = {
        start: Temporal.ZonedDateTime.from('2024-01-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-07T23:59:59.999Z[UTC]'),
      }

      const fetchEvents = vi
        .fn()
        .mockResolvedValueOnce(initialEvents)
        .mockResolvedValueOnce(differentEvents)
        .mockResolvedValueOnce(backToInitialEvents)

      const $app = __createAppWithViews__({
        callbacks: {
          fetchEvents,
        },
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })

      // Set initial range
      $app.calendarState.range.value = initialRange

      render(<TestComponent $app={$app} />)

      // Wait for initial call
      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(1)
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('1')
      })

      // Navigate to a different range
      $app.calendarState.range.value = {
        start: Temporal.ZonedDateTime.from('2024-02-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-02-07T23:59:59.999Z[UTC]'),
      }

      // Wait for second call
      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(2)
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('2')
      })

      // Navigate back to the initial range
      $app.calendarState.range.value = initialRange

      // Wait for third call (this is the bug fix - should be called even though it's the initial range)
      await waitFor(() => {
        expect(fetchEvents).toHaveBeenCalledTimes(3)
        expect($app.calendarEvents.list.value).toHaveLength(1)
        expect($app.calendarEvents.list.value[0].id).toBe('3')
        expect($app.calendarEvents.list.value[0].title).toBe(
          'Back to Initial Event'
        )
      })
    })
  })
})
