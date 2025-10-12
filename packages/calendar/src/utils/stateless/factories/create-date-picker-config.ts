import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'

export const createDatePickerConfig = (
  config: CalendarConfigExternal,
  dateSelectionCallback: (date: Temporal.PlainDate) => void
) => {
  let teleportTo: HTMLElement | undefined
  if (config.datePicker?.teleportTo) {
    teleportTo = config.datePicker.teleportTo
  }

  const dynamicPlacement = (datePickerWrapper: HTMLDivElement): Placement => {
    if (datePickerWrapper) {
      const rect = datePickerWrapper.getBoundingClientRect()
      const viewportCenterX = window.innerWidth / 2
      const isMoreOnLeftSide = rect.x + rect.width / 2 <= viewportCenterX
      return isMoreOnLeftSide ? Placement.BOTTOM_START : Placement.BOTTOM_END
    }
    return Placement.BOTTOM_END
  }

  return new DatePickerConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withTimezone(config.timezone)
    .withMin(config.minDate)
    .withMax(config.maxDate)
    .withTeleportTo(teleportTo)
    .withStyle(config.datePicker?.style)
    .withPlacement(dynamicPlacement)
    .withListeners({ onChange: dateSelectionCallback })
    .build()
}
