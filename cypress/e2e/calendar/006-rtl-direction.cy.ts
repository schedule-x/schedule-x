import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../../libs/e2e-testing/src/page-objects/calendar-header.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'
import { createDatePickerPageObject } from '@schedule-x/e2e-testing'

describe('rtl direction', {
  viewportHeight: 800,
  viewportWidth: 1280
}, () => {
  const calendarHeader = createCalendarHeaderPageObject()
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.calendar.rtlDirection)
  })

  it('should render events in the week view', () => {
    cy.wait(1000) // for scrolling to finish
    cy.compareSnapshot(
      'calendar-rtl-direction__week-view',
      SNAPSHOT_FAULT_TOLERANCE
    )

    cy.get('.sx__event').first().click({ force: true })
    cy.wait(500) // wait for modal to open
    cy.compareSnapshot(
      'calendar-rtl-direction__event-modal',
      SNAPSHOT_FAULT_TOLERANCE
    )
  })

  it('should render events in the month view', () => {
    calendarHeader.openViewByLabel('חוֹדֶשׁ')
    cy.wait(100) // wait for animation and event rendering
    cy.compareSnapshot(
      'calendar-rtl-direction__month-view',
      SNAPSHOT_FAULT_TOLERANCE
    )
  })

  it('should render date picker', () => {
    datePicker.toggleOpenState()
    cy.wait(100) // wait for animation and event rendering
    cy.compareSnapshot(
      'calendar-rtl-direction__date-picker',
      SNAPSHOT_FAULT_TOLERANCE
    )
  })
})
