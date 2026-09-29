import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'
import { cypressPageUrls } from '../../pages/urls.ts'

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
  'Calendar year grid',
  {
    viewportHeight: 900,
    viewportWidth: 1280,
  },
  () => {
    beforeEach(() => {
      cy.visit(cypressPageUrls.calendar.yearGrid)
      cy.get('.sx__year-grid-day').should('have.length', 366)
      waitForFontsAndPaint()
    })

    it('renders the year view', () => {
      cy.compareSnapshot('calendar-year-grid__view', SNAPSHOT_FAULT_TOLERANCE)
    })

    it('renders the day events modal', () => {
      cy.get('.sx__view-container').scrollTo(0, 1, { duration: 0 })
      cy.get('[data-date="2024-09-24"]').click({ scrollBehavior: false })
      cy.get('.sx__year-grid-day-events-modal').should('be.visible')

      cy.compareSnapshot(
        'calendar-year-grid__day-events-modal',
        SNAPSHOT_FAULT_TOLERANCE
      )
    })

    it('preserves the scroll position when opening the day events modal', () => {
      cy.get('#calendar').invoke('css', 'height', '600px')
      cy.get('.sx__view-container')
        .invoke('css', 'scroll-behavior', 'auto')
        .scrollTo('bottom', { duration: 0 })
        .should(($viewContainer) => {
          expect($viewContainer[0].scrollTop).to.be.greaterThan(0)
        })
        .then(($viewContainer) => {
          const scrollTopBeforeClick = $viewContainer[0].scrollTop

          cy.get('[data-date="2024-09-24"]')
            .should('be.visible')
            .click({ scrollBehavior: false })
          cy.get('.sx__year-grid-day-events-modal').should('be.visible')
          cy.wait(400)
          cy.then(() => {
            expect($viewContainer[0].scrollTop).to.equal(scrollTopBeforeClick)
          })
        })
    })
  }
)
