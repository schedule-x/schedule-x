import { Language } from '@schedule-x/shared/src/types/translations/language.translations'

/**
 * A function which can take an endless lists of arguments, all with the type Record<string, Language>
 * and merge them into a single Record<string, Language>,
 * always going over each key and merging the values of each key by means of spread operator
 * */
export const mergeLocales = (
  ...locales: Record<string, Language>[]
): Record<string, Language> => {
  const mergedLocales: Record<string, Language> = {}
  locales.forEach((locale) => {
    Object.keys(locale).forEach((key) => {
      mergedLocales[key] = { ...mergedLocales[key], ...locale[key] }
    })
  })
  return mergedLocales
}
