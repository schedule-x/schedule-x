import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createResizePlugin } from '../resize.plugin'
import { vi } from 'vitest'

describe('The resize plugin', () => {
  describe('Trying to use it before being initialized', () => {
    it('should log an error', () => {
      const plugin = createResizePlugin()
      const consoleSpy = vi.spyOn(console, 'error')

      plugin.createDateGridEventResizer(
        expect.any(Object),
        expect.any(Object),
        expect.any(Object)
      )

      expect(consoleSpy).toHaveBeenCalledWith(
        'The calendar is not yet initialized. Cannot resize events.'
      )
    })
  })
})
