import { toDateString } from '@schedule-x/shared/src'
import { Month } from '@schedule-x/shared/src/enums/time/month.enum'
import { YearAgenda as YearAgendaType } from '../../types/year-agenda'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
export const createAgendaYear = (date: string): YearAgendaType => {
  const { year } = toIntegers(date)
  return Object.entries(Month).map((month, index) => {
    const date = new Date()
    date.setFullYear(year, index, 1)
    return {
      date: toDateString(date),
      events: [],
    }
  })
}
