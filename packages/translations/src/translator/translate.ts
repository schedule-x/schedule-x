import { InvalidLocaleError } from '../../../../shared/utils/stateless/errors/InvalidLocale.error'

export const translate =
  (locale: string, languages: Record<string, object>) =>
  (key: string): string => {
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(locale))
      throw new InvalidLocaleError(locale)

    locale = locale.replace('-', '')
    const language = languages[locale]
    if (!language) return key

    return language[key as keyof typeof language] || key
  }
