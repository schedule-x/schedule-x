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
}

export const dateFormatLocalizedRules = new Map<string, DateFormatRule>([
  ['en-US', formatRules.slashMDY],
  ['en-GB', formatRules.slashDMY],
  ['zh-CN', formatRules.slashYMD],
  ['de-DE', formatRules.periodDMY],
  ['sv-SE', formatRules.dashYMD],
])
