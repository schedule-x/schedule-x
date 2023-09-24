import {
  describe,
  expect,
  it,
} from '../../../testing/unit/unit-testing-library.impl'
import { addTimePointsToDateTime } from '../string-conversion'

describe('add time points to a date time string', () => {
  describe('adding', () => {
    it('should add 1 hour to 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 00:00', 100)

      expect(result).toEqual('2020-12-01 01:00')
    })

    it('should add 1 1/2 hour to 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 00:00', 150)

      expect(result).toEqual('2020-12-01 01:30')
    })

    it('should add 12 hours and 15 minutes to 2020-12-01 06:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 06:00', 1225)

      expect(result).toEqual('2020-12-01 18:15')
    })

    it('should add 15 minutes to 2023-09-18 22:13', () => {
      const result = addTimePointsToDateTime('2023-09-18 22:13', 25)

      expect(result).toEqual('2023-09-18 22:28')
    })
  })

  describe('subtracting', () => {
    it('should subtract 1 hour from 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 00:00', -100)

      expect(result).toEqual('2020-11-30 23:00')
    })

    it('should subtract 1 1/2 hour from 2020-12-01 00:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 00:00', -150)

      expect(result).toEqual('2020-11-30 22:30')
    })

    it('should subtract 12 hours and 15 minutes from 2020-12-01 06:00', () => {
      const result = addTimePointsToDateTime('2020-12-01 06:00', -1225)

      expect(result).toEqual('2020-11-30 17:45')
    })
  })
})
