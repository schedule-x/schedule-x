export type TranslationVariables = { [key: string]: string | number }
export type TranslateFn = (
  key: string,
  variables?: TranslationVariables
) => string
