import { createDatePickerPageObject } from '../../page-objects/date-picker.page-object.ts'
import { cypressPageUrls } from '../../pages/urls.ts'

describe('Navigating months in the date picker', () => {
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.datePicker.navigateMonths)
  })

  it('should navigate to the next month', () => {
    datePicker.toggleOpenState()
    datePicker.getCurrentMonthAndYear().should('contain', 'January 2020')
    datePicker.goToNextMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'February 2020')
  })

  it('should navigate to the previous month', () => {
    datePicker.toggleOpenState()
    datePicker.getCurrentMonthAndYear().should('contain', 'January 2020')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'December 2019')
  })

  it('should navigate three months forward and then six months backward', () => {
    datePicker.toggleOpenState()
    datePicker.getCurrentMonthAndYear().should('contain', 'January 2020')
    datePicker.goToNextMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'February 2020')
    datePicker.goToNextMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'March 2020')
    datePicker.goToNextMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'April 2020')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'March 2020')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'February 2020')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'January 2020')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'December 2019')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'November 2019')
    datePicker.goToPreviousMonth()
    datePicker.getCurrentMonthAndYear().should('contain', 'October 2019')
  })
})
