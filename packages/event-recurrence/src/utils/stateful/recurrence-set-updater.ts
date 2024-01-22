import { addDays, CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventRRuleOptions } from '../../types/event-rrule-options'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { RRule } from 'rrule'
import { RecurrenceRuleBuilder } from './recurrence-rule-builder'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'
import { EventRecurrenceCreator } from './event-recurrence-creator'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { calculateMinutesDifference } from '../stateless/calculate-minutes-difference'
import { addMinutesToDatetime } from '../stateless/add-minutes-to-datetime'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { ByWeekday } from 'rrule/dist/esm/types'

export class RecurrenceSetUpdater {
  constructor(private $app: CalendarAppSingleton) {}

  updateRecurrenceGroup(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ) {
    const eventToUpdate = this.$app.calendarEvents.list.value.find(
      (event) => event.id === eventId
    )
    if (!eventToUpdate) throw new Error(`Event with id ${eventId} not found`)

    this.deletePreviousRecurrences(eventId, eventToUpdate)
    this.updateRRule(eventToUpdate, oldEventStart, newEventStart)
    this.updateExdate(eventToUpdate, oldEventStart, newEventStart)
    this.updateStartAndEnd(eventToUpdate, oldEventStart, newEventStart)
    new EventRecurrenceCreator(this.$app).createEventRecurrenceGroup(
      eventToUpdate,
      eventToUpdate._getForeignProperties().rrule as EventRRuleOptions
    )
  }

  private deletePreviousRecurrences(
    eventId: number | string,
    eventToUpdate: CalendarEventInternal
  ) {
    this.$app.calendarEvents.list.value =
      this.$app.calendarEvents.list.value.filter(
        (event) => event.id !== eventId || event === eventToUpdate
      )
  }

  private updateStartAndEnd(
    eventToUpdate: CalendarEventInternal,
    oldEventStart: string,
    newEventStart: string
  ) {
    const minutesDifference = calculateMinutesDifference(
      oldEventStart,
      newEventStart
    )
    eventToUpdate.start = addMinutesToDatetime(
      eventToUpdate.start,
      minutesDifference
    )
    eventToUpdate.end = dateTimeStringRegex.test(eventToUpdate.start)
      ? addMinutesToDatetime(eventToUpdate.end, minutesDifference)
      : addDays(eventToUpdate.end, minutesDifference)
    this.$app.calendarEvents.list.value = [
      ...this.$app.calendarEvents.list.value,
    ]
  }

  private updateRRule(
    eventToUpdate: CalendarEventInternal,
    oldEventStart: string,
    newEventStart: string
  ) {
    const rruleOptions = eventToUpdate._getForeignProperties().rrule as
      | EventRRuleOptions
      | undefined
    if (!rruleOptions)
      throw new Error(`Event with id ${eventToUpdate.id} has no rrule`)

    const oldRRule = new RecurrenceRuleBuilder(
      toRRuleDatetime(eventToUpdate.start),
      rruleOptions
    ).build()
    const oldRRuleString = oldRRule.toString()
    const oldWeekdays = oldRRuleString.match(/BYDAY=([A-Z,]+)/)?.[1].split(',')
    const daysDifference = calculateDaysDifference(oldEventStart, newEventStart)
    if (rruleOptions.until) {
      rruleOptions.until = addDays(rruleOptions.until, daysDifference)
    }

    if (oldWeekdays)
      rruleOptions.byweekday = this.getUpdatedByWeekdayOption(
        daysDifference,
        oldWeekdays
      )
    eventToUpdate._getForeignProperties().rrule = rruleOptions
  }

  private getUpdatedByWeekdayOption(
    daysDifference: number,
    oldWeekdays: string[]
  ): ByWeekday[] {
    const daysToAdjust = daysDifference % 7
    const weekDaysAxis = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    const newWeekdays = oldWeekdays.map((weekday) => {
      const oldWeekdayIndex = weekDaysAxis.indexOf(weekday)
      const newWeekdayIndex = oldWeekdayIndex + daysToAdjust
      if (newWeekdayIndex > 6) return weekDaysAxis[newWeekdayIndex - 7]
      if (newWeekdayIndex < 0) return weekDaysAxis[newWeekdayIndex + 7]
      return weekDaysAxis[newWeekdayIndex]
    })
    return newWeekdays.map(
      (weekday) => RRule[weekday as keyof typeof RRule]
    ) as ByWeekday[]
  }

  private updateExdate(
    eventToUpdate: CalendarEventInternal,
    oldEventStart: string,
    newEventStart: string
  ) {
    const minutesDifference = calculateMinutesDifference(
      oldEventStart,
      newEventStart
    )
    const exdate = eventToUpdate._getForeignProperties().exdate
    if (!exdate) return

    eventToUpdate._getForeignProperties().exdate = (exdate as string[]).map(
      (date) => addMinutesToDatetime(date, minutesDifference)
    )
  }
}