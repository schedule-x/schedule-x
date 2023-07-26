import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen, waitFor, cleanup } from '@testing-library/preact'
import AppWrapper from '../app-wrapper'
import DatePickerAppSingleton from '../../utils/stateful/app-singleton/date-picker-app.singleton'
import { __createDatePickerAppSingleton__ } from '../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

describe('date picker wrapper', () => {
  let $app: DatePickerAppSingleton | undefined

  beforeEach(() => {
    $app = undefined
    $app = __createDatePickerAppSingleton__()
  })

  afterEach(() => {
    cleanup()
  })

  it('should not display popup on render', () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)

    expect(screen.queryByTestId('date-picker-popup')).toBeNull()
  })

  it('should display popup on render', () => {
    ($app as DatePickerAppSingleton).datePickerState.open()
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)

    expect(screen.queryByTestId('date-picker-popup')).not.toBeNull()
  })

  it('should display popup when datePickerState changes and isOpen is true', async () => {
    render(<AppWrapper $app={$app as DatePickerAppSingleton} />)
    expect(screen.queryByTestId('date-picker-popup')).toBeNull()
    ;($app as DatePickerAppSingleton).datePickerState.open()

    await waitFor(() => {
      expect(screen.queryByTestId('date-picker-popup')).not.toBeNull()
    })
  })
})
