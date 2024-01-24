import { EventRRuleOptions } from '../../types/event-rrule-options'
import { RRule } from 'rrule'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'

export class RecurrenceRuleBuilder {
  constructor(
    private dtstart: Date,
    private rruleOptions: Partial<EventRRuleOptions>
  ) {}

  build() {
    return new RRule({
      ...this.rruleOptions,
      dtstart: this.dtstart,
      until: this.getOptionUntil(),
      tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  }

  private getOptionUntil() {
    if (typeof this.rruleOptions.until !== 'string') return null

    return toRRuleDatetime(this.rruleOptions.until)
  }
}
