import CalendarConfigInternal, {
  ColorDefinition,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

export default class EventColors {
  constructor(private config: CalendarConfigInternal) {}

  setLight() {
    Object.entries(this.config.calendars?.value || {}).forEach(
      ([calendarName, calendar]) => {
        if (!calendar.lightColors) {
          console.warn(`No light colors defined for calendar ${calendarName}`)
          return
        }

        this.setColors(
          calendar.colorName,
          calendar.lightColors as ColorDefinition
        )
      }
    )
  }

  setDark() {
    Object.entries(this.config.calendars?.value || {}).forEach(
      ([calendarName, calendar]) => {
        if (!calendar.darkColors) {
          console.warn(`No dark colors defined for calendar ${calendarName}`)
          return
        }

        this.setColors(
          calendar.colorName,
          calendar.darkColors as ColorDefinition
        )
      }
    )
  }

  private setColors(colorName: string, colorDefinition: ColorDefinition) {
    document.documentElement.style.setProperty(
      `--sx-color-${colorName}`,
      colorDefinition.main
    )
    document.documentElement.style.setProperty(
      `--sx-color-${colorName}-container`,
      colorDefinition.container
    )
    document.documentElement.style.setProperty(
      `--sx-color-on-${colorName}-container`,
      colorDefinition.onContainer
    )
  }
}
