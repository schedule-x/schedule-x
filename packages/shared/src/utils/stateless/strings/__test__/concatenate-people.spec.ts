import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '../../testing/unit/unit-testing-library.impl'
import { concatenatePeople } from '../concatenate-people'

describe('Concatenating people names', () => {
  describe('when there are no people', () => {
    it('returns an empty string', () => {
      expect(concatenatePeople([])).toBe('')
    })
  })

  describe('when there is one person', () => {
    it('returns that person', () => {
      expect(concatenatePeople(['John'])).toBe('John')
    })
  })

  describe('when there are two people', () => {
    it('returns both people separated by "&"', () => {
      expect(concatenatePeople(['John', 'Jane'])).toBe('John & Jane')
    })
  })

  describe('when there are three people', () => {
    it('returns all people separated by commas and "&"', () => {
      expect(concatenatePeople(['John', 'Jane', 'Jack'])).toBe(
        'John, Jane & Jack'
      )
    })
  })
})
