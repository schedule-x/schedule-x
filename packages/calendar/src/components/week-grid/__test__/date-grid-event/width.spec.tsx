import { describe, expect, it, } from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { afterEach } from 'vitest'
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
      datePicker: {
        selectedDate: selectedDate,
      },
      events: [
        {
          id: oneDayEventId,
          title: oneDayEventTitle,
          time: {
            start: selectedDate,
            end: selectedDate,
          },
        },
        {
          id: threeDayEventId,
          title: threeDayEventTitle,
          time: {
            start: selectedDate,
            end: '2024-10-03',
          },
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
  })

  describe('events with overflow', () => {
    const selectedDate = '2024-10-01'

    const eventWithOverflowLeftId = 'my-event-id'
    const eventWithOverflowLeftTitle = 'My event'
    const eventWithOverflowBothId = 'my-event-id-2'
    const eventWithOverflowBothTitle = 'My event 2'

    const $app = __createAppWithViews__({
      datePicker: {
        selectedDate: selectedDate,
      },
      events: [
        {
          id: eventWithOverflowLeftId,
          title: eventWithOverflowLeftTitle,
          time: {
            start: '2024-09-28',
            end: selectedDate,
          },
        },
        {
          id: eventWithOverflowBothId,
          title: eventWithOverflowBothTitle,
          time: {
            start: '2024-09-28',
            end: '2024-10-07',
          },
        },
      ],
    })

    it('should subtract 10px extra from width to make room for overflow indicator', () => {
      renderComponent($app, eventWithOverflowLeftId, 2)
      const event = getEventByText(eventWithOverflowLeftTitle)

      expect(event.style.width).toBe('calc(200% - 12px)')
    })

    it('should subtract 20px extra from width to make room for overflow indicators', () => {
      renderComponent($app, eventWithOverflowBothId, 7)
      const event = getEventByText(eventWithOverflowBothTitle)

      expect(event.style.width).toBe('calc(700% - 22px)')
    })
  })
})
