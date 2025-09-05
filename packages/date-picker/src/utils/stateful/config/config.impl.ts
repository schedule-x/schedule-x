import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { DatePickerListeners } from '@schedule-x/shared/src/interfaces/date-picker/listeners.interface'
import { DatePickerStyle } from '@schedule-x/shared/src/interfaces/date-picker/style.interface'
import { signal, Signal } from '@preact/signals'

import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export class ConfigImpl implements DatePickerConfigInternal {
  locale: Signal<string>
  firstDayOfWeek: Signal<WeekDay>
  timezone: Signal<IANATimezone>
  calendarSystem: Signal<'gregorian' | 'hebrew'>

  constructor(
    locale: string = DEFAULT_LOCALE,
    firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    timezone: IANATimezone = 'UTC',
    public min: Temporal.PlainDate,
    public max: Temporal.PlainDate,
    public placement: Placement = Placement.BOTTOM_START,
    public listeners: DatePickerListeners = {},
    public style: DatePickerStyle = {},
    public teleportTo?: HTMLElement,
    public label?: string,
    public name?: string,
    public disabled?: boolean,
    public hasPlaceholder?: boolean,
    calendarSystem?: 'gregorian' | 'hebrew'
  ) {
    this.min = this.min || Temporal.PlainDate.from({
      year: 1970,
      month: 1,
      day: 1,
    }).withCalendar(calendarSystem || 'gregorian')
    this.max = this.max || Temporal.PlainDate.from({
      year: new Date().getFullYear() + 50,
      month: 11,
      day: 31,
    }).withCalendar(calendarSystem || 'gregorian')
    this.locale = signal(locale)
    this.firstDayOfWeek = signal(firstDayOfWeek)
    this.timezone = signal(timezone)
    this.calendarSystem = signal(calendarSystem || 'gregorian')
  }
}
