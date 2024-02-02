import { RRuleOptionsExternal } from './types/rrule-options'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { addDays, addMinutes } from '@schedule-x/shared/src'
import { getDurationInMinutes } from './utils/stateless/duration-in-minutes'

export class RRuleUpdater {
  private rruleOptionsNew: RRuleOptionsExternal

  constructor(
    private readonly rruleOptions: RRuleOptionsExternal,
    private readonly dtstartOld: string,
    private readonly dtstartNew: string
  ) {
    this.rruleOptionsNew = { ...rruleOptions }
    this.updateByDay()
    this.updateUntil()
  }

  updateByDay() {
    if (!this.rruleOptions.byday) return

    const daysDifference = calculateDaysDifference(
      this.dtstartOld,
      this.dtstartNew
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

  updateUntil() {
    if (!this.rruleOptions.until) return

    const isDateTime = dateTimeStringRegex.test(this.dtstartOld)
    this.rruleOptionsNew.until = isDateTime
      ? addMinutes(
          this.rruleOptionsNew.until!,
          getDurationInMinutes(this.dtstartOld, this.dtstartNew)
        )
      : addDays(
          this.rruleOptionsNew.until!,
          calculateDaysDifference(this.dtstartOld, this.dtstartNew)
        )
  }

  getUpdatedRRuleOptions(): RRuleOptionsExternal {
    return this.rruleOptionsNew
  }
}
