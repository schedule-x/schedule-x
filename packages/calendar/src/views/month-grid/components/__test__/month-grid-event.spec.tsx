import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { AppContext } from '../../../../utils/stateful/app-context'
import MonthGridEvent from '../month-grid-event'
import { render } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { beforeEach, vi } from 'vitest'

const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthGridEvent
        calendarEvent={calendarEvent}
        gridRow={0}
        date={'2020-01-01'}
      />
    </AppContext.Provider>
  )
}

describe('MonthGridEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  describe('render', () => {
    it('should have a data-event-id attribute', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('[data-event-id]')?.getAttribute('data-event-id')
      ).toBe('1234')
    })
  })

  describe('starting a drag action', () => {
    it.each([
      ['mousedown', false],
      ['touchstart', true],
    ])('should start a drag action on %s', (uiEvent, isTouchEvent) => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
      })
      $app.config = {
        ...$app.config,
        plugins: {
          ...$app.config.plugins,
          dragAndDrop: stubInterface<DragAndDropPlugin>(),
        },
      }
      $app.config.plugins.dragAndDrop!.createMonthGridDragHandler = vi.fn()
      const { container } = renderComponent(
        $app,
        $app.calendarEvents.list.value[0]
      )
      const eventEl = container.querySelector('.sx__event') as HTMLElement

      const mouseEvent = isTouchEvent
        ? new TouchEvent(uiEvent)
        : new MouseEvent(uiEvent)
      const preventDefaultSpy = vi.spyOn(mouseEvent, 'preventDefault')
      eventEl.dispatchEvent(mouseEvent)
      const createDragHandlerSpy = vi.spyOn(
        $app.config.plugins.dragAndDrop!,
        'createMonthGridDragHandler'
      )
      vi.runAllTimers()

      if (isTouchEvent) {
        expect(preventDefaultSpy).toHaveBeenCalled()
      } else {
        expect(preventDefaultSpy).not.toHaveBeenCalled()
      }
      expect(createDragHandlerSpy).toHaveBeenCalledWith(
        $app.calendarEvents.list.value[0],
        $app
      )
    })
  })
})
