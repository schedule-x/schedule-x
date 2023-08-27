import {
  describe,
  it,
  beforeEach,
  afterEach, expect,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen, cleanup } from '@testing-library/preact'
import AppWrapper from '../../app-wrapper'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import {
  assertIsNotShowingPopup,
  assertIsShowingPopup,
  DATE_PICKER_POPUP_TEST_ID, getAppWrapper,
  renderWithOpenPopup,
} from './utils'
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

  it('should not display popup on render', async () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)

    await assertIsNotShowingPopup()
  })

  it('should display popup on render', async () => {
    renderWithOpenPopup($app)

    await assertIsShowingPopup()
  })

  it('should display popup when datePickerState changes and isOpen is true', async () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    await assertIsNotShowingPopup()
    ;($app as DatePickerAppSingleton).datePickerState.open()

    await assertIsShowingPopup()
  })

  it('should not close popup when click outside popup', async () => {
    renderWithOpenPopup($app)
    await assertIsShowingPopup()

    screen.getByTestId(DATE_PICKER_POPUP_TEST_ID).click()

    await assertIsShowingPopup()
  })

  it('should close popup when click outside popup', async () => {
    renderWithOpenPopup($app)
    await assertIsShowingPopup()

    document.body.click()

    await assertIsNotShowingPopup()
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
})
