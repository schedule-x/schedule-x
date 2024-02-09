import { RRuleUpdater } from '../rrule/rrule-updater'
import {
  parseSXToRFC5545,
  parseRFC5545ToSX,
  rruleJSToString,
  rruleStringToJS,
} from '../parsers/rrule/parse-rrule'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { getDurationInMinutes } from '../rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { addDays, addMinutes } from '@schedule-x/shared/src'
import { RRule } from '../rrule/rrule'
import { Recurrence } from '../types/recurrence'
import { RRuleOptionsExternal } from '../rrule/types/rrule-options'

type RecurrenceSetOptions = {
  dtstart: string
  dtend?: string
  rrule: string
}

export class RecurrenceSet {
  private dtstart: string
  private dtend: string
  private rrule: RRuleOptionsExternal

  constructor(options: RecurrenceSetOptions) {
    this.dtstart = parseRFC5545ToSX(options.dtstart)
    this.dtend = parseRFC5545ToSX(options.dtend || options.dtstart)
    this.rrule = rruleStringToJS(options.rrule)
  }

  getRecurrences(): Recurrence[] {
    const recurrences: Recurrence[] = []
    recurrences.push(
      ...new RRule(this.rrule, this.dtstart, this.dtend).getRecurrences()
    )

    return recurrences
  }

  updateDtstart(newDtstart: string) {
    newDtstart = parseRFC5545ToSX(newDtstart)
    const oldDtstart = this.dtstart
    const rruleUpdater = new RRuleUpdater(this.rrule, oldDtstart, newDtstart)

    this.rrule = rruleUpdater.getUpdatedRRuleOptions()
    this.dtstart = newDtstart
    this.dtend = dateTimeStringRegex.test(oldDtstart)
      ? addMinutes(this.dtend!, getDurationInMinutes(oldDtstart, newDtstart))
      : addDays(this.dtend!, calculateDaysDifference(oldDtstart, newDtstart))
  }

  getRrule() {
    return rruleJSToString(this.rrule)
  }

  getDtstart() {
    return parseSXToRFC5545(this.dtstart)
  }

  getDtend() {
    return parseSXToRFC5545(this.dtend)
  }
}
