import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { ResourceWeek, ResourceDaySlot } from '../../types/resource'
import { Resource } from '@schedule-x/shared/src/types/calendar/resource'

const createResourceDaySlot = (
  date: Temporal.ZonedDateTime,
  resource: Resource
): ResourceDaySlot => {
  return {
    date: toDateString(date),
    resource,
    timeGridEvents: [],
    dateGridEvents: [],
    backgroundEvents: [],
  }
}

const createOneDay = (
  week: ResourceWeek,
  date: Temporal.ZonedDateTime,
  resources: Resource[]
): ResourceWeek => {
  const dateString = toDateString(date)
  week[dateString] = {}

  for (const resource of resources) {
    week[dateString][resource.id] = createResourceDaySlot(date, resource)
  }

  return week
}

export const createResourceWeek = (
  $app: CalendarAppSingleton
): ResourceWeek => {
  const resources = $app.config.resources.value
  const nDays = $app.config.resourceGridOptions.value.nDays

  const days = $app.timeUnitsImpl
    .getWeekFor($app.datePickerState.selectedDate.value)
    .slice(0, nDays)

  return days.reduce(
    (acc, date) => createOneDay(acc, date, resources),
    {} as ResourceWeek
  )
}
