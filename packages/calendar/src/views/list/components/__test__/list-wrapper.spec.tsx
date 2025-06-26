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

const setup = (events: CalendarEventInternal[] = []) => {
  const $app = __createAppWithViews__()
  $app.calendarEvents.list = signal(events)

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

  describe('event sorting and grouping', () => {
    it('should sort events within a day by start time', () => {
      const event1 = createCalendarEvent(
        '2023-10-07 11:00',
        '2023-10-07 12:00',
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        '2023-10-07 08:00',
        '2023-10-07 09:00',
        { id: '2' }
      )
      const { $app } = setup([event1, event2])

      render(<ListWrapper $app={$app} id="test-list" />)

      const events = document.querySelectorAll('.sx__list-event')
      expect(events).toHaveLength(2)

      expect(events[0].textContent).toContain('Test Event')
      expect(events[0].textContent).toContain('8:00 AM')
      expect(events[0].textContent).toContain('9:00 AM')

      expect(events[1].textContent).toContain('Test Event')
      expect(events[1].textContent).toContain('11:00 AM')
      expect(events[1].textContent).toContain('12:00 PM')
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

      expect(screen.getByText(/Samstag, 7\. Oktober 2023/)).toBeTruthy()
    })

    it('should use correct locale for time formatting', () => {
      const event = createCalendarEvent('2023-10-07 10:00', '2023-10-07 11:00')
      const { $app } = setup([event])
      $app.config.locale.value = 'de-DE'

      render(<ListWrapper $app={$app} id="test-list" />)

      // German locale should use 24-hour format
      expect(screen.getByText('10:00')).toBeTruthy()
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
