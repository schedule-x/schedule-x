import { calculateDaysDifference } from '@schedule-x/shared/src/utils/stateless/time/days-difference'
import {
  addDays,
  addMinutesToTemporal,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { getDurationInMinutesTemporal } from './duration-in-minutes'

export type TemporalShift =
  | { kind: 'timed'; minutes: number }
  | { kind: 'date'; days: number }

export const deriveTemporalShift = (
  from: Temporal.ZonedDateTime | Temporal.PlainDate,
  to: Temporal.ZonedDateTime | Temporal.PlainDate
): TemporalShift => {
  if (
    from instanceof Temporal.ZonedDateTime &&
    to instanceof Temporal.ZonedDateTime
  ) {
    return {
      kind: 'timed',
      minutes: getDurationInMinutesTemporal(from, to),
    }
  }

  const fromPlain = Temporal.PlainDate.from(from)
  const toPlain = Temporal.PlainDate.from(to)

  return {
    kind: 'date',
    days: calculateDaysDifference(fromPlain, toPlain),
  }
}

export const applyTemporalShift = <
  T extends Temporal.ZonedDateTime | Temporal.PlainDate,
>(
  value: T,
  shift: TemporalShift
): T => {
  if (shift.kind === 'timed') {
    if (!(value instanceof Temporal.ZonedDateTime)) {
      throw new Error(
        'Expected ZonedDateTime when applying timed temporal shift'
      )
    }

    const result = addMinutesToTemporal(value, shift.minutes)
    if (!(result instanceof Temporal.ZonedDateTime)) {
      throw new Error('Timed temporal shift must return a ZonedDateTime value')
    }

    return result as T
  }

  if (!(value instanceof Temporal.PlainDate)) {
    throw new Error('Expected PlainDate when applying date temporal shift')
  }

  const result = addDays(value, shift.days)
  if (!(result instanceof Temporal.PlainDate)) {
    throw new Error('Date temporal shift must return a PlainDate value')
  }

  return result as T
}

export const expectZonedDateTime = (
  value: Temporal.ZonedDateTime | Temporal.PlainDate,
  errorMessage = 'Expected ZonedDateTime value'
): Temporal.ZonedDateTime => {
  if (!(value instanceof Temporal.ZonedDateTime)) {
    throw new Error(errorMessage)
  }

  return value
}
