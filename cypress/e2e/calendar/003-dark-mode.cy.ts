import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../page-objects/calendar-header.page-object.ts'

describe('Calendar dark mode', () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.viewport(1440, 1200)
    cy.visit(cypressPageUrls.calendar.darkMode)
  })

  it('should render events in the week view', { scrollBehavior: false }, () => {
    cy.compareSnapshot('calendar-dark-mode__week-view', 0.5)
  })

  it('should render events in the month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.compareSnapshot('calendar-dark-mode__month-view')
  })

  it('should render events in the day view', () => {
    calendarHeader.openViewByLabel('Day')
    cy.compareSnapshot('calendar-dark-mode__day-view')
  })
})
