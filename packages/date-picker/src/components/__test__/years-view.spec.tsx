import {
  describe,
  it,
  mockFn,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render } from '@testing-library/preact'
import YearsView from '../years-view'

describe('AppPopup', () => {
  it.todo('should call setMonthView', () => {
    const callbackToTest = mockFn()
    render(<YearsView setMonthView={callbackToTest} />)
  })
})
