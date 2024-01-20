import { RRule, RRuleSet } from 'rrule'
import { EventRRuleOptions } from '../../types/event-rrule-options'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'

/**
 * Note that unlike common builders, all public methods need to be called
 * in order to build a valid recurrence set.
 * */
export class RecurrenceSetBuilder {
  private rset: RRuleSet = new RRuleSet()

  constructor(private dtstart: Date) {}

  build() {
    return this.rset
  }

  rrule(rruleOptions: Partial<EventRRuleOptions>) {
    this.rset.rrule(
      new RRule({
        ...rruleOptions,
        dtstart: this.dtstart,
        until: this.getOptionUntil(rruleOptions),
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

  private getOptionUntil(rruleOptions: Partial<EventRRuleOptions>) {
    if (typeof rruleOptions.until !== 'string') return null

    return toRRuleDatetime(rruleOptions.until)
  }
}

export const RRValues = RRule
