import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { translate } from '../translate'
import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'
import { Signal, signal } from '@preact/signals'

describe('translate', () => {
  it('should return the key if the locale is en-US', () => {
    const locale = signal('en-US')
    const translations = {
      hello: 'world',
    }
    const key = 'hello'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return the key if the locale is de-DE', () => {
    const locale = signal('de-DE')
    const translations = {
      hello: 'welt',
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return key if the locale is not supported', () => {
    const locale = signal('fr-FR')
    const translations = {
      hello: 'monde',
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(key)
  })

  it('should return the key if the locale is ko-KR', () => {
    const locale = signal('ko-KR')
    const translations = {
      hello: '월드',
    }
    const key = 'hello'

    const underTest = translate(locale, { koKR: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return the key if the locale is fr-FR', () => {
    const locale = signal('fr-FR')
    const translations = {
      hello: 'monde',
    }
    const key = 'hello'

    const underTest = translate(locale, { frFR: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return key if locale is supported, but key does not exist', () => {
    const locale = signal('en-US')
    const translations = {
      hello: 'world',
    }
    const key = 'goodbye'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(key)
  })

  it.each([
    [signal('enUS'), true],
    [signal('en_US'), true],
    [signal('en-us'), true],
    [signal('en-US'), false],
    [signal('en'), true], // TODO: write alias map for short locale -> long locale and change this to false
  ])(
    'should throw if called with a faulty locale format %s',
    (locale: Signal<string>, shouldThrow) => {
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
    const locale = signal('en-US')
    const translations = {
      hello: 'world',
    }
    const key = 'hello'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(translations[key])
    expect(underTest(key)).toEqual(translations[key])
  })

  it('should pass one translation variables to the translation', () => {
    const locale = signal('en-US')
    const translations = {
      hello: 'world {{name}}',
    }
    const key = 'hello'
    const name = 'Alice'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key, { name })).toEqual('world Alice')
  })

  it('should pass multiple translation variables to the translation', () => {
    const locale = signal('en-US')
    const translations = {
      hello: 'world {{name}} {{lastName}}',
    }
    const key = 'hello'
    const name = 'Alice'
    const lastName = 'Smith'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key, { name, lastName })).toEqual('world Alice Smith')
  })
})
