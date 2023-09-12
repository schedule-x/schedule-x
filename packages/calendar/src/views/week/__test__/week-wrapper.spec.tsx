import {
  afterEach,
  describe,
  expect,
  it,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '../../../utils/stateful/app-singleton/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import { WeekWrapper } from '../week-wrapper'
import { createCalendarAppSingleton } from '../../../factory'

const factory = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <WeekWrapper $app={$app} id={'1'} />
    </AppContext.Provider>
  )
}

describe('WeekWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a week with regular days', () => {
    it('renders one event at 12PM', () => {
      const $app = createCalendarAppSingleton({
        datePicker: {
          selectedDate: '2021-01-01',
        },
        events: [
          {
            id: 1,
            time: {
              start: '2021-01-01 12:00',
              end: '2021-01-01 18:00',
            },
          },
        ],
      })
      factory($app)

      const renderedEvent = document.querySelector(
        '.sx__week-day-event'
      ) as HTMLDivElement
      expect(renderedEvent?.attributes.getNamedItem('style')?.value).toContain(
        'top: 50%'
      )
      expect(renderedEvent?.attributes.getNamedItem('style')?.value).toContain(
        'height: 25%'
      )
    })

    it.todo('renders a full day event')
  })

  describe('a week with hybrid days', () => {
    it.todo('renders an event at 3AM')
  })
})
