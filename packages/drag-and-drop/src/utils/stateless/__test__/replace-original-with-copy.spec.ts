import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { replaceOriginalWithCopy } from '../replace-original-with-copy'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { vi } from 'vitest'

describe('replacing original event with copy', () => {
  describe('the list of events after having replaced the original event with the copy', () => {
    let $app: CalendarAppSingleton, eventCopy: CalendarEventInternal

    beforeEach(() => {
      $app = __createAppWithViews__({
        events: [
          { id: 1, start: '2010-10-10', end: '2010-10-10' },
          { id: 2, start: '2010-10-10', end: '2010-10-10' },
          { id: 3, start: '2010-10-10', end: '2010-10-10' },
        ],
      })
      eventCopy = deepCloneEvent(
        $app.calendarEvents.list.value.find(
          (event) => event.id === 2
        ) as CalendarEventInternal,
        $app
      )
    })

    it('should contain the copy of the original event', () => {
      replaceOriginalWithCopy($app, eventCopy)

      expect($app.calendarEvents.list.value).toContain(eventCopy)
    })

    it('should not contain the original event', () => {
      const originalEvent = $app.calendarEvents.list.value.find(
        (event) => event.id === eventCopy.id
      ) as CalendarEventInternal
      replaceOriginalWithCopy($app, eventCopy)

      expect($app.calendarEvents.list.value).not.toContain(originalEvent)
    })
  })

  describe('invoking listener for event update', () => {
    const onEventUpdateSpy = vi.fn()
    const $app = __createAppWithViews__({
      callbacks: {
        onEventUpdate: onEventUpdateSpy,
      },
      events: [{ id: 1, start: '2010-10-10', end: '2010-10-10' }],
    })
    const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)

    it('should invoke the listener with the copy of the original event', () => {
      replaceOriginalWithCopy($app, eventCopy)

      expect(onEventUpdateSpy).toHaveBeenCalledWith(
        eventCopy._getExternalEvent()
      )
    })
  })
})
