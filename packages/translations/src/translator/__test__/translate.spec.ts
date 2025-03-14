import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { translate } from '../translate'
import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'
import { signal } from '@preact/signals'
import { stubInterface } from 'ts-sinon'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'

describe('translate', () => {
  it('should return the key if the locale is en-US', () => {
    const locale = signal('en-US')
    const key = 'Today'
    const Englisch = stubInterface<Language>()
    const languages = { enUS: Englisch }

    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(Englisch[key])
  })

  it('should return the key if the locale is de-DE', () => {
    const locale = signal('de-DE')
    const key = 'Today'
    const Deutsch = stubInterface<Language>()
    const languages = { deDE: Deutsch }

    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(Deutsch[key])
  })

  it('should return the key if the locale is ko-KR', () => {
    const locale = signal('ko-KR')
    const key = 'Today'
    const korean = stubInterface<Language>()
    const languages = { koKR: korean }

    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(korean[key])
  })

  it('should return the key if the locale is fr-FR', () => {
    const locale = signal('fr-FR')
    const key = 'Today'
    const french = stubInterface<Language>()
    const languages = { frFR: french }
    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(french[key])
  })

  it('should return key if locale is supported, but key does not exist', () => {
    const locale = signal('en-US')
    const key = 'Month'
    const English = stubInterface<Language>()
    English.Month = 'Month'
    const languages = { enUS: English }

    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(key)
  })

  it('should not throw for locale srLatnRS', () => {
    const locale = signal('sr-Latn-RS')
    const key = 'Today'
    const test = stubInterface<Language>()
    const languages = { srLatnRS: test }

    const underTest = translate(locale, signal(languages))

    expect(() => underTest(key)).not.toThrow()
  })

  it('should return Serbian translations with sr-Latn-RS locale', () => {
    const locale = signal('sr-Latn-RS')
    const key = 'Today'
    const serbian = stubInterface<Language>()
    const languages = { srLatnRS: serbian }
    const underTest = translate(locale, signal(languages))

    expect(underTest(key)).toEqual(serbian[key])
  })

  it.each([
    ['enUS', true],
    ['en_US', true],
    ['en-us', true],
    ['en-US', false],
    ['en', true], // TODO: write alias map for short locale -> long locale and change this to false
  ])(
    'should throw if called with a faulty locale format %s',
    (localeRaw: string, shouldThrow: boolean) => {
      const locale = signal(localeRaw)
      const English = stubInterface<Language>()
      English.Month = 'Month'
      const key = 'hello'

      const underTest = translate(locale, signal({ enUS: English }))

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
    const English = stubInterface<Language>()
    English.Week = 'Week'
    const key = 'Week'

    const reactiveTranslations = signal({ enUS: English })
    const underTest = translate(locale, reactiveTranslations)

    expect(underTest(key)).toEqual(key)
    expect(underTest(key)).toEqual(key)
  })

  it('should pass one translation variables to the translation', () => {
    const locale = signal('en-US')
    const English = stubInterface<Language>()
    English['Link to 1 more event on {{date}}'] =
      'Link to 1 more event on {{date}}'

    const underTest = translate(locale, signal({ enUS: English }))

    expect(
      underTest('Link to 1 more event on {{date}}', { date: 'January 1' })
    ).toEqual('Link to 1 more event on January 1')
  })

  it('should pass multiple translation variables to the translation', () => {
    const locale = signal('en-US')
    const English = stubInterface<Language>()
    English['Link to {{n}} more events on {{date}}'] =
      'Link to {{n}} more events on {{date}}'

    const underTest = translate(locale, signal({ enUS: English }))

    expect(
      underTest('Link to {{n}} more events on {{date}}', {
        n: 1,
        date: 'January 1',
      })
    ).toEqual('Link to 1 more events on January 1')
  })
})
