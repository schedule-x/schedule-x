import { RRuleOptionsExternal } from './types/rrule-options'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import {
  applyTemporalShift,
  deriveTemporalShift,
} from './utils/stateless/temporal-shift'

export class RRuleUpdater {
  private rruleOptionsNew: RRuleOptionsExternal

  constructor(
    private readonly rruleOptions: RRuleOptionsExternal,
    private readonly dtstartOld: Temporal.ZonedDateTime | Temporal.PlainDate,
    private readonly dtstartNew: Temporal.ZonedDateTime | Temporal.PlainDate
  ) {
    this.rruleOptionsNew = { ...rruleOptions }
    this.updateByDay()
    this.updateByMonthDay()
    this.updateUntil()
  }

  updateByDay() {
    if (!this.rruleOptions.byday) return

    const daysDifference = calculateDaysDifference(
      this.dtstartOld instanceof Temporal.ZonedDateTime
        ? Temporal.PlainDate.from(this.dtstartOld.toPlainDate())
        : this.dtstartOld,
      this.dtstartNew instanceof Temporal.ZonedDateTime
        ? Temporal.PlainDate.from(this.dtstartNew.toPlainDate())
        : this.dtstartNew
    )

    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    const daysToShift = daysDifference % 7

    if (daysToShift === 0) return

    this.rruleOptionsNew.byday?.forEach((day, index) => {
      const dayIndex = days.indexOf(day)
      const newIndex = dayIndex + daysToShift

      if (newIndex >= days.length) {
        this.rruleOptionsNew.byday![index] = days[newIndex - days.length]
      } else if (newIndex < 0) {
        this.rruleOptionsNew.byday![index] = days[days.length + newIndex]
      } else {
        this.rruleOptionsNew.byday![index] = days[newIndex]
      }
    })
  }

  updateByMonthDay() {
    // For MONTHLY frequency, always set bymonthday unless there's a byday rule
    if (this.rruleOptions.freq === 'MONTHLY' && !this.rruleOptions.byday) {
      this.rruleOptionsNew.bymonthday = this.dtstartNew.day
    } else if (this.rruleOptions.bymonthday) {
      // For other frequencies, only update if it already exists
      this.rruleOptionsNew.bymonthday = this.dtstartNew.day
    }
  }

  updateUntil() {
    if (!this.rruleOptions.until || !this.rruleOptionsNew.until) return

    const shift = deriveTemporalShift(this.dtstartOld, this.dtstartNew)
    this.rruleOptionsNew.until = applyTemporalShift(
      this.rruleOptionsNew.until,
      shift
    )
  }

  getUpdatedRRuleOptions(): RRuleOptionsExternal {
    return this.rruleOptionsNew
  }
}
