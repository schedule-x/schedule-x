import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from '../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render } from '@testing-library/preact'
import AppWrapper from '../../app-wrapper'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { getAppWrapper } from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker wrapper', () => {
  let $app: DatePickerAppSingleton | undefined

  beforeEach(() => {
    $app = undefined
    $app = createAppSingleton()
  })

  afterEach(() => {
    cleanup()
  })

  it('should not have "is-dark" class on wrapper', () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('is-dark')).toBe(false)
  })

  it('should have "is-dark" class on wrapper', () => {
    $app = createAppSingleton({ style: { dark: true } })
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('is-dark')).toBe(true)
  })

  it('should not have "has-full-width" class on wrapper', () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('has-full-width')).toBe(false)
  })

  it('should have "has-full-width" class on wrapper', () => {
    $app = createAppSingleton({ style: { fullWidth: true } })
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('has-full-width')).toBe(true)
  })
})
