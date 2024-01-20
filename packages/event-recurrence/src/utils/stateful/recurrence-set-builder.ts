import { RRule, RRuleSet } from 'rrule'
import { EventRRuleOptions } from '../../types/event-rrule-options'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'

/**
 * Note that unlike common builders, all public methods need to be called
 * in order to build a valid recurrence set.
 * */
export class RecurrenceSetBuilder {
  private rset: RRuleSet = new RRuleSet()

  constructor(public rruleOptions: Partial<EventRRuleOptions>) {}

  rrule(dtstart: Date) {
    this.rset.rrule(
      new RRule({
        ...this.rruleOptions,
        dtstart,
        until: this.getOptionUntil(),
        tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    )

    return this
  }

  exdate(exdate: string[] = []) {
    exdate.forEach((date) => {
      console.log(date)
      this.rset.exdate(toRRuleDatetime(date))
    })

    return this
  }

  build() {
    return this.rset
  }

  private getOptionUntil() {
    if (typeof this.rruleOptions.until !== 'string') return null

    return toRRuleDatetime(this.rruleOptions.until)
  }
}

export const RRValues = RRule
