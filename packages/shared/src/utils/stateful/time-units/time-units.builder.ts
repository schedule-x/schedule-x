import Builder from '../../../interfaces/builder.interface'
import TimeUnitsImpl from './time-units.impl'
import TimeUnits from './time-units.interface'
import Config from '../../../interfaces/config.interface'

export default class TimeUnitsBuilder implements Builder<TimeUnits> {
  private config: Config | undefined

  build(): TimeUnits {
    return new TimeUnitsImpl(this.config!)
  }

  withConfig(config: Config): TimeUnitsBuilder {
    this.config = config
    return this
  }
}
