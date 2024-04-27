class DatePickerPageObject {
  constructor(private wrapperClass: string = '') {}

  goToNextMonth() {
    const selector = '.sx__date-picker__month-view-header .sx__chevron--next'

    if (this.wrapperClass) {
      cy.get(this.wrapperClass).find(selector).click()
      return
    }

    cy.get(selector).click()
  }

  goToPreviousMonth() {
    const selector =
      '.sx__date-picker__month-view-header .sx__chevron--previous'

    if (this.wrapperClass) {
      cy.get(this.wrapperClass).find(selector).click()
      return
    }

    cy.get(selector).click()
  }

  toggleOpenState() {
    const selector = '.sx__date-input-wrapper'

    if (this.wrapperClass) {
      cy.get(this.wrapperClass).find(selector).click()
      return
    }

    cy.get(selector).click()
  }

  getCurrentMonthAndYearElement() {
    const selector = '.sx__date-picker__month-view-header__month-year'

    if (this.wrapperClass) {
      return cy.get(this.wrapperClass).find(selector)
    }

    return cy.get(selector)
  }

  getCurrentMonthAndYear() {
    return this.getCurrentMonthAndYearElement().invoke('text')
  }

  openYearsView() {
    this.getCurrentMonthAndYearElement().click()
  }

  clickMonthByIndex(index: number) {
    const selector = '.sx__date-picker__years-view-accordion__month'

    if (this.wrapperClass) {
      cy.get(this.wrapperClass).find(selector).eq(index).click()
      return
    }

    cy.get(selector).eq(index).click()
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

export const createDatePickerPageObject = (wrapperClass = '') =>
  new DatePickerPageObject(wrapperClass)
