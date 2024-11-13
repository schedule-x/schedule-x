import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'
import { TranslationVariables } from '@schedule-x/shared/src/types/translations'
import { Signal } from '@preact/signals'
import { CustomLocale } from '@schedule-x/shared/src/types/customLocale'

export const translate =
  (
    locale: Signal<string>,
    languages: Record<string, object>,
    customLocale: CustomLocale
  ) =>
  (key: string, translationVariables?: TranslationVariables): string => {
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(locale.value))
      throw new InvalidLocaleError(locale.value)

    let language = {}
    // Überprüfe, ob ein customLocale vorhanden ist und verwende es
    if (customLocale.value) {
      language = customLocale.value
      console.log(language)
    } else {
      const deHyphenatedLocale = locale.value.replace('-', '')
      language = languages[deHyphenatedLocale]
      console.log(language)
    }

    if (!language) return key
    let translation: string = language[key as keyof typeof language] || key
    Object.keys(translationVariables || {}).forEach((variable) => {
      const value = String(translationVariables?.[variable])
      if (!value) return
      translation = translation.replace(`{{${variable}}}`, value)
    })
    return translation
  }
