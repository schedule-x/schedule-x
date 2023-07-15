import Builder from '../../../interfaces/builder.interface'
import { WeekDay } from '../../../enums/time/week-day.enum'
import TimeUnitsImpl from './time-units.impl'
import TimeUnits from './time-units.interface'

export default class TimeUnitsBuilder implements Builder<TimeUnits> {
  private firstDayOfWeek: WeekDay | undefined

  build(): TimeUnits {
    return new TimeUnitsImpl(this.firstDayOfWeek)
  }

  withFirstDayOfWeek(firstDayOfWeek: WeekDay | undefined): TimeUnitsBuilder {
    this.firstDayOfWeek = firstDayOfWeek

    return this
  }
}
