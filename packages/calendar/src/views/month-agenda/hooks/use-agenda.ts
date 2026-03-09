import { useEffect, useState } from 'preact/hooks'
import { Agenda } from '../types/month-agenda'
import { positionEventsInAgenda } from '../utils/stateless/position-events-in-agenda'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'

type CreateGridFn = (
  date: Temporal.ZonedDateTime,
  timeUnitsImpl: TimeUnits
) => Agenda

export function useAgenda(
  $app: CalendarAppSingleton,
  createGrid: CreateGridFn
): Agenda {
  const getAgenda = () => {
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value

    return positionEventsInAgenda(
      createGrid(
        $app.datePickerState.selectedDate.value.toZonedDateTime(
          $app.config.timezone.value
        ),
        $app.timeUnitsImpl
      ),
      filteredEvents.sort(sortEventsByStartAndEnd)
    )
  }

  const [agenda, setAgenda] = useState<Agenda>(getAgenda())

  useEffect(() => {
    setAgenda(getAgenda())
  }, [
    $app.datePickerState.selectedDate.value,
    $app.calendarEvents.list.value,
    $app.calendarEvents.filterPredicate.value,
  ])

  return agenda
}
