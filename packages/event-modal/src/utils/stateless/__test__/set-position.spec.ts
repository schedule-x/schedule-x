/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { setPosition } from '../set-position'

describe('setting position of event modal', () => {
  describe('when there is enough space on the right', () => {
    it('should display modal to the right of event, facing downwards', () => {
      const appDOMRect = {
        x: 16,
        y: 16,
        width: 1688,
        height: 689.796875,
        top: 16,
        right: 1704,
        bottom: 705.796875,
        left: 16,
        toJSON: () => ({}),
      }
      const eventDOMRect = {
        x: 321,
        y: 265.21875,
        width: 227,
        height: 66.65625,
        top: 265.21875,
        right: 548,
        bottom: 331.875,
        left: 321,
        toJSON: () => ({}),
      }

      setPosition(appDOMRect, eventDOMRect)

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe('265.21875px')
      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-left')
      ).toBe('558px')
    })

    it('should display modal to the right of event, facing upwards', () => {
      const appDOMRect = {
        x: 16,
        y: 16,
        width: 1688,
        height: 689.796875,
        top: 16,
        right: 1704,
        bottom: 705.796875,
        left: 16,
        toJSON: () => ({}),
      }
      const eventDOMRect = {
        x: 321,
        y: 615.21875,
        width: 227,
        height: 66.65625,
        top: 615.21875,
        right: 548,
        bottom: 681.875,
        left: 321,
        toJSON: () => ({}),
      }

      setPosition(appDOMRect, eventDOMRect)

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe(eventDOMRect.bottom - 250 + 'px')
      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-left')
      ).toBe('558px')
    })
  })

  describe('when there is not enough space on the right', () => {
    it('should display modal to the left of event, facing downwards', () => {
      const appDOMRect = {
        x: 16,
        y: 16,
        width: 1688,
        height: 689.796875,
        top: 16,
        right: 1704,
        bottom: 705.796875,
        left: 16,
        toJSON: () => ({}),
      }
      const eventDOMRect = {
        x: 1233,
        y: 298.546875,
        width: 227,
        height: 66.65625,
        top: 298.546875,
        right: 1460,
        bottom: 365.203125,
        left: 1233,
        toJSON: () => ({}),
      }

      setPosition(appDOMRect, eventDOMRect)

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe('298.546875px')
      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-left')
      ).toBe(eventDOMRect.left - 410 + 'px')
    })

    it('should display modal to the left of event, facing upwards', () => {
      const appDOMRect = {
        x: 16,
        y: 16,
        width: 1688,
        height: 689.796875,
        top: 16,
        right: 1704,
        bottom: 705.796875,
        left: 16,
        toJSON: () => ({}),
      }
      const eventDOMRect = {
        x: 1233,
        y: 581.875,
        width: 227,
        height: 66.65625,
        top: 581.875,
        right: 1460,
        bottom: 648.53125,
        left: 1233,
        toJSON: () => ({}),
      }

      setPosition(appDOMRect, eventDOMRect)

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe(eventDOMRect.bottom - 250 + 'px')
      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-left')
      ).toBe(eventDOMRect.left - 410 + 'px')
    })
  })

  describe('when there is not enough space on the app top', () => {
    it('should position modal at the top of the app', () => {
      const appDOMRect = {
        x: 16,
        y: 191,
        width: 1688,
        height: 1130.390625,
        top: 191,
        right: 1704,
        bottom: 1321.390625,
        left: 16,
        toJSON: () => ({}),
      }
      const eventDOMRect = {
        x: 553.28125,
        y: 70,
        width: 229.140625,
        height: 100,
        top: 70,
        right: 782.421875,
        bottom: 170,
        left: 553.28125,
        toJSON: () => ({}),
      }

      setPosition(appDOMRect, eventDOMRect)

      expect(
        document.documentElement.style.getPropertyValue('--sx-event-modal-top')
      ).toBe(appDOMRect.top + 'px')
    })
  })
})
