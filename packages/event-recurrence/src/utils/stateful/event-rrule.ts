import { RRule, RRuleSet } from 'rrule'
import { EventRRuleOptions } from '../../types/event-rrrule-options'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'

export class EventRRule {
  constructor(public options: Partial<EventRRuleOptions>) {}

  _createRecurrenceSet(dtstart: Date) {
    const rrset = new RRuleSet()
    rrset.rrule(
      new RRule({
        ...this.options,
        dtstart,
        until: this.getUntil(),
        tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    )

    return rrset
  }

  private getUntil() {
    if (typeof this.options.until !== 'string') return null

    return toRRuleDatetime(this.options.until)
  }
}

export const RRValues = RRule
