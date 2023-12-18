class WeekViewPageObject {
  getTimeGridEventByTitle(uniqueTitle: string) {
    return cy.contains('.sx__time-grid-event', uniqueTitle)
  }

  getDateGridEventByTitle(uniqueTitle: string) {
    return cy.contains('.sx__date-grid-event', uniqueTitle)
  }

  getEventByTitleAndDragIt(
    uniqueTitle: string,
    xPixels: number,
    yPixels: number
  ) {
    cy.get('.sx__view-container').scrollTo(0, 0)
    cy.contains('.sx__time-grid-event', uniqueTitle)
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: xPixels, clientY: yPixels, force: true })
      .trigger('mouseup', { force: true })
  }

  getTimeGridDayByIndex(index: number) {
    return cy.get('.sx__time-grid-day').eq(index)
  }
}

export const createWeekViewPageObject = () => new WeekViewPageObject()
