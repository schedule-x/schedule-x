import { RRuleUpdater } from '../rrule/rrule-updater'
import {
  parseTemporalToRFC5545,
  rruleJSToString,
  rruleStringToJS,
} from '../parsers/rrule/parse-rrule'
import { RRule } from '../rrule/rrule'
import { Recurrence } from '../types/recurrence'
import { RRuleOptionsExternal } from '../rrule/types/rrule-options'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'
import { compareTemporalDates } from '../rrule/utils/stateless/iterator-utils'

type RecurrenceSetOptions = {
  dtstart: Temporal.ZonedDateTime | Temporal.PlainDate
  dtend?: Temporal.ZonedDateTime | Temporal.PlainDate
  rrule: string
  exdate?: (Temporal.ZonedDateTime | Temporal.PlainDate)[] | undefined
  timezone?: IANATimezone
}

export class RecurrenceSet {
  private dtstart: Temporal.ZonedDateTime | Temporal.PlainDate
  public dtend: Temporal.ZonedDateTime | Temporal.PlainDate
  private rrule: RRuleOptionsExternal
  private exdate?:
    | Map<string, Temporal.ZonedDateTime | Temporal.PlainDate>
    | undefined
  private timezone: IANATimezone

  constructor(options: RecurrenceSetOptions) {
    this.timezone = options.timezone || 'UTC'
    this.dtstart = options.dtstart
    this.dtend = options.dtend || options.dtstart
    this.rrule = rruleStringToJS(options.rrule, this.timezone)

    // Ensure UNTIL type matches dtstart type
    if (this.rrule.until) {
      if (
        this.dtstart instanceof Temporal.ZonedDateTime &&
        this.rrule.until instanceof Temporal.PlainDate
      ) {
        // Convert PlainDate to ZonedDateTime matching previous end-of-day behaviour
        this.rrule.until = this.rrule.until.toZonedDateTime({
          timeZone: this.timezone,
          plainTime: Temporal.PlainTime.from('23:59'),
        })
      } else if (
        this.dtstart instanceof Temporal.PlainDate &&
        this.rrule.until instanceof Temporal.ZonedDateTime
      ) {
        // Convert ZonedDateTime to PlainDate
        this.rrule.until = this.rrule.until.toPlainDate()
      }
    }

    this.exdate = this.mapExdate(options.exdate)
  }

  getRecurrences(): Recurrence[] {
    const recurrences = new RRule(
      this.rrule,
      this.dtstart,
      this.dtend
    ).getRecurrences()

    return this.filterExdate(recurrences)
  }

  updateDtstartAndDtend(
    newDtstart: Temporal.ZonedDateTime | Temporal.PlainDate,
    newDtend: Temporal.ZonedDateTime | Temporal.PlainDate
  ) {
    const oldDtstart = this.dtstart
    const rruleUpdater = new RRuleUpdater(this.rrule, oldDtstart, newDtstart)

    this.rrule = rruleUpdater.getUpdatedRRuleOptions()
    this.dtstart = newDtstart
    this.dtend = newDtend
  }

  private mapExdate(
    exdate?: (Temporal.ZonedDateTime | Temporal.PlainDate)[]
  ): Map<string, Temporal.ZonedDateTime | Temporal.PlainDate> | undefined {
    if (!exdate?.length) return undefined

    const exdateMap = new Map<
      string,
      Temporal.ZonedDateTime | Temporal.PlainDate
    >()

    exdate.forEach((date) => {
      /**
       * If the exdate is the same as the dtstart,
       * we can't remove it anyways.
       */
      if (compareTemporalDates(date, this.dtstart) === 0) {
        return
      }

      exdateMap.set(parseTemporalToRFC5545(date), date)
    })

    return exdateMap
  }

  private filterExdate(recurrences: Recurrence[]): Recurrence[] {
    if (!this.exdate) return recurrences

    return recurrences.filter(
      (recurrence) =>
        !this.exdate?.has(parseTemporalToRFC5545(recurrence.start))
    )
  }

  getRrule() {
    return rruleJSToString(this.rrule)
  }

  getDtstart() {
    return this.dtstart
  }

  getDtend() {
    return this.dtend
  }

  getExdate() {
    return this.exdate
  }
}
