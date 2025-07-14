import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { signal } from '@preact/signals'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import Config from '@schedule-x/shared/src/interfaces/config.interface'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export const getFirstEventElement = (calendarEl: HTMLDivElement) =>
  calendarEl.querySelector('.sx__event') as HTMLDivElement

export const createBaseConfig = (
  config: { locale?: string; firstDayOfWeek?: WeekDay, timezone?: IANATimezone } = {}
): Config => ({
  locale: signal(config.locale || DEFAULT_LOCALE),
  firstDayOfWeek: signal(config.firstDayOfWeek ?? DEFAULT_FIRST_DAY_OF_WEEK),
  timezone: signal(config.timezone ?? 'Europe/Berlin'),
})
