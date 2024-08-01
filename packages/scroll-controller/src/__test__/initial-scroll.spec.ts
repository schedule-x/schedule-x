import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createScrollControllerPlugin } from '../scroll-controller.plugin'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { Mock, vi } from 'vitest'
import { cleanup, waitFor } from '@testing-library/preact'

const addGridDayToDOM = (viewContainer: HTMLDivElement) => {
  const gridDay = document.createElement('div')
  gridDay.classList.add('sx__time-grid-day')
  viewContainer.appendChild(gridDay)
}

describe('Scroll controller plugin', () => {
  beforeEach(() => {
    HTMLDivElement.prototype.scroll = vi.fn() as Mock
    cleanup()
  })

  describe('Scrolling on render with regular day boundaries', () => {
    let viewContainer = document.createElement('div')
    viewContainer.classList.add('sx__view-container')
    let calendarWrapper = document.createElement('div')
    let $app = __createAppWithViews__({
      weekOptions: {
        gridHeight: 2400,
      },
    })
    $app.elements.calendarWrapper = calendarWrapper
    calendarWrapper.append(viewContainer)

    beforeEach(() => {
      viewContainer = document.createElement('div')
      viewContainer.classList.add('sx__view-container')
      calendarWrapper = document.createElement('div')
      $app = __createAppWithViews__({
        weekOptions: {
          gridHeight: 2400,
        },
      })
      $app.elements.calendarWrapper = calendarWrapper
      calendarWrapper.append(viewContainer)
    })

    it.each([
      ['07:45', 775],
      ['08:00', 800],
      ['00:00', 0],
    ])(
      'should scroll on render when days already exist',
      (initialScrollConfig, expectedScroll) => {
        const underTest = createScrollControllerPlugin({
          initialScroll: initialScrollConfig,
        })
        const viewContainerScrollSpy = vi.spyOn(viewContainer, 'scroll')
        addGridDayToDOM(viewContainer)

        underTest.init($app)

        expect(viewContainerScrollSpy).toHaveBeenCalledWith(0, expectedScroll)
      }
    )

    it('should scroll on render when days do not exist yet', async () => {
      const underTest = createScrollControllerPlugin({
        initialScroll: '08:00',
      })
      const viewContainerScrollSpy = vi.spyOn(viewContainer, 'scroll')

      underTest.init($app)

      expect(viewContainerScrollSpy).not.toHaveBeenCalled()

      addGridDayToDOM(viewContainer)

      await waitFor(() => {
        expect(viewContainerScrollSpy).toHaveBeenCalledWith(0, 800)
      })
    })
  })

  describe('Scrolling on render with hybrid day boundaries', () => {
    const viewContainer = document.createElement('div')
    viewContainer.classList.add('sx__view-container')
    const calendarWrapper = document.createElement('div')
    const $app = __createAppWithViews__({
      weekOptions: {
        gridHeight: 1200,
      },
      dayBoundaries: {
        start: '21:00',
        end: '09:00',
      },
    })
    $app.elements.calendarWrapper = calendarWrapper
    calendarWrapper.append(viewContainer)

    it.each([
      ['01:00', 400],
      ['21:00', 0],
      ['23:00', 200],
      ['23:30', 250],
    ])(
      'should scroll when the day grid element comes into the DOM',
      (initialScrollConfig, expectedScroll) => {
        const underTest = createScrollControllerPlugin({
          initialScroll: initialScrollConfig,
        })
        const viewContainerScrollSpy = vi.spyOn(viewContainer, 'scroll')
        addGridDayToDOM(viewContainer)

        underTest.init($app)

        expect(viewContainerScrollSpy).toHaveBeenCalledWith(0, expectedScroll)
      }
    )
  })

  describe('Trying to use the plugin before being initialized', () => {
    it('should throw an error', () => {
      const underTest = createScrollControllerPlugin({
        initialScroll: '07:50',
      })

      expect(() => underTest.scrollTo('07:50')).toThrow(
        '[Schedule-X error]: Plugin not yet initialized. You cannot scroll before the calendar is rendered. For configuring the initial scroll, use the `initialScroll` parameter'
      )
    })
  })
})
