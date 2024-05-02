import { cypressPageUrls } from '../../pages/urls.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '@schedule-x/e2e-testing'
import { createTimePickerPageObject } from '@schedule-x/e2e-testing/src/page-objects/time-picker.page-object.ts'

describe('Time Picker - Placement', () => {
  const timePickerTopLeft = createTimePickerPageObject('.time-picker-top-left')
  const timePickerTopRight = createTimePickerPageObject(
    '.time-picker-top-right'
  )
  const timePickerBottomLeft = createTimePickerPageObject(
    '.time-picker-bottom-left'
  )
  const timePickerBottomRight = createTimePickerPageObject(
    '.time-picker-bottom-right'
  )
  const timePickerInModal = createTimePickerPageObject('.time-picker-in-modal')

  beforeEach(() => {
    cy.visit(cypressPageUrls.timePicker.placement)
  })

  it('should open all popups in the correct position', () => {
    timePickerTopLeft.toggleOpenState()
    cy.compareSnapshot('popup-placement-top-left', SNAPSHOT_FAULT_TOLERANCE)
    cy.get('body').click()

    timePickerTopRight.toggleOpenState()
    cy.compareSnapshot('popup-placement-top-right', SNAPSHOT_FAULT_TOLERANCE)
    cy.get('body').click()

    timePickerBottomLeft.toggleOpenState()
    cy.compareSnapshot('popup-placement-bottom-left', SNAPSHOT_FAULT_TOLERANCE)
    cy.get('body').click()

    timePickerBottomRight.toggleOpenState()
    cy.compareSnapshot('popup-placement-bottom-right', SNAPSHOT_FAULT_TOLERANCE)
    cy.get('body').click()

    timePickerInModal.toggleOpenState()
    cy.compareSnapshot('popup-placement-in-modal', SNAPSHOT_FAULT_TOLERANCE)
  })
})
