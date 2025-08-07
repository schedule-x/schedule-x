import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { getDirection } from '../get-direction'

export const createDatePickerConfig = (
  config: CalendarConfigExternal,
  dateSelectionCallback: (date: Temporal.PlainDate) => void
) => {
  const isRtl = getDirection() === 'rtl'
  let teleportTo: HTMLElement | undefined
  if (config.datePicker?.teleportTo) {
    teleportTo = config.datePicker.teleportTo
  } else if (isRtl) {
    teleportTo = document.body
  }

  let placement = Placement.BOTTOM_END
  if (isRtl) {
    placement = Placement.BOTTOM_START
  }

  return new DatePickerConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withTimezone(config.timezone)
    .withMin(config.minDate)
    .withMax(config.maxDate)
    .withTeleportTo(teleportTo)
    .withStyle(config.datePicker?.style)
    .withPlacement(placement)
    .withListeners({ onChange: dateSelectionCallback })
    .build()
}
