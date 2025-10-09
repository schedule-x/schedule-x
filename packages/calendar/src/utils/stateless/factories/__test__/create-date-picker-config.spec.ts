import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerConfig } from '../create-date-picker-config'
import { vi } from 'vitest'
import { createViewWeek } from '../../../../views/week'

describe('creating the date picker config', () => {
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
  })
})
