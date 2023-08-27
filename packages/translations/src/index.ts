import { deDE } from './locales/de-DE'
import { enUS } from './locales/en-US'
import { datePickerDeDE } from './locales/de-DE/date-picker'
import { datePickerEnUS } from './locales/en-US/date-picker'
import { translate } from './translator/translate'
import { enGB } from './locales/en-GB'
import { datePickerEnGB } from './locales/en-GB/date-picker'
import { svSE } from './locales/sv-SE'
import { datePickerSvSE } from './locales/sv-SE/date-picker'
import { zhCN } from './locales/zh-CN'
import { datePickerZhCN } from './locales/zh-CN/date-picker'

const translations = {
  deDE,
  enUS,
  enGB,
  svSE,
  zhCN,
}

const datePickerTranslations = {
  deDE: datePickerDeDE,
  enUS: datePickerEnUS,
  enGB: datePickerEnGB,
  svSE: datePickerSvSE,
  zhCN: datePickerZhCN,
}

export type TranslateFn = (key: string) => string

export { translate, translations, datePickerTranslations, deDE, enUS, enGB, svSE, zhCN }
