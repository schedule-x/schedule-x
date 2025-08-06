import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { screen, waitFor, cleanup } from '@testing-library/preact'

import { renderComponent, getInputElement } from './utils'
import { createAppSingleton } from '../../../factory'

describe('date picker input', () => {
  beforeEach(() => {
    cleanup()
  })

  it.each([
    ['2021-02-01', 'en-US', '2/1/2021'],
    ['2021-02-01', 'de-DE', '1.2.2021'],
  ])(
    'should display selected date for locale %s',
    (selectedDate: string, locale: string, expectedDisplayedDate: string) => {
      renderComponent(createAppSingleton({ selectedDate: Temporal.PlainDate.from(selectedDate), locale }))
      const inputElement = getInputElement()

      expect(
        screen.getByDisplayValue(expectedDisplayedDate) === inputElement
      ).toBe(true)
    }
  )

  it.each([
    ['MM/DD/YYYY', 'en-US'],
    ['TT.MM.JJJJ', 'de-DE'],
  ])(
    'should display placeholder %s for locale %s when hasPlaceholder is true',
    (placeholder: string, locale: string) => {
      renderComponent(createAppSingleton({ locale, hasPlaceholder: true }))
      const inputElement = getInputElement()

      expect(screen.getByDisplayValue(placeholder) === inputElement).toBe(true)
    }
  )

  it('should update displayed selected date', async () => {
    const expectedInitialDate = '1/1/2021'
    const expectedUpdatedDate = '1/2/2021'
    const $app = createAppSingleton({ selectedDate: Temporal.PlainDate.from('2021-01-01') })
    renderComponent($app)
    const inputElement = getInputElement()
    expect(screen.getByDisplayValue(expectedInitialDate) === inputElement).toBe(
      true
    )

    $app.datePickerState.selectedDate.value = Temporal.PlainDate.from('2021-01-02')

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(expectedUpdatedDate) === inputElement
      ).toBe(true)
    })
  })

  it('should use a custom label', () => {
    const label = 'Custom label'
    renderComponent(createAppSingleton({ label }))

    expect(document.querySelector('.sx__date-input-label')?.textContent).toBe(
      label
    )
  })

  it('should use the default label', () => {
    renderComponent(createAppSingleton({}))

    expect(document.querySelector('.sx__date-input-label')?.textContent).toBe(
      'Date'
    )
  })

  it('should use a custom input name', () => {
    const name = 'Custom name'
    renderComponent(createAppSingleton({ name }))

    expect(getInputElement().getAttribute('name')).toBe(name)
  })

  it('should use the default input name', () => {
    renderComponent(createAppSingleton({}))

    expect(getInputElement().getAttribute('name')).toBe('date')
  })
})
