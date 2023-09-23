import { InvalidLocaleError } from '@schedule-x/shared/src/utils/stateless/errors/InvalidLocale.error'

export const translate =
  (locale: string, languages: Record<string, object>) =>
  (key: string): string => {
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(locale))
      throw new InvalidLocaleError(locale)

    const deHyphenatedLocale = locale.replace('-', '')
    const language = languages[deHyphenatedLocale]
    if (!language) return key

    return language[key as keyof typeof language] || key
  }
