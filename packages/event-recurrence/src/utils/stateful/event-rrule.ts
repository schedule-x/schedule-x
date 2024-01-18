import { RRule, RRuleSet } from 'rrule'
import {
  toJSDate,
  toJSDateUTC,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { EventRRuleOptions } from '../../types/event-rrrule-options'
import { addTzOffsetToDatetime } from '../stateless/add-tz-offset-to-datetime'
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
        // tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    )

    return rrset
  }

  private getUntil() {
    if (typeof this.options.until !== 'string') return null

    // let untilDate = toJSDateUTC(addTzOffsetToDatetime(this.options.until))
    // const untilDate = toRRuleDatetime(this.options.until)
    const untilDate = toRRuleDatetime(addTzOffsetToDatetime(this.options.until))
    // let untilDate = toJSDate(addTzOffsetToDatetime(this.options.until))
    console.log('until', untilDate)
    return untilDate
  }
}

export const RRValues = RRule
