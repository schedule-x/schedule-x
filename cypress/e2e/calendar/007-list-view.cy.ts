import { cypressPageUrls } from '../../pages/urls.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'

const waitForFontsAndPaint = () => {
  cy.document().then((document) => document.fonts.ready)
  cy.window().then(
    (window) =>
      new Cypress.Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve())
        })
      })
  )
}

describe(
  'list view',
  {
    viewportHeight: 800,
    viewportWidth: 1280,
  },
  () => {
    beforeEach(() => {
      cy.visit(cypressPageUrls.calendar.listView)
    })

    it('should load additional events on scroll', () => {
      // on load, 8 events, of which 2 are 3 days events = 12 event elements
      // (2 * 3) + 6
      cy.get('.sx__event').should('have.length', 12)
      waitForFontsAndPaint()

      cy.compareSnapshot(
        'calendar-list-view__initial-load',
        SNAPSHOT_FAULT_TOLERANCE
      )

      // scroll a bit and test that more events were loaded
      cy.get('.sx__list-wrapper').scrollTo('bottom')
      cy.get('.sx__event').should('have.length', 28)
    })
  }
)
