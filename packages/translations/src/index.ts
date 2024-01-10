import { deDE } from './locales/de-DE'
import { datePickerDeDE } from './locales/de-DE/date-picker'
import { enUS } from './locales/en-US'
import { datePickerEnUS } from './locales/en-US/date-picker'
import { itIT } from './locales/it-IT'
import { datePickerItIT } from './locales/it-IT/date-picker'
import { enGB } from './locales/en-GB'
import { datePickerEnGB } from './locales/en-GB/date-picker'
import { svSE } from './locales/sv-SE'
import { datePickerSvSE } from './locales/sv-SE/date-picker'
import { zhCN } from './locales/zh-CN'
import { datePickerZhCN } from './locales/zh-CN/date-picker'

import { translate } from './translator/translate'

const translations = {
  deDE,
  enUS,
  itIT,
  enGB,
  svSE,
  zhCN,
}

const datePickerTranslations = {
  deDE: datePickerDeDE,
  enUS: datePickerEnUS,
  itIT: datePickerItIT,
  enGB: datePickerEnGB,
  svSE: datePickerSvSE,
  zhCN: datePickerZhCN,
}

export {
  translate,
  translations,
  datePickerTranslations,
  deDE,
  enUS,
  itIT,
  enGB,
  svSE,
  zhCN,
}
