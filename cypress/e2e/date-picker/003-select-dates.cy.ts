import { cypressPageUrls } from '../../pages/urls.ts'
import { createDatePickerPageObject } from '../../../libs/e2e-testing/src/page-objects/date-picker.page-object.ts'

describe('Date Picker - Select Dates', () => {
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.datePicker.selectDates)
    datePicker.toggleOpenState()
  })

  it('should select 18 March of 1999', () => {
    datePicker.clickDateByText('18')
    datePicker.getInputValue().should('eq', '3/18/1999')
  })

  it('should select 9 of August of 2023', () => {
    datePicker.openYearsView()
    datePicker.clickYear(2023)
    datePicker.clickMonthByIndex(7)
    datePicker.clickDateByText('9')
    datePicker.getInputValue().should('eq', '8/9/2023')
  })
})
