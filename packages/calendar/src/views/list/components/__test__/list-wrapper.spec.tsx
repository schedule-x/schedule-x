import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { ListWrapper } from '../list-wrapper'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { signal } from '@preact/signals'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const createCalendarEvent = (
  start: string,
  end: string,
  overrides: Partial<CalendarEventInternal> = {}
) => {
  return {
    id: '1',
    title: 'Test Event',
    start,
    end,
    _color: 'primary',
    _isMultiDayFullDay: false,
    _isSingleDayFullDay: false,
    _isSingleDayTimed: true,
    _isMultiDayTimed: false,
    ...overrides,
  } as CalendarEventInternal
}

const createMultiDayEvent = (
  start: string,
  end: string,
  overrides: Partial<CalendarEventInternal> = {}
) => {
  return {
    id: '2',
    title: 'Multi Day Event',
    start,
    end,
    _color: 'secondary',
    _isMultiDayFullDay: false,
    _isSingleDayFullDay: false,
    _isSingleDayTimed: false,
    _isMultiDayTimed: true,
    ...overrides,
  } as CalendarEventInternal
}

const createFullDayEvent = (
  start: string,
  end: string,
  overrides: Partial<CalendarEventInternal> = {}
) => {
  return {
    id: '3',
    title: 'Full Day Event',
    start,
    end,
    _color: 'tertiary',
    _isMultiDayFullDay: false,
    _isSingleDayFullDay: true,
    _isSingleDayTimed: false,
    _isMultiDayTimed: false,
    ...overrides,
  } as CalendarEventInternal
}

const setup = (events: CalendarEventInternal[] = []) => {
  const $app = __createAppWithViews__()

  // Setup calendar events
  $app.calendarEvents.list = signal(events)

  // Setup calendar state
  $app.calendarState.range = signal({
    start: '2023-10-07',
    end: '2023-10-10',
  })

  // Setup date picker state
  $app.datePickerState.selectedDate = signal('2023-10-07')

  // Setup config
  $app.config.locale = signal('en-US')
  $app.config.callbacks = {
    onScrollDayIntoView: vi.fn(),
  }

  // Setup translate function
  $app.translate = vi.fn((key: string) => key)

  return { $app }
}

describe('ListWrapper', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
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

  describe('rendering with no events', () => {
    it('should display no events message', () => {
      const { $app } = setup([])

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.getByText('No events')).toBeTruthy()
    })
  })

  describe('rendering with single day events', () => {
    it('should display single day event correctly', () => {
      const event = createCalendarEvent('2023-10-07 10:00', '2023-10-07 11:00')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.getByText('Test Event')).toBeTruthy()
      expect(screen.getByText('Saturday, October 7, 2023')).toBeTruthy()
      expect(screen.getByText('10:00 AM')).toBeTruthy()
      expect(screen.getByText('11:00 AM')).toBeTruthy()
    })

    it('should display event color line', () => {
      const event = createCalendarEvent(
        '2023-10-07 10:00',
        '2023-10-07 11:00',
        { _color: 'primary' }
      )
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      const colorLine = document.querySelector('.sx__list-event-color-line')
      expect(colorLine).toBeTruthy()
      expect(colorLine?.className).toContain(
        'sx__list-event-color-line--primary'
      )
    })
  })

  describe('rendering multi-day events', () => {
    it('should display multi-day event start correctly', () => {
      const event = createMultiDayEvent('2023-10-07 10:00', '2023-10-09 11:00')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // First day should show start time and arrow
      expect(screen.findByText('Multi Day Event')).toBeTruthy()
      expect(screen.findByText('Saturday, October 7, 2023')).toBeTruthy()
      expect(screen.findByText('10:00 AM')).toBeTruthy()
      expect(screen.findByText('→')).toBeTruthy()
    })

    it('should display multi-day event middle days correctly', () => {
      const event = createMultiDayEvent('2023-10-07 10:00', '2023-10-09 11:00')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // Middle day should show bidirectional arrow
      expect(screen.getByText('Sunday, October 8, 2023')).toBeTruthy()
      expect(screen.getByText('↔')).toBeTruthy()
    })

    it('should display multi-day event end correctly', () => {
      const event = createMultiDayEvent('2023-10-07 10:00', '2023-10-09 11:00')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // Last day should show arrow and end time
      expect(screen.getByText('Monday, October 9, 2023')).toBeTruthy()
      expect(screen.getByText('←')).toBeTruthy()
      expect(screen.getByText('11:00 AM')).toBeTruthy()
    })
  })

  describe('rendering full day events', () => {
    it('should display full day event correctly', () => {
      const event = createFullDayEvent('2023-10-08', '2023-10-08')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.getByText('Full Day Event')).toBeTruthy()
      expect(screen.getByText('Sunday, October 8, 2023')).toBeTruthy()
      // Full day events don't show times
      expect(screen.queryByText('10:00 AM')).toBeFalsy()
      expect(screen.queryByText('11:00 AM')).toBeFalsy()
    })
  })

  describe('event sorting and grouping', () => {
    it('should group events by date', () => {
      const event1 = createCalendarEvent(
        '2023-10-07 10:00',
        '2023-10-07 11:00',
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        '2023-10-08 11:00',
        '2023-10-08 12:00',
        { id: '2' }
      )
      const { $app } = setup([event1, event2])

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.getByText('Saturday, October 7, 2023')).toBeTruthy()
      expect(screen.getByText('Sunday, October 8, 2023')).toBeTruthy()
    })

    it('should sort events within a day by start time', () => {
      const event1 = createCalendarEvent(
        '2023-10-07 11:00',
        '2023-10-07 12:00',
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        '2023-10-07 10:00',
        '2023-10-07 11:00',
        { id: '2' }
      )
      const { $app } = setup([event1, event2])

      render(<ListWrapper $app={$app} id="test-list" />)

      const events = document.querySelectorAll('.sx__list-event')
      expect(events).toHaveLength(2)

      // First event should be the earlier one
      expect(events[0].textContent).toContain('Test Event')
      expect(events[0].textContent).toContain('10:00 AM')
    })

    it('should sort days chronologically', () => {
      const event1 = createCalendarEvent(
        '2023-10-08 10:00',
        '2023-10-08 11:00',
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        '2023-10-07 10:00',
        '2023-10-07 11:00',
        { id: '2' }
      )
      const { $app } = setup([event1, event2])

      render(<ListWrapper $app={$app} id="test-list" />)

      const days = document.querySelectorAll('.sx__list-day')
      expect(days[0].getAttribute('data-date')).toBe('2023-10-07')
      expect(days[1].getAttribute('data-date')).toBe('2023-10-08')
    })
  })

  describe('updating range according to first and last events', () => {
    it('should only show events within the specified range', () => {
      const event1 = createCalendarEvent(
        '2023-10-07 10:00',
        '2023-10-07 11:00',
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        '2023-10-15 10:00',
        '2023-10-15 11:00',
        { id: '2' }
      ) // Outside range
      const { $app } = setup([event1, event2])

      // Set range to only include first event
      $app.calendarState.range.value = {
        start: '2023-10-07',
        end: '2023-10-10',
      }

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.findByText('Test Event')).toBeTruthy()
      // Only one event should be shown
      const events = document.querySelectorAll('.sx__list-event')
      expect(events).toHaveLength(2)
      expect($app.calendarState.range.value).toEqual({
        start: '2023-10-07',
        end: '2023-10-15',
      })
    })
  })

  describe('selected date scrolling', () => {
    it('should scroll to selected date when it changes', async () => {
      const event = createCalendarEvent('2023-10-07 10:00', '2023-10-07 11:00')
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // Mock scrollIntoView
      const mockScrollIntoView = vi.fn()
      const dayElement = document.querySelector('.sx__list-day')
      if (dayElement) {
        dayElement.scrollIntoView = mockScrollIntoView
      }

      // Change selected date
      $app.datePickerState.selectedDate.value = '2023-10-07'

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: 'instant',
          block: 'start',
        })
      })
    })
  })

  describe('locale support', () => {
    it('should use correct locale for date formatting', () => {
      const event = createCalendarEvent('2023-10-07 10:00', '2023-10-07 11:00')
      const { $app } = setup([event])
      $app.config.locale.value = 'de-DE'

      render(<ListWrapper $app={$app} id="test-list" />)

      // German locale should format date differently
      expect(screen.getByText(/Samstag, 7\. Oktober 2023/)).toBeTruthy()
    })

    it('should use correct locale for time formatting', () => {
      const event = createCalendarEvent('2023-10-07 10:00', '2023-10-07 11:00')
      const { $app } = setup([event])
      $app.config.locale.value = 'de-DE'

      render(<ListWrapper $app={$app} id="test-list" />)

      // German locale should use 24-hour format
      expect(screen.getByText('10:00')).toBeTruthy()
      // no us format
      expect(screen.queryByText('10:00 AM')).toBeFalsy()
    })
  })

  describe('component props', () => {
    it('should apply the provided id to the wrapper', () => {
      const { $app } = setup([])

      render(<ListWrapper $app={$app} id="custom-list-id" />)

      const wrapper = document.getElementById('custom-list-id')
      expect(wrapper).toBeTruthy()
      expect(wrapper?.className).toContain('sx__list-wrapper')
    })
  })
})
