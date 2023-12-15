import { createWeekViewPageObject } from '../../../libs/e2e-testing/src/page-objects/week-view.page-object.ts'
import { cypressPageUrls } from '../../pages/urls.ts'

describe('Dragging events', () => {
  describe('Dragging an event vertically', () => {
    const weekView = createWeekViewPageObject()

    beforeEach(() => {
      cy.visit(cypressPageUrls.calendar.dragAndDrop)
    })

    it(
      'should drag an event 15 minutes and 3 days forward',
      { scrollBehavior: false },
      () => {
        const eventTitle = 'Event 1'
        weekView
          .getTimeGridDayByIndex(3)
          .contains('.sx__time-grid-event', eventTitle)

        // xPixels does not work as expected. everything above 200 seems to yield the same result (15 minute drag) 🧐
        weekView.getEventByTitleAndDragIt(eventTitle, 800, 800)

        weekView
          .getTimeGridDayByIndex(6)
          .contains('.sx__time-grid-event', eventTitle)
        const draggedEvent = weekView.getEventByTitle(eventTitle)
        draggedEvent.contains('12:30 AM – 1:30 AM')
      }
    )
  })
})
