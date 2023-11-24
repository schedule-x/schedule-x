class CalendarHeaderPageObject {
  openViewByLabel(viewLabel: string) {
    this.openViewSelection()
    this.clickViewByLabel(viewLabel)
  }

  private openViewSelection() {
    cy.get('.sx__view-selection-selected-item').click()
  }

  private clickViewByLabel(viewLabel: string) {
    cy.contains('.sx__view-selection-item', viewLabel).click()
  }
}

export const createCalendarHeaderPageObject = () =>
  new CalendarHeaderPageObject()
