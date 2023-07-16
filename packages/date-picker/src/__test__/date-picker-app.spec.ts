import {
  describe,
  it,
  expect,
  beforeEach,
  mockFn,
} from '../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import DatePickerApp from '../date-picker.app'
import { __createDatePickerAppSingleton__ } from '../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { createElement, render } from 'preact'

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
    const underTest = DatePickerApp
    const $app = __createDatePickerAppSingleton__()
    const el = document.createElement('div')
    const app = new underTest($app, el)
    app.bootstrap()

    expect(render).toHaveBeenCalled()
    expect(createElement).toHaveBeenCalled()
  })
})
