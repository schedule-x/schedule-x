import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { updateDraggedEvent } from '../update-dragged-event'
import { vi } from 'vitest'
import {
  createEventRecurrencePlugin,
  RRValues,
} from '@schedule-x/event-recurrence'
import { createDragAndDropPlugin } from '../../../drag-and-drop-plugin.impl'

describe('Updating a dragged event', () => {
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
      updateDraggedEvent($app, eventCopy, eventCopy.start)

      expect(onEventUpdateSpy).toHaveBeenCalledWith(
        eventCopy._getExternalEvent()
      )
    })
  })

  describe('When updating a recurring event', () => {
    const eventRecurrencePlugin = createEventRecurrencePlugin()
    const onEventUpdateSpy = vi.fn()
    const $app = __createAppWithViews__({
      plugins: [eventRecurrencePlugin, createDragAndDropPlugin()],
      callbacks: {
        onEventUpdate: onEventUpdateSpy,
      },
      events: [
        {
          id: 1,
          start: '2010-10-10',
          end: '2010-10-10',
          rrule: {
            freq: RRValues.DAILY,
            until: '2010-10-11',
          },
        },
      ],
    })
    eventRecurrencePlugin.init($app)
    const spy = vi.spyOn(eventRecurrencePlugin, 'updateRecurrenceDND')
    const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)

    it('should invoke the updateRecurrenceDND method', () => {
      updateDraggedEvent($app, eventCopy, eventCopy.start)

      expect(spy).toHaveBeenCalledWith(
        eventCopy.id,
        eventCopy.start,
        eventCopy.start
      )
    })

    it('should invoke the listener with the copy of the original event', () => {
      expect(onEventUpdateSpy).toHaveBeenCalledWith(
        eventCopy._getExternalEvent()
      )
    })
  })
})
