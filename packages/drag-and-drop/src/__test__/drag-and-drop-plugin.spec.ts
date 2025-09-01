import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDragAndDropPlugin } from '../drag-and-drop-plugin.impl'
import { vi } from 'vitest'
import 'temporal-polyfill/global'

describe('The drag and drop plugin', () => {
  describe('Constructor and minutesPerInterval validation', () => {
    it('should use default value of 15 minutes when no parameter is provided', () => {
      const plugin = createDragAndDropPlugin()

      // Test that the plugin is created without any console warnings
      expect(plugin).toBeDefined()
      expect(plugin.name).toBe('dragAndDrop')
    })

    it('should accept valid minutesPerInterval values without warnings', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const plugin30 = createDragAndDropPlugin(30)
      const plugin60 = createDragAndDropPlugin(60)

      expect(plugin30).toBeDefined()
      expect(plugin60).toBeDefined()
      expect(consoleSpy).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should clamp values below 5 minutes to 5 minutes', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const plugin = createDragAndDropPlugin(3)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Schedule-X warning]: Drag and drop plugin Interval must be at least 5 minutes. Setting to 5 minutes.'
      )
      expect(plugin).toBeDefined()

      consoleSpy.mockRestore()
    })

    it('should clamp values above 60 minutes to 60 minutes', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const plugin = createDragAndDropPlugin(90)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Schedule-X warning]: Drag and drop plugin Interval cannot exceed 60 minutes. Setting to 60 minutes.'
      )
      expect(plugin).toBeDefined()

      consoleSpy.mockRestore()
    })

    it('should handle edge case of exactly 5 minutes', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const plugin = createDragAndDropPlugin(5)

      expect(plugin).toBeDefined()
      expect(consoleSpy).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should handle edge case of exactly 60 minutes', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const plugin = createDragAndDropPlugin(60)

      expect(plugin).toBeDefined()
      expect(consoleSpy).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should handle zero and negative values by clamping to 5 minutes', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const pluginZero = createDragAndDropPlugin(0)
      const pluginNegative = createDragAndDropPlugin(-10)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Schedule-X warning]: Drag and drop plugin Interval must be at least 5 minutes. Setting to 5 minutes.'
      )
      expect(pluginZero).toBeDefined()
      expect(pluginNegative).toBeDefined()

      consoleSpy.mockRestore()
    })
  })

  describe('setInterval method', () => {
    it('should update minutesPerInterval with valid values', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const plugin = createDragAndDropPlugin(15)
      plugin.setInterval(30)

      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should validate and clamp values when using setInterval', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const plugin = createDragAndDropPlugin(15)

      plugin.setInterval(3)
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Schedule-X warning]: Drag and drop plugin Interval must be at least 5 minutes. Setting to 5 minutes.'
      )

      plugin.setInterval(90)
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Schedule-X warning]: Drag and drop plugin Interval cannot exceed 60 minutes. Setting to 60 minutes.'
      )

      consoleSpy.mockRestore()
    })
  })
})
