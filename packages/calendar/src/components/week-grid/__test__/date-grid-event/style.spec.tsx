import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
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
    })

    it('should subtract 20px extra from width to make room for overflow indicators', () => {
      renderComponent($app, eventWithOverflowBothId, 7)
      const event = getEventByText(eventWithOverflowBothTitle)

      expect(event.style.width).toBe('calc(700% - 22px)')
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
})
