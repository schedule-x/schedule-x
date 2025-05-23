import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'
import { TranslationVariables } from '@schedule-x/shared/src/types/translations'
import { Signal } from '@preact/signals'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'

export const translate =
  (locale: Signal<string>, languages: Signal<Record<string, Language>>) =>
  (key: string, translationVariables?: TranslationVariables): string => {
    if (
      !/^[a-z]{2}-[A-Z]{2}$/.test(locale.value) &&
      'sr-Latn-RS' !== locale.value
    ) {
      throw new InvalidLocaleError(locale.value)
    }
    const deHyphenatedLocale = locale.value.replaceAll('-', '')
    const language = languages.value[deHyphenatedLocale]

    if (!language) return key

    let translation: string = language[key as keyof typeof language] || key

    Object.keys(translationVariables || {}).forEach((variable) => {
      const value = String(translationVariables?.[variable])
      if (!value) return

      translation = translation.replace(`{{${variable}}}`, value)
    })

    return translation
  }
