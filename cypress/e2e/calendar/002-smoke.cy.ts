import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../../libs/e2e-testing/src/page-objects/calendar-header.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'

describe('Calendar Smoke Test', () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit(cypressPageUrls.calendar.smoke)
  })

  it('should render events in the week view', () => {
    cy.compareSnapshot('smoke-test__week-view', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('should render events in the month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.compareSnapshot('smoke-test__month-view', SNAPSHOT_FAULT_TOLERANCE)
  })

  it('should render events in the day view', () => {
    calendarHeader.openViewByLabel('Day')
    cy.compareSnapshot('smoke-test__day-view', SNAPSHOT_FAULT_TOLERANCE)
  })
})
