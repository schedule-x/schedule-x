import { describe } from 'vitest'
import { createDatePicker, createDatePickerInternal } from '../factory'
import {
  expect,
  it,
} from '../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { ConfigBuilder } from '../utils/stateful/config/config.builder'
import DatePickerApp from '../date-picker.app'
import { __createDatePickerAppSingleton__ } from '../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

describe('date picker factory', () => {
  it('should create an instance of DatePickerApp', () => {
    const underTest = createDatePicker
    const config = new ConfigBuilder()
      .withFirstDayOfWeek(0)
      .withLocale('en')
      .withMin('2020-01-01')
      .withMax('2020-12-31')
      .build()

    const app = underTest(config, document.createElement('div'))
    expect(app).toBeInstanceOf(DatePickerApp)
  })

  it('should create an instance of DatePickerApp with the default locale', () => {
    const underTest = createDatePicker
    const config = new ConfigBuilder().withFirstDayOfWeek(0).build()

    const app = underTest(config, document.createElement('div'))
    expect(app).toBeInstanceOf(DatePickerApp)
  })

  it('should create an instance of an internal date picker app used in another component', () => {
    const underTest = createDatePickerInternal
    const $app = __createDatePickerAppSingleton__()

    const app = underTest($app, document.createElement('div'))

    expect(app).toBeInstanceOf(DatePickerApp)
  })
})
