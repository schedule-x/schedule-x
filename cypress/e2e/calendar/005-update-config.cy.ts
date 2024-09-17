import { cypressPageUrls } from '../../pages/urls.ts'
import { createWeekViewPageObject } from '../../../libs/e2e-testing'

describe('Updating calendar events', {
  viewportHeight: 800,
  viewportWidth: 1280
}, () => {
  const weekView = createWeekViewPageObject()

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit(cypressPageUrls.calendar.updateConfig)
  })

  it('should config', () => {
    //weekView.getCalendarStartsWith('MON')

    weekView.getFirstDayOfWeek().should('contain', 'Mon')
    weekView.getLastDayOfWeek().should('contain', 'Sun')
    weekView.getVisibleWeekDays().should('have.length', 7)

    cy.contains('5 days week').click()

    weekView.getFirstDayOfWeek().should('contain', 'Mon')
    weekView.getLastDayOfWeek().should('contain', 'Fri')
    weekView.getVisibleWeekDays().should('have.length', 5)

    cy.contains('start on tuesday').click()

    weekView.getFirstDayOfWeek().should('contain', 'Tue')
    weekView.getLastDayOfWeek().should('contain', 'Sat')
    weekView.getVisibleWeekDays().should('have.length', 5)

  })
})
