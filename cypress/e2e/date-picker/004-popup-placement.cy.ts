import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject } from '../../../libs/e2e-testing/src/page-objects/date-picker.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '@schedule-x/e2e-testing'

describe(
  'Date Picker - Select Dates',
  {
    viewportHeight: 800,
    viewportWidth: 1280,
  },
  () => {
    const datePickerTopLeft = createDatePickerPageObject(
      '.date-picker-top-left'
    )
    const datePickerTopRight = createDatePickerPageObject(
      '.date-picker-top-right'
    )
    const datePickerBottomLeft = createDatePickerPageObject(
      '.date-picker-bottom-left'
    )
    const datePickerBottomRight = createDatePickerPageObject(
      '.date-picker-bottom-right'
    )
    const datePickerInModal = createDatePickerPageObject(
      '.date-picker-in-modal'
    )

    beforeEach(() => {
      cy.visit(cypressPageUrls.datePicker.popupPlacement)
    })

    it('should open all popups in the correct position', () => {
      datePickerTopLeft.toggleOpenState()
      cy.compareSnapshot('popup-placement-top-left', SNAPSHOT_FAULT_TOLERANCE)
      cy.get('body').click()

      datePickerTopRight.toggleOpenState()
      cy.compareSnapshot('popup-placement-top-right', SNAPSHOT_FAULT_TOLERANCE)
      cy.get('body').click()

      datePickerBottomLeft.toggleOpenState()
      cy.compareSnapshot(
        'popup-placement-bottom-left',
        SNAPSHOT_FAULT_TOLERANCE
      )
      cy.get('body').click()

      datePickerBottomRight.toggleOpenState()
      cy.compareSnapshot(
        'popup-placement-bottom-right',
        SNAPSHOT_FAULT_TOLERANCE
      )
      cy.get('body').click()

      datePickerInModal.toggleOpenState()
      cy.compareSnapshot('popup-placement-in-modal', SNAPSHOT_FAULT_TOLERANCE)
    })
  }
)
