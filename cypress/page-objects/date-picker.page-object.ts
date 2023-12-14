class DatePickerPageObject {
  goToNextMonth() {
    cy.get('.sx__date-picker__month-view-header .sx__chevron--next').click()
  }

  goToPreviousMonth() {
    cy.get('.sx__date-picker__month-view-header .sx__chevron--previous').click()
  }

  toggleOpenState() {
    cy.get('.sx__date-input-wrapper').click()
  }

  getCurrentMonthAndYearElement() {
    return cy.get('.sx__date-picker__month-view-header__month-year')
  }

  getCurrentMonthAndYear() {
    return this.getCurrentMonthAndYearElement().invoke('text')
  }

  openYearsView() {
    this.getCurrentMonthAndYearElement().click()
  }

  clickMonthByIndex(index: number) {
    cy.get('.sx__date-picker__years-view-accordion__month').eq(index).click()
  }

  clickYear(year: number) {
    cy.get('.sx__date-picker__years-accordion__expand-button')
      .contains(year)
      .click()
  }

  clickDateByText(day: string) {
    cy.get('.sx__date-picker__day').contains(day).click()
  }

  getInputValue() {
    return cy.get('.sx__date-input').invoke('val')
  }
}

export const createDatePickerPageObject = () => new DatePickerPageObject()
