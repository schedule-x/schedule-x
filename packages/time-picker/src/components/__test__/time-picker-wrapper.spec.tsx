import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { TimePickerAppContext } from '../../types/time-picker-app.context'
import { cleanup, render } from '@testing-library/preact'
import TimePickerWrapper from '../time-picker-wrapper'
import { stubInterface } from 'ts-sinon'
import { computed, signal } from '@preact/signals'
import { afterEach } from 'vitest'

const renderComponent = ($app: TimePickerAppContext) => {
  return render(<TimePickerWrapper $app={$app} />)
}

const WRAPPER_CLASS = 'sx__time-picker-wrapper'

const setDefaultApp = ($app: TimePickerAppContext) => {
  $app.config = {
    ...$app.config,
    dark: signal(true),
    teleportTo: signal(null),
    label: signal('Time'),
    is12Hour: signal(false),
    name: signal('time'),
  }
  $app.timePickerState = {
    ...$app.timePickerState,
    isOpen: signal(false),
    currentTime: signal(''),
    currentTimeDisplayedValue: computed(() => ''),
    isAM: signal(true),
  }
}

describe('TimePickerWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when in dark mode', () => {
    it('should have the dark class', () => {
      const $app = stubInterface<TimePickerAppContext>()
      setDefaultApp($app)

      renderComponent($app)

      const wrapperEl = document.querySelector(`.${WRAPPER_CLASS}`)
      if (!(wrapperEl instanceof HTMLElement))
        throw new Error('Could not find the wrapper element')
      expect(wrapperEl.classList.contains('is-dark')).toBe(true)
    })
  })

  describe('when not in dark mode', () => {
    it('should not have the dark class', () => {
      const $app = stubInterface<TimePickerAppContext>()
      setDefaultApp($app)
      $app.config.dark.value = false

      renderComponent($app)

      const wrapperEl = document.querySelector(`.${WRAPPER_CLASS}`)
      if (!(wrapperEl instanceof HTMLElement))
        throw new Error('Could not find the wrapper element')
      expect(wrapperEl.classList.contains('is-dark')).toBe(false)
    })
  })
})
