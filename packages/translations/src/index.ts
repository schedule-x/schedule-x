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
import { jaJP } from './locales/ja-JP'
import { datePickerJaJP } from './locales/ja-JP/date-picker'
import { ruRU } from './locales/ru-RU'
import { datePickerRuRU } from './locales/ru-RU/date-picker'
import { koKR } from './locales/ko-KR'
import { datePickerKoKR } from './locales/ko-KR/date-picker'
import { daDK } from './locales/da-DK'
import { datePickerDaDK } from './locales/da-DK/date-picker'

import { translate } from './translator/translate'

const translations = {
  deDE,
  enUS,
  itIT,
  enGB,
  svSE,
  zhCN,
  jaJP,
  ruRU,
  koKR,
  daDK,
}

const datePickerTranslations = {
  deDE: datePickerDeDE,
  enUS: datePickerEnUS,
  itIT: datePickerItIT,
  enGB: datePickerEnGB,
  svSE: datePickerSvSE,
  zhCN: datePickerZhCN,
  jaJP: datePickerJaJP,
  ruRU: datePickerRuRU,
  koKR: datePickerKoKR,
  daDK: datePickerDaDK,
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
  jaJP,
  ruRU,
  koKR,
  daDK,
}
