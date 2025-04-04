import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerConfig } from '../create-date-picker-config'
import { vi } from 'vitest'
import { createViewWeek } from '../../../../views/week'

describe('creating the date picker config', () => {
  describe('when the html document has direction ltr', () => {
    it('should place the date picker to the bottom end', () => {
      const dateSelectionCallback = vi.fn()

      const result = createDatePickerConfig(
        {
          views: [createViewWeek()],
        },
        dateSelectionCallback
      )

      expect(result.placement).toBe('bottom-end')
    })
  })

  describe('when the html document has direction rtl', () => {
    it('should place the date picker to the bottom start', () => {
      document.documentElement.setAttribute('dir', 'rtl')

      const result = createDatePickerConfig(
        {
          views: [createViewWeek()],
        },
        vi.fn()
      )

      expect(result.placement).toBe('bottom-start')
    })
  })

  describe('setting an element to teleport date picker popup to', () => {
    it('should teleport the date picker to the document body', () => {
      const dateSelectionCallback = vi.fn()

      const result = createDatePickerConfig(
        {
          views: [createViewWeek()],
          datePicker: {
            teleportTo: document.body,
          },
        },
        dateSelectionCallback
      )

      expect(result.teleportTo).toBe(document.body)
    })

    it('should prioritize teleportTo over document.body default, if direction is rtl', () => {
      document.documentElement.setAttribute('dir', 'rtl')

      const teleportTo = document.createElement('div')
      teleportTo.id = 'teleport-to'

      const result = createDatePickerConfig(
        {
          views: [createViewWeek()],
          datePicker: {
            teleportTo,
          },
        },
        vi.fn()
      )

      expect(result.teleportTo).toBe(teleportTo)
    })

    it('should set teleport to document body if no teleportTo is provided in rtl', () => {
      document.documentElement.setAttribute('dir', 'rtl')

      const result = createDatePickerConfig(
        {
          views: [createViewWeek()],
        },
        vi.fn()
      )

      expect(result.teleportTo).toBe(document.body)
    })
  })
})
