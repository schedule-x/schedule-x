/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'
import { viewMonthGrid } from '../views/month-grid'

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

  describe('validating event start time', () => {
    it('should throw an error if start time includes seconds', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01T00:00:00',
              end: '2022-01-01T00:00:00',
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event start time 2022-01-01T00:00:00 is not a valid time format. Please refer to the docs for more information.`
      )
    })

    it('should throw an error if start time includes T as a separator', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01T00:00',
              end: '2022-01-01T00:00',
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event start time 2022-01-01T00:00 is not a valid time format. Please refer to the docs for more information.`
      )
    })

    it('should not throw an error if start time is a date string', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01',
              end: '2022-01-01',
            },
          ],
        })
      }).not.toThrow()
    })

    it('should not throw an error if start is a date time string', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01 00:00',
              end: '2022-01-01 00:00',
            },
          ],
        })
      }).not.toThrow()
    })
  })

  describe('validating event end time', () => {
    it('should throw an error if end time includes seconds', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01',
              end: '2022-01-01T00:00:00',
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event end time 2022-01-01T00:00:00 is not a valid time format. Please refer to the docs for more information.`
      )
    })

    it('should throw an error if end time includes T as a separator', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01',
              end: '2022-01-01T00:00',
            },
          ],
        })
      }).toThrow(
        `[Schedule-X error]: Event end time 2022-01-01T00:00 is not a valid time format. Please refer to the docs for more information.`
      )
    })

    it('should not throw an error if end time is a date string', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01',
              end: '2022-01-01',
            },
          ],
        })
      }).not.toThrow()
    })

    it('should not throw an error if end is a date time string', () => {
      const underTest = createCalendar

      expect(() => {
        underTest({
          views: [viewMonthGrid],
          events: [
            {
              id: 1,
              start: '2022-01-01',
              end: '2022-01-01 00:00',
            },
          ],
        })
      }).not.toThrow()
    })
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
              start: '2022-01-01',
              end: '2022-01-01',
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
              start: '2022-01-01',
              end: '2022-01-01',
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
              start: '2022-01-01',
              end: '2022-01-01',
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
              start: '2022-01-01',
              end: '2022-01-01',
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
                start: '2022-01-01',
                end: '2022-01-01',
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
              id: 1,
              start: '2022-01-01T00:00:00',
              end: '2022-01-01T00:00:00',
            },
          ],
        })
      }).not.toThrow()
    })
  })
})
