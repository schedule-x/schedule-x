import { describe } from 'vitest'
import {
  createAppSingleton,
  createDatePicker,
  createDatePickerInternal,
} from '../factory'
import {
  expect,
  it,
} from '../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { ConfigBuilder } from '../utils/stateful/config/config.builder'
import DatePickerApp from '../date-picker.app'

describe('date picker factory', () => {
  it('should create an instance of DatePickerApp', () => {
    const underTest = createDatePicker
    const config = new ConfigBuilder()
      .withFirstDayOfWeek(0)
      .withLocale('en')
      .withMin('2020-01-01')
      .withMax('2020-12-31')
      .build()

    const app = underTest(document.createElement('div'), config)
    expect(app).toBeInstanceOf(DatePickerApp)
  })

  it('should create an instance of DatePickerApp with the default locale', () => {
    const underTest = createDatePicker
    const config = new ConfigBuilder().withFirstDayOfWeek(0).build()

    const app = underTest(document.createElement('div'), config)
    expect(app).toBeInstanceOf(DatePickerApp)
  })

  it('should create an instance of an internal date picker app used in another component', () => {
    const underTest = createDatePickerInternal
    const $app = createAppSingleton()

    const app = underTest($app, document.createElement('div'))

    expect(app).toBeInstanceOf(DatePickerApp)
  })
})
