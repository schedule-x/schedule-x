import 'temporal-polyfill/global'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, waitFor } from '@testing-library/preact'
import AppWrapper from '../../app-wrapper'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
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

  it('should update "is-dark" class on wrapper', async () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()
    expect(wrapper.classList.contains('is-dark')).toBe(false)

    $app!.datePickerState.isDark.value = true

    await waitFor(() => {
      expect(wrapper.classList.contains('is-dark')).toBe(true)
    })
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

  it('should not have is-disabled class', () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('is-disabled')).toBe(false)
  })

  it('should have is-disabled class', () => {
    $app = createAppSingleton({ disabled: true })
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    const wrapper = getAppWrapper()

    expect(wrapper.classList.contains('is-disabled')).toBe(true)
  })
})
