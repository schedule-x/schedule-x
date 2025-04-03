import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject, createWeekViewPageObject } from '../../../libs/e2e-testing'

describe('Updating the calendar config', {
  viewportHeight: 800,
  viewportWidth: 1280
}, () => {
  const weekView = createWeekViewPageObject()
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.calendar.updateConfig)
  })

  it('should update config', () => {
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

    datePicker.getInputValue().should('contain', '9/21/2023')
    cy.contains('set language to German').click()
    datePicker.getInputValue().should('contain', '21.9.2023')
  })
})
