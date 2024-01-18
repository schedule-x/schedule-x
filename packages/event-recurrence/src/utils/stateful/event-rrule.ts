import { RRule, RRuleSet } from 'rrule'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { EventRRuleOptions } from '../../types/event-rrrule-options'
import { addTzOffsetToDatetime } from '../stateless/add-tz-offset-to-datetime'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'

export class EventRRule {
  constructor(public options: Partial<EventRRuleOptions>) {}

  _createRecurrenceSet(dtstart: Date) {
    const rrset = new RRuleSet()
    const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(tzid)
    rrset.rrule(
      new RRule({
        ...this.options,
        dtstart,
        until: this.getUntil(),
        tzid: tzid,
      })
    )

    return rrset
  }

  private getUntil() {
    if (typeof this.options.until !== 'string') return null

    // let untilDate = toJSDate(this.options.until)
    const untilDate = toRRuleDatetime(this.options.until)
    // let untilDate = toRRuleDatetime(addTzOffsetToDatetime(this.options.until))
    console.log(untilDate)
    return untilDate
  }
}

export const RRValues = RRule
