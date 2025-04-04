import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getDirection } from '../get-direction'
import { afterEach } from 'vitest'

describe('getting the direction of the HTML document', () => {
  afterEach(() => {
    document.documentElement.innerHTML = ''
  })

  it('should return "ltr" when the document direction is not set', () => {
    const htmlElement = document.documentElement
    expect(htmlElement.getAttribute('dir')).toBeNull()
    expect(getDirection()).toBe('ltr')
  })

  it('should return "rtl" when the document direction is set to "rtl"', () => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute('dir', 'rtl')
    expect(getDirection()).toBe('rtl')
  })

  it('should return "ltr" when the document direction is set to "ltr"', () => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute('dir', 'ltr')
    expect(getDirection()).toBe('ltr')
  })
})
