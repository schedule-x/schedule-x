import { arEG } from './locales/ar-EG'
import { datePickerArEG } from './locales/ar-EG/date-picker'
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
import { zhTW } from './locales/zh-TW'
import { datePickerZhTW } from './locales/zh-TW/date-picker'
import { jaJP } from './locales/ja-JP'
import { datePickerJaJP } from './locales/ja-JP/date-picker'
import { ruRU } from './locales/ru-RU'
import { datePickerRuRU } from './locales/ru-RU/date-picker'
import { koKR } from './locales/ko-KR'
import { datePickerKoKR } from './locales/ko-KR/date-picker'
import { frFR } from './locales/fr-FR'
import { datePickerFrFR } from './locales/fr-FR/date-picker'
import { frCH } from './locales/fr-CH'
import { datePickerFrCH } from './locales/fr-CH/date-picker'
import { daDK } from './locales/da-DK'
import { datePickerDaDK } from './locales/da-DK/date-picker'
import { plPL } from './locales/pl-PL'
import { datePickerPlPL } from './locales/pl-PL/date-picker'
import { esES } from './locales/es-ES'
import { datePickerEsES } from './locales/es-ES/date-picker'
import { nlNL } from './locales/nl-NL'
import { datePickerNlNL } from './locales/nl-NL/date-picker'
import { ptBR } from './locales/pt-BR'
import { datePickerPtBR } from './locales/pt-BR/date-picker'
import { skSK } from './locales/sk-SK'
import { datePickerSkSK } from './locales/sk-SK/date-picker'
import { mkMK } from './locales/mk-MK'
import { datePickerMkMK } from './locales/mk-MK/date-picker'
import { nbNO } from './locales/nb-NO'
import { datePickerNbNO } from './locales/nb-NO/date-picker'
import { trTR } from './locales/tr-TR'
import { datePickerTrTR } from './locales/tr-TR/date-picker'
import { kyKG } from './locales/ky-KG'
import { datePickerKyKG } from './locales/ky-KG/date-picker'
import { idID } from './locales/id-ID'
import { datePickerIdID } from './locales/id-ID/date-picker'
import { csCZ } from './locales/cs-CZ'
import { datePickerCsCZ } from './locales/cs-CZ/date-picker'
import { etEE } from './locales/et-EE'
import { datePickerEtEE } from './locales/et-EE/date-picker'
import { ukUA } from './locales/uk-UA'
import { datePickerUkUA } from './locales/uk-UA/date-picker'
import { srLatnRS } from './locales/sr-Latn-RS'
import { datePickerSrLatnRS } from './locales/sr-Latn-RS/date-picker'
import { caES } from './locales/ca-ES'
import { datePickerCaES } from './locales/ca-ES/date-picker'
import { srRS } from './locales/sr-RS'
import { datePickerSrRS } from './locales/sr-RS/date-picker'
import { ltLT } from './locales/lt-LT'
import { datePickerLtLT } from './locales/lt-LT/date-picker'
import { hrHR } from './locales/hr-HR'
import { datePickerHrHR } from './locales/hr-HR/date-picker'
import { slSI } from './locales/sl-SI'
import { datePickerSlSI } from './locales/sl-SI/date-picker'
import { fiFI } from './locales/fi-FI'
import { datePickerFiFI } from './locales/fi-FI/date-picker'
import { roRO } from './locales/ro-RO'
import { datePickerRoRO } from './locales/ro-RO/date-picker'
import { faIR } from './locales/fa-IR'
import { datePickerFaIR } from './locales/fa-IR/date-picker'

import { translate } from './translator/translate'
import { mergeLocales } from './utils/merge-locales'
import { heIL } from './locales/he-IL'
import { datePickerHeIL } from './locales/he-IL/date-picker'

const translations = {
  deDE,
  enUS,
  itIT,
  enGB,
  svSE,
  zhCN,
  zhTW,
  jaJP,
  ruRU,
  koKR,
  frFR,
  daDK,
  mkMK,
  nbNO,
  plPL,
  heIL,
  esES,
  nlNL,
  ptBR,
  skSK,
  trTR,
  kyKG,
  idID,
  csCZ,
  etEE,
  ukUA,
  caES,
  srLatnRS,
  srRS,
  ltLT,
  hrHR,
  slSI,
  fiFI,
  roRO,
  faIR,
  arEG,
}

const datePickerTranslations = {
  deDE: datePickerDeDE,
  enUS: datePickerEnUS,
  itIT: datePickerItIT,
  enGB: datePickerEnGB,
  svSE: datePickerSvSE,
  zhCN: datePickerZhCN,
  zhTW: datePickerZhTW,
  jaJP: datePickerJaJP,
  ruRU: datePickerRuRU,
  koKR: datePickerKoKR,
  frFR: datePickerFrFR,
  frCH: datePickerFrCH,
  daDK: datePickerDaDK,
  mkMK: datePickerMkMK,
  nbNO: datePickerNbNO,
  plPL: datePickerPlPL,
  esES: datePickerEsES,
  nlNL: datePickerNlNL,
  ptBR: datePickerPtBR,
  skSK: datePickerSkSK,
  trTR: datePickerTrTR,
  kyKG: datePickerKyKG,
  idID: datePickerIdID,
  csCZ: datePickerCsCZ,
  etEE: datePickerEtEE,
  ukUA: datePickerUkUA,
  caES: datePickerCaES,
  srLatnRS: datePickerSrLatnRS,
  srRS: datePickerSrRS,
  ltLT: datePickerLtLT,
  hrHr: datePickerHrHR,
  slSI: datePickerSlSI,
  fiFI: datePickerFiFI,
  roRO: datePickerRoRO,
  heIL: datePickerHeIL,
  faIR: datePickerFaIR,
  arEG: datePickerArEG,
}

export {
  mergeLocales,
  translate,
  translations,
  datePickerTranslations,
  deDE,
  enUS,
  itIT,
  enGB,
  svSE,
  zhCN,
  zhTW,
  jaJP,
  ruRU,
  koKR,
  frFR,
  frCH,
  daDK,
  plPL,
  esES,
  mkMK,
  nbNO,
  nlNL,
  ptBR,
  skSK,
  trTR,
  kyKG,
  idID,
  csCZ,
  etEE,
  ukUA,
  caES,
  srLatnRS,
  ltLT,
  hrHR,
  slSI,
  fiFI,
  roRO,
  heIL,
  faIR,
  arEG,
}
