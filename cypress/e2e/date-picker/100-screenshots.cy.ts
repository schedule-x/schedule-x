import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject } from '../../../libs/e2e-testing/src/page-objects/date-picker.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '@schedule-x/e2e-testing'

describe('Date Picker - screenshots', () => {
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.datePicker.screenshots)
  })

  it('displays a closed date picker', () => {
    cy.compareSnapshot('date-picker-closed', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('displays an open date picker', () => {
    datePicker.toggleOpenState()
    cy.compareSnapshot('date-picker-open', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('displays years view', () => {
    datePicker.toggleOpenState()
    datePicker.openYearsView()
    cy.compareSnapshot('date-picker-year-mode', SNAPSHOT_FAULT_TOLERANCE)
  })
})
