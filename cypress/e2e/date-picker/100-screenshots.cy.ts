import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject } from '../../page-objects/date-picker.page-object.ts'

describe('Date Picker - screenshots', () => {
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.datePicker.screenshots)
  })

  it('displays a closed date picker', () => {
    cy.compareSnapshot('date-picker-closed')
  })

  it('displays an open date picker', () => {
    datePicker.toggleOpenState()
    cy.compareSnapshot('date-picker-open')
  })

  it('displays years view', () => {
    datePicker.toggleOpenState()
    datePicker.openYearsView()
    cy.compareSnapshot('date-picker-year-mode')
  })
})
