import 'temporal-polyfill/global'
/* eslint-disable max-lines */
import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/preact'
import { ListWrapper } from '../list-wrapper'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { signal } from '@preact/signals'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'

const createCalendarEvent = (
  start: Temporal.ZonedDateTime | Temporal.PlainDate,
  end: Temporal.ZonedDateTime | Temporal.PlainDate,
  overrides: Partial<CalendarEventInternal> = {}
) => {
  const event = {
    id: '1',
    title: 'Test Event',
    start,
    end,
    _color: 'primary',
    _isMultiDayFullDay: false,
    _isSingleDayFullDay: false,
    _isSingleDayTimed: true,
    _isMultiDayTimed: false,
    _getForeignProperties: () => ({ rrule: undefined }),
    _getExternalEvent: () => ({
      id: overrides.id || '1',
      title: overrides.title || 'Test Event',
      start,
      end,
    }),
    ...overrides,
  } as CalendarEventInternal
  return event
}

const createMultiDayEvent = (
  start: Temporal.ZonedDateTime | Temporal.PlainDate,
  end: Temporal.ZonedDateTime | Temporal.PlainDate,
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
    _getForeignProperties: () => ({ rrule: undefined }),
    _getExternalEvent: () => ({
      id: overrides.id || '2',
      title: overrides.title || 'Multi Day Event',
      start,
      end,
    }),
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
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
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
      const event = createMultiDayEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-09T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // First day should show start time and arrow
      expect(screen.findByText('Multi Day Event')).toBeTruthy()
      expect(screen.findByText('Saturday, October 7, 2023')).toBeTruthy()
      expect(screen.findByText('10:00 AM')).toBeTruthy()
      expect(screen.findByText('→')).toBeTruthy()
    })

    it('should display multi-day event middle days correctly', () => {
      const event = createMultiDayEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-09T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // Middle day should show bidirectional arrow
      expect(screen.getByText('Sunday, October 8, 2023')).toBeTruthy()
      expect(screen.getByText('↔')).toBeTruthy()
    })

    it('should display multi-day event end correctly', () => {
      const event = createMultiDayEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-09T11:00:00+02:00[Europe/Paris]')
      )
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
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T12:00:00+02:00[Europe/Paris]'),
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T08:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T09:00:00+02:00[Europe/Paris]'),
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
        Temporal.ZonedDateTime.from('2023-10-08T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-08T11:00:00+02:00[Europe/Paris]'),
        { id: '1' }
      )
      const event2 = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]'),
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
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      // Mock scrollIntoView
      const mockScrollIntoView = vi.fn()
      const dayElement = document.querySelector('.sx__list-day')
      if (dayElement) {
        dayElement.scrollIntoView = mockScrollIntoView
      }

      // Change selected date
      $app.datePickerState.selectedDate.value =
        Temporal.PlainDate.from('2023-10-07')

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
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      $app.config.locale.value = 'de-DE'

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.getByText(/Samstag, 7\. Oktober 2023/)).toBeTruthy()
    })

    it('should use correct locale for time formatting', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
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

  describe('event modal interactions', () => {
    it('should open modal through click', async () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      // Mock the event modal plugin
      const mockEventModal = stubInterface<EventModalPlugin>()
      mockEventModal.setCalendarEvent =
        vi.fn() as unknown as typeof mockEventModal.setCalendarEvent
      mockEventModal.calendarEventElement = signal(null)
      $app.config.plugins.eventModal = mockEventModal

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventElement = document.querySelector('.sx__list-event')
      expect(eventElement).toBeTruthy()

      fireEvent.click(eventElement as Element)

      expect(mockEventModal.setCalendarEvent).toHaveBeenCalledWith(
        event,
        expect.any(Object)
      )
      expect(mockEventModal.calendarEventElement.value).toBe(eventElement)
    })

    it('should open modal through double click', async () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      // Mock the event modal plugin
      const mockEventModal = stubInterface<EventModalPlugin>()
      mockEventModal.setCalendarEvent =
        vi.fn() as unknown as typeof mockEventModal.setCalendarEvent
      mockEventModal.calendarEventElement = signal(null)
      $app.config.plugins.eventModal = mockEventModal

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventElement = document.querySelector('.sx__list-event')
      expect(eventElement).toBeTruthy()

      fireEvent.dblClick(eventElement as Element)

      expect(mockEventModal.setCalendarEvent).toHaveBeenCalledWith(
        event,
        expect.any(Object)
      )
      expect(mockEventModal.calendarEventElement.value).toBe(eventElement)
    })

    it('should open modal through focus and press Enter', async () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      // Mock the event modal plugin
      const mockEventModal = stubInterface<EventModalPlugin>()
      mockEventModal.setCalendarEvent =
        vi.fn() as unknown as typeof mockEventModal.setCalendarEvent
      mockEventModal.calendarEventElement = signal(null)
      $app.config.plugins.eventModal = mockEventModal

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventElement = document.querySelector(
        '.sx__list-event'
      ) as HTMLElement
      expect(eventElement).toBeTruthy()

      // Focus the element and press Enter
      eventElement.focus()
      fireEvent.keyDown(eventElement, { key: 'Enter' })

      expect(mockEventModal.setCalendarEvent).toHaveBeenCalledWith(
        event,
        expect.any(Object)
      )
      expect(mockEventModal.calendarEventElement.value).toBe(eventElement)
    })

    it('should open modal through focus and press Space', async () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])

      // Mock the event modal plugin
      const mockEventModal = stubInterface<EventModalPlugin>()
      mockEventModal.setCalendarEvent =
        vi.fn() as unknown as typeof mockEventModal.setCalendarEvent
      mockEventModal.calendarEventElement = signal(null)
      $app.config.plugins.eventModal = mockEventModal

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventElement = document.querySelector(
        '.sx__list-event'
      ) as HTMLElement
      expect(eventElement).toBeTruthy()

      // Focus the element and press Space
      eventElement.focus()
      fireEvent.keyDown(eventElement, { key: ' ' })

      expect(mockEventModal.setCalendarEvent).toHaveBeenCalledWith(
        event,
        expect.any(Object)
      )
      expect(mockEventModal.calendarEventElement.value).toBe(eventElement)
    })
  })

  describe('additional classes', () => {
    it('should add additional classes to list events', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]'),
        {
          _options: {
            additionalClasses: ['custom-class', 'another-class'],
          },
        }
      )
      const { $app } = setup([event])

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventElement = document.querySelector('.sx__list-event')
      expect(eventElement).toBeTruthy()
      expect(eventElement?.classList.contains('custom-class')).toBe(true)
      expect(eventElement?.classList.contains('another-class')).toBe(true)
    })
  })

  describe('custom component: listEvent', () => {
    it('should call the custom component function with calendarEvent and eventInstanceInfo', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      const customComponentFn = vi.fn()
      $app.config._customComponentFns.listEvent = customComponentFn

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(customComponentFn).toHaveBeenCalledTimes(1)
      const call = customComponentFn.mock.calls[0]
      const el = call[0]
      const props = call[1]
      expect(el).toBeInstanceOf(HTMLDivElement)
      expect(props.calendarEvent.id).toBe('1')
      expect(props.calendarEvent.title).toBe('Test Event')
      expect(props.eventInstanceInfo.isFirstDay).toBe(true)
      expect(props.eventInstanceInfo.isLastDay).toBe(true)
      expect(props.eventInstanceInfo.isMultiDay).toBe(false)
      expect(props.eventInstanceInfo.forDayOf).toBe('2023-10-07')
      expect(typeof props.eventInstanceInfo.startLocaleString).toBe('string')
      expect(typeof props.eventInstanceInfo.endLocaleString).toBe('string')
    })

    it('should not render default markup when custom component is set', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      $app.config._customComponentFns.listEvent = vi.fn()

      render(<ListWrapper $app={$app} id="test-list" />)

      const eventEl = document.querySelector('.sx__list-event')
      expect(eventEl).toBeTruthy()
      expect(eventEl?.querySelector('.sx__list-event-color-line')).toBeFalsy()
      expect(eventEl?.querySelector('.sx__list-event-content')).toBeFalsy()
    })

    it('should provide correct eventInstanceInfo for multi-day event', () => {
      const event = createMultiDayEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-09T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      const customComponentFn = vi.fn()
      $app.config._customComponentFns.listEvent = customComponentFn

      render(<ListWrapper $app={$app} id="test-list" />)

      // Should be called 3 times (3 days)
      expect(customComponentFn).toHaveBeenCalledTimes(3)

      // First day
      const firstDayProps = customComponentFn.mock.calls[0][1]
      expect(firstDayProps.eventInstanceInfo.isFirstDay).toBe(true)
      expect(firstDayProps.eventInstanceInfo.isLastDay).toBe(false)
      expect(firstDayProps.eventInstanceInfo.isMultiDay).toBe(true)
      expect(firstDayProps.eventInstanceInfo.forDayOf).toBe('2023-10-07')

      // Middle day
      const middleDayProps = customComponentFn.mock.calls[1][1]
      expect(middleDayProps.eventInstanceInfo.isFirstDay).toBe(false)
      expect(middleDayProps.eventInstanceInfo.isLastDay).toBe(false)
      expect(middleDayProps.eventInstanceInfo.isMultiDay).toBe(true)
      expect(middleDayProps.eventInstanceInfo.forDayOf).toBe('2023-10-08')

      // Last day
      const lastDayProps = customComponentFn.mock.calls[2][1]
      expect(lastDayProps.eventInstanceInfo.isFirstDay).toBe(false)
      expect(lastDayProps.eventInstanceInfo.isLastDay).toBe(true)
      expect(lastDayProps.eventInstanceInfo.isMultiDay).toBe(true)
      expect(lastDayProps.eventInstanceInfo.forDayOf).toBe('2023-10-09')
    })
  })

  describe('custom component: listDayHeader', () => {
    it('should call the custom component function with date info', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      const customComponentFn = vi.fn()
      $app.config._customComponentFns.listDayHeader = customComponentFn

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(customComponentFn).toHaveBeenCalledTimes(1)
      const call = customComponentFn.mock.calls[0]
      expect(call[0]).toBeInstanceOf(HTMLDivElement)
      expect(call[1].date).toBe('2023-10-07')
      expect(call[1].jsDate).toBeInstanceOf(Date)
    })

    it('should not render default day header markup', () => {
      const event = createCalendarEvent(
        Temporal.ZonedDateTime.from('2023-10-07T10:00:00+02:00[Europe/Paris]'),
        Temporal.ZonedDateTime.from('2023-10-07T11:00:00+02:00[Europe/Paris]')
      )
      const { $app } = setup([event])
      $app.config._customComponentFns.listDayHeader = vi.fn()

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(
        document.querySelector('.sx__list-day-header .sx__list-day-date')
      ).toBeFalsy()
    })
  })

  describe('custom component: listNoEvents', () => {
    it('should call the custom component function when no events', () => {
      const { $app } = setup([])
      const customComponentFn = vi.fn()
      $app.config._customComponentFns.listNoEvents = customComponentFn

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(customComponentFn).toHaveBeenCalled()
      const call = customComponentFn.mock.calls[0]
      expect(call[0]).toBeInstanceOf(HTMLDivElement)
    })

    it('should not render default no events text', () => {
      const { $app } = setup([])
      $app.config._customComponentFns.listNoEvents = vi.fn()

      render(<ListWrapper $app={$app} id="test-list" />)

      expect(screen.queryByText('No events')).toBeFalsy()
    })
  })
})
