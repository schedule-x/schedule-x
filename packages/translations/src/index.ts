import { deDE } from './locales/de-DE'
import { enUS } from './locales/en-US'
import { datePickerDeDE } from './locales/de-DE/date-picker'
import { datePickerEnUS } from './locales/en-US/date-picker'
import { translate } from './translator/translate'

const translations = {
  deDE,
  enUS,
}

const datePickerTranslations = {
  deDE: datePickerDeDE,
  enUS: datePickerEnUS,
}

export type TranslateFn = (key: string) => string

export { translate, translations, datePickerTranslations, deDE, enUS }
