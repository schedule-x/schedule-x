/* eslint-disable @typescript-eslint/no-explicit-any */
import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'
import { viewMonthGrid } from '../views/month-grid'
import { EventId } from '@schedule-x/shared/src/types/event-id'

describe('The calendar factory', () => {
  it('should create a calendar app', () => {
    const underTest = createCalendar

    const result = underTest({
      views: [viewMonthGrid],
    })

    expect(result).toBeInstanceOf(CalendarApp)
  })

  it('should throw an error if initializing with double plugin lists', () => {
    const underTest = createCalendar

    expect(() => {
      underTest(
        {
          views: [viewMonthGrid],
          plugins: [],
        },
        []
      )
    }).toThrow()
  })

  describe('validating event ids', () => {
    it('should throw an error for decimal number', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1.1,
              start: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
              end: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event id 1.1 is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
      )
    })

    it('should throw an error for decimal numbers also if casted to strings', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: '1.1',
              start: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
              end: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event id 1.1 is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
      )
    })

    it('should be able to use a uuid as an id', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4c4d',
              start: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
              end: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
            },
          ],
        })
      }).not.toThrow()
    })

    it('should be able to use a regular integer as an id', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
              end: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
            },
          ],
        })
      }).not.toThrow()
    })

    it.each([[null], [undefined], [{}], [[]], [() => {}]])(
      `should throw an error for invalid id type %p`,
      (id) => {
        const underTest = createCalendar

        expect(() => {
          underTest({
            views: [viewMonthGrid],
            events: [
              {
                id: id as any,
                start: Temporal.ZonedDateTime.from(
                  '2022-01-01T00:00:00[Europe/Stockholm]'
                ),
                end: Temporal.ZonedDateTime.from(
                  '2022-01-01T00:00:00[Europe/Stockholm]'
                ),
              },
            ],
          })
        }).toThrow(
          `[Schedule-X error]: Event id ${id} is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
        )
      }
    )
  })

  describe('skipping event validation', () => {
    it('should not throw error for invalid event if skipValidation is true', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          skipValidation: true,
          events: [
            {
              id: null as unknown as EventId,
              start: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
              end: Temporal.ZonedDateTime.from(
                '2022-01-01T00:00:00[Europe/Stockholm]'
              ),
            },
          ],
        })
      }).not.toThrow()
    })
  })
})
