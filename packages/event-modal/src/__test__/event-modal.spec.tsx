import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import EventModal from '../event-modal'
import { getDescriptionEl, getLocationEl, getPeopleEl, setup } from './utils'
import { beforeEach, vi } from 'vitest'
import { createEventModalPlugin } from '../event-modal-plugin.impl'
import { stubInterface } from 'ts-sinon'
import { CalendarEventInternal } from '@schedule-x/shared/src'

describe('EventModal', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('displaying info about the event', () => {
    it('should display event title', () => {
      const { $app, calendarEvent } = setup()
      render(<EventModal $app={$app} />)

      expect(screen.queryByText(calendarEvent.title as string)).toBeTruthy()
    })

    it('should display event time', () => {
      const { $app } = setup()
      render(<EventModal $app={$app} />)

      expect(
        screen.queryByText('October 7, 2023 – October 8, 2023' as string)
      ).toBeTruthy()
    })

    it('should not display any event location', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.location = undefined
      render(<EventModal $app={$app} />)

      expect(getLocationEl()).toBeFalsy()
    })

    it('should display event location', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.location = 'Test Location'
      render(<EventModal $app={$app} />)

      expect(getLocationEl()).toBeTruthy()
      expect(screen.queryByText(calendarEvent.location as string)).toBeTruthy()
    })

    it('should not display any people participating in the event', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.people = undefined
      render(<EventModal $app={$app} />)

      expect(getPeopleEl()).toBeFalsy()
    })

    it('should display people participating in the event', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.people = ['John Doe', 'Jane Doe']
      render(<EventModal $app={$app} />)

      expect(getPeopleEl()).toBeTruthy()
      expect(screen.queryByText('John Doe & Jane Doe' as string)).toBeTruthy()
    })

    it('should not display any event description', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.description = undefined
      render(<EventModal $app={$app} />)

      expect(getDescriptionEl()).toBeFalsy()
    })

    it('should display event description', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.description = 'Test Description'
      render(<EventModal $app={$app} />)

      expect(getDescriptionEl()).toBeTruthy()
      expect(
        screen.queryByText(calendarEvent.description as string)
      ).toBeTruthy()
    })
  })

  describe('Displaying a custom component', () => {
    it('should call the customComponentFn', () => {
      const customComponentFn = vi.fn()
      const { $app } = setup(customComponentFn)
      render(<EventModal $app={$app} />)

      expect(customComponentFn).toHaveBeenCalledOnce()
    })

    it('should not display any default content', () => {
      const customComponentFn = vi.fn()
      const { $app, calendarEvent } = setup(customComponentFn)
      render(<EventModal $app={$app} />)

      expect(screen.queryByText(calendarEvent.title as string)).toBeFalsy()
      expect(
        screen.queryByText('October 7, 2023 – October 8, 2023' as string)
      ).toBeFalsy()
      expect(getLocationEl()).toBeFalsy()
      expect(getPeopleEl()).toBeFalsy()
      expect(getDescriptionEl()).toBeFalsy()
    })
  })

  describe('Repositioning when the modal size changes', () => {
    const appDOMRect = new DOMRect(0, 0, 1200, 800)
    const eventDOMRect = new DOMRect(100, 700, 200, 50)

    const stubResizeObserver = () => {
      const observed: Element[] = []
      let callback: ResizeObserverCallback = () => {}
      const disconnect = vi.fn()
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(cb: ResizeObserverCallback) {
            callback = cb
          }
          observe(el: Element) {
            observed.push(el)
          }
          unobserve() {}
          disconnect = disconnect
        }
      )
      return {
        observed,
        disconnect,
        resize: () => callback([], {} as ResizeObserver),
      }
    }

    const setupWithRects = () => {
      const { $app } = setup(vi.fn())
      $app.elements.calendarWrapper!.getBoundingClientRect = () => appDOMRect
      $app.config.plugins.eventModal!.calendarEventDOMRect.value = eventDOMRect
      const modalEl = $app.elements.calendarWrapper!.querySelector(
        '.sx__event-modal'
      ) as HTMLElement
      return { $app, modalEl }
    }

    it('should observe the modal element', () => {
      const { observed } = stubResizeObserver()
      const { $app, modalEl } = setupWithRects()

      render(<EventModal $app={$app} />)

      expect(observed).toEqual([modalEl])
      vi.unstubAllGlobals()
    })

    it('should anchor upwards once the real height of a custom modal is known', () => {
      const { resize } = stubResizeObserver()
      const { $app, modalEl } = setupWithRects()
      render(<EventModal $app={$app} />)

      // the custom content renders later and gives the modal its real height
      Object.defineProperty(modalEl, 'clientHeight', { value: 300 })
      resize()

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe(`${eventDOMRect.bottom - 300}px`)
      vi.unstubAllGlobals()
    })

    it('should disconnect the observer when the modal unmounts', () => {
      const { disconnect } = stubResizeObserver()
      const { $app } = setupWithRects()
      const { unmount } = render(<EventModal $app={$app} />)

      unmount()

      expect(disconnect).toHaveBeenCalledOnce()
      vi.unstubAllGlobals()
    })
  })

  describe('Closing the modal', () => {
    it('should reset calendar event and its dom react', () => {
      const modalPlugin = createEventModalPlugin()

      modalPlugin.calendarEvent.value = stubInterface<CalendarEventInternal>()
      modalPlugin.calendarEventDOMRect.value = new DOMRect()

      modalPlugin.close()

      expect(modalPlugin.calendarEvent.value).toBeNull()
      expect(modalPlugin.calendarEventDOMRect.value).toBeNull()
    })
  })
})
