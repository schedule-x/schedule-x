import {
  describe,
  it,
  expect,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render, screen } from '@testing-library/preact'
import DayNames from '../day-names'
import { AppContext } from '../../utils/stateful/app-context'
import { appSingletonWithGerman } from '../../utils/stateless/testing/create-app-singleton'

describe('DayNames', () => {
  it('should render day names', () => {
    render(
      <AppContext.Provider value={appSingletonWithGerman()}>
        <DayNames />
      </AppContext.Provider>
    )

    expect(screen.queryAllByTestId('day-name').length).toBe(7)
    // German week days
    expect(screen.queryAllByTestId('day-name')[0].textContent).toBe('M')
    expect(screen.queryAllByTestId('day-name')[1].textContent).toBe('D')
    expect(screen.queryAllByTestId('day-name')[2].textContent).toBe('M')
    expect(screen.queryAllByTestId('day-name')[3].textContent).toBe('D')
    expect(screen.queryAllByTestId('day-name')[4].textContent).toBe('F')
    expect(screen.queryAllByTestId('day-name')[5].textContent).toBe('S')
    expect(screen.queryAllByTestId('day-name')[6].textContent).toBe('S')
  })
})
