import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../../libs/e2e-testing/src/page-objects/calendar-header.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'

describe('Calendar Smoke Test', {
  viewportHeight: 800,
  viewportWidth: 1280,
  retries: {
    runMode: 2,  // retry up to 2 times in CI
    openMode: 0  // no retries in interactive mode
  }
}, () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.calendar.smoke)
  })

  it('should render events in the week view', () => {
    cy.wait(1000) // for scrolling to finish
    cy.compareSnapshot('smoke-test__week-view', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('should render events in the month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.wait(300)
    cy.compareSnapshot('smoke-test__month-view', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('should render events in the day view', () => {
    cy.wait(1000) // for scrolling to finish
    calendarHeader.openViewByLabel('Day')
    cy.wait(300)
    cy.compareSnapshot('smoke-test__day-view', SNAPSHOT_FAULT_TOLERANCE)
  })
})
