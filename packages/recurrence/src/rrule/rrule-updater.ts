import { RRuleOptionsExternal } from './types/rrule-options'
import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { getDurationInMinutesTemporal } from './utils/stateless/duration-in-minutes'
import { addMinutesToTemporal } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

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
    if (!this.rruleOptions.until) return

    const isDateTime = this.dtstartOld instanceof Temporal.ZonedDateTime
    this.rruleOptionsNew.until = isDateTime
      ? addMinutesToTemporal(
          this.rruleOptionsNew.until as Temporal.ZonedDateTime,
          getDurationInMinutesTemporal(
            this.dtstartOld as Temporal.ZonedDateTime,
            this.dtstartNew as Temporal.ZonedDateTime
          )
        )
      : addDays(
          this.rruleOptionsNew.until as Temporal.PlainDate,
          calculateDaysDifference(
            this.dtstartOld as Temporal.PlainDate,
            this.dtstartNew as Temporal.PlainDate
          )
        )
  }

  getUpdatedRRuleOptions(): RRuleOptionsExternal {
    return this.rruleOptionsNew
  }
}
