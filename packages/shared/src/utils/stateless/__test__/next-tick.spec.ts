import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { nextTick } from '../next-tick'
import { vi } from 'vitest'

describe('nextTick', () => {
  it('should push a callback to the next tick', () => {
    const callback = vi.fn()
    nextTick(callback)
    expect(callback).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(callback).toHaveBeenCalled()
    }, 0)
  })
})
