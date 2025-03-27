import {
  DateFormatDelimiter,
  DateFormatOrder,
} from '../../../../../enums/time/date-format'

type DateFormatRule = {
  delimiter: DateFormatDelimiter
  order: DateFormatOrder
}

const formatRules = {
  slashMDY: {
    delimiter: DateFormatDelimiter.SLASH,
    order: DateFormatOrder.MDY,
  },
  slashDMY: {
    delimiter: DateFormatDelimiter.SLASH,
    order: DateFormatOrder.DMY,
  },
  slashYMD: {
    delimiter: DateFormatDelimiter.SLASH,
    order: DateFormatOrder.YMD,
  },
  periodDMY: {
    delimiter: DateFormatDelimiter.PERIOD,
    order: DateFormatOrder.DMY,
  },
  dashYMD: {
    delimiter: DateFormatDelimiter.DASH,
    order: DateFormatOrder.YMD,
  },
  dashDMY: {
    delimiter: DateFormatDelimiter.DASH,
    order: DateFormatOrder.DMY,
  },
}

export const dateFormatLocalizedRules = new Map<string, DateFormatRule>([
  ['ca-ES', formatRules.slashDMY],
  ['cs-CZ', formatRules.periodDMY],
  ['da-DK', formatRules.periodDMY],
  ['de-DE', formatRules.periodDMY],
  ['en-GB', formatRules.slashDMY],
  ['en-US', formatRules.slashMDY],
  ['es-ES', formatRules.slashDMY],
  ['et-EE', formatRules.periodDMY],
  ['fi-FI', formatRules.periodDMY],
  ['fr-FR', formatRules.slashDMY],
  ['hr-HR', formatRules.periodDMY],
  ['id-ID', formatRules.slashDMY],
  ['it-IT', formatRules.slashDMY],
  ['ja-JP', formatRules.slashYMD],
  ['ko-KR', formatRules.slashYMD],
  ['ky-KG', formatRules.slashDMY],
  ['lt-LT', formatRules.dashYMD],
  ['mk-MK', formatRules.periodDMY],
  ['nl-NL', formatRules.dashDMY],
  ['pl-PL', formatRules.periodDMY],
  ['pt-BR', formatRules.slashDMY],
  ['ro-RO', formatRules.periodDMY],
  ['ru-RU', formatRules.periodDMY],
  ['sk-SK', formatRules.periodDMY],
  ['sl-SI', formatRules.periodDMY],
  ['sr-Latn-RS', formatRules.periodDMY],
  ['sr-RS', formatRules.periodDMY],
  ['sv-SE', formatRules.dashYMD],
  ['tr-TR', formatRules.periodDMY],
  ['uk-UA', formatRules.periodDMY],
  ['zh-CN', formatRules.slashYMD],
  ['zh-TW', formatRules.slashYMD],
])
