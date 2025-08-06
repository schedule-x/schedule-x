import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  mockFn,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import DatePickerApp from '../date-picker.app'
import { createAppSingleton } from '../factory'
import { DatePickerListeners } from '@schedule-x/shared/src/interfaces/date-picker/listeners.interface'

const createApp = (
  initialSelectedDate?: Temporal.PlainDate,
  listeners?: DatePickerListeners
) => {
  const underTest = DatePickerApp
  const $app = createAppSingleton({
    selectedDate: initialSelectedDate,
    listeners: listeners || {},
  })
  const el = document.createElement('div')
  const app = new underTest($app)
  app.render(el)
  return app
}

describe('date picker app', () => {
  it('should be able to retrieve date picker value', () => {
    const expectedInitialValue = Temporal.PlainDate.from('2020-01-01')
    const app = createApp(expectedInitialValue)

    expect(app.value).toEqual(expectedInitialValue)
  })

  it('should be able to set date picker value', () => {
    const expectedInitialValue = Temporal.PlainDate.from('2020-01-01')
    const app = createApp(expectedInitialValue)

    const expectedNewValue = Temporal.PlainDate.from('2020-01-02')
    app.value = expectedNewValue

    expect(app.value).toEqual(expectedNewValue)
  })

  it('should call on change callback when value changes', () => {
    const onChangeSpy = mockFn()
    const app = createApp(undefined, { onChange: onChangeSpy })

    const expectedNewValue = Temporal.PlainDate.from('1999-12-31')
    expect(onChangeSpy).not.toHaveBeenCalledWith(expectedNewValue)
    app.value = expectedNewValue

    expect(onChangeSpy).toHaveBeenCalledWith(expectedNewValue)
  })

  it('should get theme', () => {
    const app = createApp()

    expect(app.getTheme()).toBe('light')
  })

  it('should set theme', () => {
    const app = createApp()

    expect(app.getTheme()).toBe('light')
    app.setTheme('dark')
    expect(app.getTheme()).toBe('dark')
  })

  it('should set & get disabled', () => {
    const app = createApp()

    expect(app.disabled).toBe(false)
    app.disabled = true
    expect(app.disabled).toBe(true)
  })
})
