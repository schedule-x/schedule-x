class TimePickerPageObject {
  constructor(private wrapperClass: string = '') {}

  toggleOpenState() {
    const selector = '.sx__time-input-wrapper'

    if (this.wrapperClass) {
      cy.get(this.wrapperClass).find(selector).click()
      return
    }

    cy.get(selector).click()
  }
}

export const createTimePickerPageObject = (wrapperClass = '') =>
  new TimePickerPageObject(wrapperClass)
