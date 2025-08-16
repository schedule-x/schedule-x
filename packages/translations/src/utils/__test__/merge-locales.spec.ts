import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { mergeLocales } from '../merge-locales'
import { enUS } from '../../locales/en-US'
import { deDE } from '../../locales/de-DE'

describe('merging locales', () => {
  it('should merge three locale sources of enUS', () => {
    const enUS1 = {
      ...enUS,
      hello: 'Hello',
      goodbye: 'Goodbye',
    }
    const enUS2 = {
      ...enUS,
      hello: 'Hi',
      thankYou: 'Thank you',
    }
    const enUS3 = {
      ...enUS,
      thankYou: 'Thanks',
      say: 'Say',
    }

    const merged = mergeLocales(
      { enUS: enUS1 },
      { enUS: enUS2 },
      { enUS: enUS3 }
    )

    expect(merged).toEqual({
      enUS: {
        ...enUS,
        hello: 'Hi',
        goodbye: 'Goodbye',
        thankYou: 'Thanks',
        say: 'Say',
      },
    })
  })

  it('should merge 2 locale sources of enUS and deDE, when deDE is only present in one source', () => {
    const enUS1 = {
      ...enUS,
      hello: 'Hello',
      goodbye: 'Goodbye',
    }
    const enUS2 = {
      ...enUS,
      hello: 'Hi',
      thankYou: 'Thank you',
    }
    const deDE1 = {
      ...deDE,
      hello: 'Hallo',
      goodbye: 'Auf Wiedersehen',
    }

    const merged = mergeLocales({ enUS: enUS1, deDE: deDE1 }, { enUS: enUS2 })

    expect(merged).toEqual({
      enUS: {
        ...enUS,
        hello: 'Hi',
        goodbye: 'Goodbye',
        thankYou: 'Thank you',
      },
      deDE: {
        ...deDE,
        hello: 'Hallo',
        goodbye: 'Auf Wiedersehen',
      },
    })
  })
})
