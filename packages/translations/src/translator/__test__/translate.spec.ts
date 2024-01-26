import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { translate } from '../translate'
import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'

describe('translate', () => {
  it('should return the key if the locale is en-US', () => {
    const locale = 'en-US'
    const translations = {
      hello: 'world',
    }
    const key = 'hello'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return the key if the locale is de-DE', () => {
    const locale = 'de-DE'
    const translations = {
      hello: 'welt',
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return key if the locale is not supported', () => {
    const locale = 'fr-FR'
    const translations = {
      hello: 'monde',
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(key)
  })

  it('should return the key if the locale is ko-KR', () => {
    const locale = 'ko-KR'
    const translations = {
      hello: '월드',
    }
    const key = 'hello'

    const underTest = translate(locale, { koKR: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return key if locale is supported, but key does not exist', () => {
    const locale = 'en-US'
    const translations = {
      hello: 'world',
    }
    const key = 'goodbye'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(key)
  })

  it.each([
    ['enUS', true],
    ['en_US', true],
    ['en-us', true],
    ['en-US', false],
    ['en', true], // TODO: write alias map for short locale -> long locale and change this to false
  ])(
    'should throw if called with a faulty locale format %s',
    (locale, shouldThrow) => {
      const translations = {
        hello: 'world',
      }
      const key = 'hello'

      const underTest = translate(locale, { enUS: translations })

      if (shouldThrow) {
        expect(() => underTest(key)).toThrow(InvalidLocaleError)
      } else {
        expect(() => underTest(key)).not.toThrow()
      }
    }
  )

  /**
   * Background: if replacing the hyphen of the param "locale", instead of saving the result in a variable, this results
   * in unwanted mutation of the locale param for all calls but the first, leading to an error when de-DE becomes deDE etc.
   * */
  it('should be able to call the translate return value repeatedly', () => {
    const locale = 'en-US'
    const translations = {
      hello: 'world',
    }
    const key = 'hello'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(translations[key])
    expect(underTest(key)).toEqual(translations[key])
  })
})
