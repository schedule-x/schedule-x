import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { afterEach, beforeEach } from 'vitest'
import { getEventByText, renderComponent } from './utils'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

describe('styles of DateGridEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('events with no overflow', () => {
    const selectedDate = '2024-10-01'
    const oneDayEventId = 'my-event-id'
    const oneDayEventTitle = 'My event'
    const threeDayEventId = 'my-event-id-2'
    const threeDayEventTitle = 'My event 2'

    const $app = __createAppWithViews__({
      selectedDate: selectedDate,
      events: [
        {
          id: oneDayEventId,
          title: oneDayEventTitle,
          start: selectedDate,
          end: selectedDate,
        },
        {
          id: threeDayEventId,
          title: threeDayEventTitle,
          start: selectedDate,
          end: '2024-10-03',
        },
      ],
    })

    it('should have 100% width minus 2px', () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(oneDayEvent.style.width).toBe('calc(100% - 2px)')
    })

    it('should have 300% width minus 2px', () => {
      renderComponent($app, threeDayEventId, 3)
      const oneDayEvent = getEventByText(threeDayEventTitle)

      expect(oneDayEvent.style.width).toBe('calc(300% - 2px)')
    })

    it('should not define any border radius', () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(oneDayEvent.style.borderTopLeftRadius).toBe('')
      expect(oneDayEvent.style.borderBottomLeftRadius).toBe('')
      expect(oneDayEvent.style.borderTopRightRadius).toBe('')
      expect(oneDayEvent.style.borderBottomRightRadius).toBe('')
    })
  })

  describe('events with overflow in ltr direction', () => {
    const selectedDate = '2024-10-01'

    const eventWithOverflowLeftId = 'my-event-id'
    const eventWithOverflowLeftTitle = 'My event'
    const eventWithOverflowBothId = 'my-event-id-2'
    const eventWithOverflowBothTitle = 'My event 2'

    const $app = __createAppWithViews__({
      selectedDate: selectedDate,
      events: [
        {
          id: eventWithOverflowLeftId,
          title: eventWithOverflowLeftTitle,
          start: '2024-09-28',
          end: selectedDate,
        },
        {
          id: eventWithOverflowBothId,
          title: eventWithOverflowBothTitle,
          start: '2024-09-28',
          end: '2024-10-07',
        },
      ],
    })

    it('should subtract 10px extra from width to make room for overflow indicator', () => {
      renderComponent($app, eventWithOverflowLeftId, 2)
      const event = getEventByText(eventWithOverflowLeftTitle)

      expect(event.style.width).toBe('calc(200% - 12px)')
      expect(
        event.classList.contains('sx__date-grid-event--overflow-left')
      ).toBe(true)
      expect(
        event.classList.contains('sx__date-grid-event--overflow-right')
      ).toBe(false)
    })

    it('should subtract 20px extra from width to make room for overflow indicators', () => {
      renderComponent($app, eventWithOverflowBothId, 7)
      const event = getEventByText(eventWithOverflowBothTitle)

      expect(event.style.width).toBe('calc(700% - 22px)')
      expect(
        event.classList.contains('sx__date-grid-event--overflow-right')
      ).toBe(true)
      expect(
        event.classList.contains('sx__date-grid-event--overflow-left')
      ).toBe(true)
    })

    it('should have 0 border radius on left side', () => {
      renderComponent($app, eventWithOverflowLeftId, 2)
      const event = getEventByText(eventWithOverflowLeftTitle)

      expect(event.style.borderTopLeftRadius).toBe('0px')
      expect(event.style.borderBottomLeftRadius).toBe('0px')

      expect(event.style.borderTopRightRadius).toBe('')
      expect(event.style.borderBottomRightRadius).toBe('')
    })

    it('should have 0 border radius on all sides', () => {
      renderComponent($app, eventWithOverflowBothId, 7)
      const event = getEventByText(eventWithOverflowBothTitle)

      expect(event.style.borderTopLeftRadius).toBe('0px')
      expect(event.style.borderBottomLeftRadius).toBe('0px')
      expect(event.style.borderTopRightRadius).toBe('0px')
      expect(event.style.borderBottomRightRadius).toBe('0px')
    })
  })

  describe('events with overflow in rtl direction', () => {
    document.documentElement.setAttribute('dir', 'rtl')
    beforeEach(() => {
      document.documentElement.setAttribute('dir', 'rtl')
    })

    const selectedDate = '2025-04-03'

    const eventWithOverflowLeftId = 'my-event-id'
    const eventWithOverflowLeftTitle = 'My event'
    const eventWithOverflowBothId = 'my-event-id-2'
    const eventWithOverflowBothTitle = 'My event 2'

    const $app = __createAppWithViews__({
      selectedDate: selectedDate,
      events: [
        {
          id: eventWithOverflowLeftId,
          title: eventWithOverflowLeftTitle,
          start: '2025-04-06',
          end: '2025-04-07',
        },
        {
          id: eventWithOverflowBothId,
          title: eventWithOverflowBothTitle,
          start: '2025-03-20',
          end: '2025-04-08',
        },
      ],
    })

    it('should subtract 10px extra from width to make room for overflow indicator, and add class for event that goes beyond week', () => {
      renderComponent($app, eventWithOverflowLeftId, 2)
      const event = getEventByText(eventWithOverflowLeftTitle)

      expect(event.style.width).toBe('calc(200% - 12px)')
      expect(
        event.classList.contains('sx__date-grid-event--overflow-left')
      ).toBe(true)
      expect(
        event.classList.contains('sx__date-grid-event--overflow-right')
      ).toBe(false)
    })

    it('should subtract 20px extra from width to make room for overflow indicators', () => {
      renderComponent($app, eventWithOverflowBothId, 7)
      const event = getEventByText(eventWithOverflowBothTitle)

      expect(event.style.width).toBe('calc(700% - 22px)')
      expect(
        event.classList.contains('sx__date-grid-event--overflow-left')
      ).toBe(true)
      expect(
        event.classList.contains('sx__date-grid-event--overflow-right')
      ).toBe(true)
    })
  })

  describe('rendering with an animation when the event was just added', () => {
    it('should have the is-event-new class', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Test Event',
            start: '1999-03-12 14:45',
            end: '1999-03-12 15:45',
          },
        ],
      })

      const calendarEventInternal = $app.calendarEvents.list.value[0]
      calendarEventInternal._createdAt = new Date()
      renderComponent($app, '123', 7)

      expect(
        document.querySelector('.sx__date-grid-event')?.classList
      ).toContain('is-event-new')
    })

    it('should not have the is-event-new class', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Test Event',
            start: '1999-03-12 14:45',
            end: '1999-03-12 15:45',
          },
        ],
      })

      renderComponent($app, '123', 7)

      expect(
        document.querySelector('.sx__date-grid-event')?.classList
      ).not.toContain('is-event-new')
    })
  })
})
