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
  initialSelectedDate?: string,
  listeners?: DatePickerListeners
) => {
  const underTest = DatePickerApp
  const $app = createAppSingleton({
    selectedDate: initialSelectedDate,
    listeners: listeners || {},
  })
  const el = document.createElement('div')
  const app = new underTest($app, el)
  app.render()
  return app
}

describe('date picker app', () => {
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

  it('should call on change callback when value changes', () => {
    const onChangeSpy = mockFn()
    const app = createApp(undefined, { onChange: onChangeSpy })

    const expectedNewValue = '1999-12-31'
    expect(onChangeSpy).not.toHaveBeenCalledWith(expectedNewValue)
    app.value = expectedNewValue

    expect(onChangeSpy).toHaveBeenCalledWith(expectedNewValue)
  })
})
