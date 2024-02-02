import { RRuleUpdater } from '../rrule/rrule-updater'
import { rruleJSToString, rruleStringToJS } from '../parsers/rrule/parse-rrule'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { getDurationInMinutes } from '../rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { addDays, addMinutes } from '@schedule-x/shared/src'

type RecurrenceSetOptions = {
  dtsart: string
  dtend?: string
  rrule: string
}

export class RecurrenceSet {
  private dtstart: string
  private dtend: string | undefined
  private rrule: string

  constructor(options: RecurrenceSetOptions) {
    this.dtstart = options.dtsart
    this.dtend = options.dtend
    this.rrule = options.rrule
  }

  updateDtstart(newDtstart: string) {
    const oldDtstart = this.dtstart
    const rruleUpdater = new RRuleUpdater(
      rruleStringToJS(this.rrule),
      this.dtstart,
      newDtstart
    )
    const isDateTime = dateTimeStringRegex.test(this.dtstart)

    this.rrule = rruleJSToString(rruleUpdater.getUpdatedRRuleOptions())
    this.dtstart = newDtstart
    this.dtend = isDateTime
      ? addMinutes(this.dtend!, getDurationInMinutes(oldDtstart, newDtstart))
      : addDays(this.dtend!, calculateDaysDifference(oldDtstart, newDtstart))
  }

  getRrule() {
    return this.rrule
  }

  getDtstart() {
    return this.dtstart
  }

  getDtend() {
    return this.dtend
  }
}
