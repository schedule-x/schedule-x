import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../../libs/e2e-testing/src/page-objects/calendar-header.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'
import { createDatePickerPageObject } from '@schedule-x/e2e-testing'

describe('rtl direction', {
  viewportHeight: 800,
  viewportWidth: 1280
}, () => {
  const calendarHeader = createCalendarHeaderPageObject()
  const datePicker = createDatePickerPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.calendar.rtlDirection)
  })
})
