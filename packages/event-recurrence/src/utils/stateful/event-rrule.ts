import { datetime, RRule, RRuleSet } from 'rrule'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { EventRRuleOptions } from '../../types/event-rrrule-options'

export class EventRRule {
  constructor(public options: Partial<EventRRuleOptions>) {}

  _createRecurrenceSet(dtstart: Date) {
    const rrset = new RRuleSet()
    rrset.rrule(
      new RRule({
        ...this.options,
        dtstart,
        until: this.getUntil(),
      })
    )

    return rrset
  }

  private getUntil() {
    if (typeof this.options.until !== 'string') return null

    const { year, month, date } = toIntegers(this.options.until)
    return datetime(year, month + 1, date)
  }
}

export const RRValues = RRule
