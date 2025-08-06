import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { updateDraggedEvent } from '../update-dragged-event'
import { vi } from 'vitest'

describe('Updating a dragged event', () => {
  describe('invoking listener for event update', () => {
    const onEventUpdateSpy = vi.fn()
    const $app = __createAppWithViews__({
      callbacks: {
        onEventUpdate: onEventUpdateSpy,
      },
      events: [{ id: 1, start: Temporal.PlainDate.from('2010-10-10'), end: Temporal.PlainDate.from('2010-10-10') }],
    })
    const eventCopy = deepCloneEvent($app.calendarEvents.list.value[0], $app)

    it('should invoke the listener with the copy of the original event', () => {
      updateDraggedEvent($app, eventCopy, eventCopy.start)

      expect(onEventUpdateSpy).toHaveBeenCalledWith(
        eventCopy._getExternalEvent()
      )
    })
  })
})
