import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { renderComponent } from './utils'

describe('Week view', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a week with regular days', () => {
    it('renders one event at 12PM', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2021-01-01',
        events: [
          {
            id: 1,
            start: '2021-01-01 12:00',
            end: '2021-01-01 18:00',
          },
        ],
      })
      renderComponent($app)

      const renderedEvent = document.querySelector('.sx__time-grid-event')
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
