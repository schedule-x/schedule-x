import { RRule, RRuleSet } from 'rrule'
import { EventRRuleOptions } from '../../types/event-rrule-options'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'
import { RecurrenceRuleBuilder } from './recurrence-rule-builder'

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
      new RecurrenceRuleBuilder(this.dtstart, rruleOptions).build()
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
}

export const RRValues = RRule
