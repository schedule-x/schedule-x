import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render } from '@testing-library/preact'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { WeekAgendaWrapper } from '../week-agenda-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import 'temporal-polyfill/global'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<WeekAgendaWrapper $app={$app} id={'1'} />)
}

const getEventTitles = () =>
  Array.from(document.querySelectorAll('.sx__month-agenda-event__title')).map(
    (el) => el.textContent
  )

describe('WeekAgendaWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  /**
   * useAgenda is shared between the month-agenda and week-agenda views, so a
   * monthAgendaOptions.sortEvents comparator must NOT leak into the week-agenda.
   */
  it('ignores monthAgendaOptions.sortEvents (no leak through the shared useAgenda hook)', () => {
    const sameDayEvents = [
      {
        id: 1,
        title: 'A',
        start: Temporal.ZonedDateTime.from(
          '2027-01-27T09:00:00[Europe/Stockholm]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2027-01-27T10:00:00[Europe/Stockholm]'
        ),
      },
      {
        id: 2,
        title: 'B',
        start: Temporal.ZonedDateTime.from(
          '2027-01-27T09:00:00[Europe/Stockholm]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2027-01-27T10:00:00[Europe/Stockholm]'
        ),
      },
      {
        id: 3,
        title: 'C',
        start: Temporal.ZonedDateTime.from(
          '2027-01-27T09:00:00[Europe/Stockholm]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2027-01-27T10:00:00[Europe/Stockholm]'
        ),
      },
    ]
    const $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2027-01-27'),
      events: sameDayEvents,
      monthAgendaOptions: {
        nEventIndicatorsPerDay: 3,
        sortEvents: (a, b) => String(b.title).localeCompare(String(a.title)),
      },
    })
    renderComponent($app)

    // The week-agenda keeps the default order despite monthAgendaOptions.sortEvents
    expect(getEventTitles()).toEqual(['A', 'B', 'C'])
  })
})
