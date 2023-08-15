import { describe, expect, it } from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { translate } from '../translate'

describe('translate', () => {
  it('should return the key if the locale is en-US', () => {
    const locale = 'en-US'
    const translations = {
      'hello': 'world'
    }
    const key = 'hello'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return the key if the locale is de-DE', () => {
    const locale = 'de-DE'
    const translations = {
      'hello': 'welt'
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(translations[key])
  })

  it('should return key if the locale is not supported', () => {
    const locale = 'fr-FR'
    const translations = {
      'hello': 'monde'
    }
    const key = 'hello'

    const underTest = translate(locale, { deDE: translations })

    expect(underTest(key)).toEqual(key)
  })

  it('should return key if locale is supported, but key does not exist', () => {
    const locale = 'en-US'
    const translations = {
      'hello': 'world'
    }
    const key = 'goodbye'

    const underTest = translate(locale, { enUS: translations })

    expect(underTest(key)).toEqual(key)
  })
})
