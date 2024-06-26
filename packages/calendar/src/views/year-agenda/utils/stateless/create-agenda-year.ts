import { toDateString } from '@schedule-x/shared/src'
import { YearAgenda as YearAgendaType } from '../../types/year-agenda'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
export const createAgendaYear = (date: string): YearAgendaType => {
  const { year } = toIntegers(date)
  return new Array(12).fill({}).map((data, index) => {
    const date = new Date()
    date.setFullYear(year, index, 1)
    return {
      date: toDateString(date),
      events: [],
    }
  })
}
