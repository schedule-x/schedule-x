import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject } from '../../../libs/e2e-testing/src/page-objects/date-picker.page-object.ts'

describe('Navigating years in the date picker', () => {
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.datePicker.navigateYears)
    datePicker.toggleOpenState()
    datePicker.getCurrentMonthAndYear().should('equal', 'March 2023')
    datePicker.openYearsView()
  })

  it('should navigate to January 2023', () => {
    datePicker.clickMonthByIndex(0)
    datePicker.getCurrentMonthAndYear().should('equal', 'January 2023')
  })

  it('should navigate to December 2023', () => {
    datePicker.clickMonthByIndex(11)
    datePicker.getCurrentMonthAndYear().should('equal', 'December 2023')
  })

  it('should navigate to June 2000', () => {
    datePicker.clickYear(2000)
    datePicker.clickMonthByIndex(5)
    datePicker.getCurrentMonthAndYear().should('equal', 'June 2000')
  })

  it('should navigate to October 2024', () => {
    datePicker.clickYear(2024)
    datePicker.clickMonthByIndex(9)
    datePicker.getCurrentMonthAndYear().should('equal', 'October 2024')
  })
})
