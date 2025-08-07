import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl'
import { addTimePointsToDateTime } from '../string-conversion'
import 'temporal-polyfill/global'

describe('add time points to a date time string', () => {
  describe('adding', () => {
    it('should add 1 hour to 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T00:00:00+01:00[Europe/Berlin]'),
        100
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-12-01T01:00:00+01:00[Europe/Berlin]')
      )
    })

    it('should add 1 1/2 hour to 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T00:00:00+01:00[Europe/Berlin]'),
        150
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-12-01T01:30:00+01:00[Europe/Berlin]')
      )
    })

    it('should add 12 hours and 15 minutes to 2020-12-01 06:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T06:00:00+01:00[Europe/Berlin]'),
        1225
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-12-01T18:15:00+01:00[Europe/Berlin]')
      )
    })

    it('should add 15 minutes to 2023-09-18 22:13', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2023-09-18T22:13:00+02:00[Europe/Berlin]'),
        25
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2023-09-18T22:28:00+02:00[Europe/Berlin]')
      )
    })
  })

  describe('subtracting', () => {
    it('should subtract 1 hour from 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T00:00:00+01:00[Europe/Berlin]'),
        -100
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-11-30T23:00:00+01:00[Europe/Berlin]')
      )
    })

    it('should subtract 1 1/2 hour from 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T00:00:00+01:00[Europe/Berlin]'),
        -150
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-11-30T22:30:00+01:00[Europe/Berlin]')
      )
    })

    it('should subtract 12 hours and 15 minutes from 2020-12-01 06:00', () => {
      const result = addTimePointsToDateTime(
        Temporal.ZonedDateTime.from('2020-12-01T06:00:00+01:00[Europe/Berlin]'),
        -1225
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-11-30T17:45:00+01:00[Europe/Berlin]')
      )
    })
  })
})
