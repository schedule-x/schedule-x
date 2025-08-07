import { RRuleUpdater } from '../rrule/rrule-updater'
import {
  parseSXToRFC5545,
  parseRFC5545ToSX,
  rruleJSToString,
  rruleStringToJS,
  parseRFC5545ToTemporal,
} from '../parsers/rrule/parse-rrule'
import { RRule } from '../rrule/rrule'
import { Recurrence } from '../types/recurrence'
import { RRuleOptionsExternal } from '../rrule/types/rrule-options'

type RecurrenceSetOptions = {
  dtstart: string
  dtend?: string
  rrule: string
  exdate?: string[] | undefined
}

export class RecurrenceSet {
  private dtstart: string
  public dtend: string
  private rrule: RRuleOptionsExternal
  private exdate?: Map<string, boolean> | undefined

  constructor(options: RecurrenceSetOptions) {
    this.dtstart = parseRFC5545ToSX(options.dtstart)
    this.dtend = parseRFC5545ToSX(options.dtend || options.dtstart)
    this.rrule = rruleStringToJS(options.rrule)
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

  updateDtstartAndDtend(newDtstart: string, newDtend: string) {
    newDtstart = parseRFC5545ToSX(newDtstart)
    const oldDtstart = this.dtstart
    const rruleUpdater = new RRuleUpdater(this.rrule, oldDtstart, newDtstart)

    this.rrule = rruleUpdater.getUpdatedRRuleOptions()
    this.dtstart = newDtstart
    this.dtend = newDtend
  }

  private mapExdate(exdate?: string[]): Map<string, boolean> | undefined {
    if (!exdate?.length) return undefined

    const exdateMap = new Map<string, boolean>()

    exdate.forEach((date) => {
      const parsedDate = parseRFC5545ToSX(date)

      /**
       * If the exdate is the same as the dtstart,
       * we can't remove it anyways.
       */
      if (parsedDate === this.dtstart) {
        return
      }

      exdateMap.set(parsedDate, true)
    })

    return exdateMap
  }

  private filterExdate(recurrences: Recurrence[]): Recurrence[] {
    if (!this.exdate) return recurrences

    return recurrences.filter(
      (recurrence) => !this.exdate?.has(recurrence.start)
    )
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

  getExdate() {
    return this.exdate
  }
}
