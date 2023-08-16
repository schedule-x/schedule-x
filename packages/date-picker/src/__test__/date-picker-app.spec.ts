import {
  describe,
  it,
  expect,
  beforeEach,
  mockFn,
} from '../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import DatePickerApp from '../date-picker.app'
import { createElement, render } from 'preact'
import { createAppSingleton } from '../factory'

const createApp = (initialSelectedDate?: string) => {
  const underTest = DatePickerApp
  const $app = createAppSingleton({
    selectedDate: initialSelectedDate,
  })
  const el = document.createElement('div')
  const app = new underTest($app, el)
  app.bootstrap()
  return app
}

describe('date picker app', () => {
  beforeEach(() => {
    vi.mock('preact', () => {
      return {
        createContext: mockFn(),
        render: mockFn(),
        createElement: mockFn(),
      }
    })
  })

  it('should render the app', () => {
    createApp()

    expect(render).toHaveBeenCalled()
    expect(createElement).toHaveBeenCalled()
  })

  it('should be able to retrieve date picker value', () => {
    const expectedInitialValue = '2020-01-01'
    const app = createApp(expectedInitialValue)

    expect(app.value).toBe(expectedInitialValue)
  })

  it('should be able to set date picker value', () => {
    const expectedInitialValue = '2020-01-01'
    const app = createApp(expectedInitialValue)

    const expectedNewValue = '2020-01-02'
    app.value = expectedNewValue

    expect(app.value).toBe(expectedNewValue)
  })
})
