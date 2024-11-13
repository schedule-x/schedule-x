import { cypressPageUrls } from '../../pages/urls.ts'
import { createWeekViewPageObject } from '../../../libs/e2e-testing'

describe(
  'Updating calendar events',
  {
    viewportHeight: 800,
    viewportWidth: 1280,
  },
  () => {
    const weekView = createWeekViewPageObject()

    beforeEach(() => {
      cy.viewport(1440, 900)
      cy.visit(cypressPageUrls.calendar.updateEvents)
    })

    it('should add, update and delete an event', () => {
      cy.contains('add').click()
      weekView.getDateGridEventByTitle('New event').should('exist')
      cy.contains('update').click()
      weekView.getDateGridEventByTitle('Updated event').should('exist')
      cy.contains('remove').click()
      weekView.getDateGridEventByTitle('Updated event').should('not.exist')
    })
  }
)
