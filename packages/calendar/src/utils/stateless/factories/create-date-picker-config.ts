import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'

export const createDatePickerConfig = (
  config: CalendarConfigExternal,
  dateSelectionCallback: (date: string) => void
) =>
  new DatePickerConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withMin(config.minDate)
    .withMax(config.maxDate)
    .withTeleportTo(config.datePicker?.teleportTo)
    .withStyle(config.datePicker?.style)
    .withPlacement(Placement.BOTTOM_END)
    .withListeners({ onChange: dateSelectionCallback })
    .build()
