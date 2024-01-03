import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import ScrollControllerConfig from './interfaces/config'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

class ScrollControllerPlugin implements PluginBase {
  name = PluginName.ScrollController
  private $app: CalendarAppSingleton | null = null

  constructor(private config: ScrollControllerConfig = {}) {}

  /**
   * @internal
   * */
  init($app: CalendarAppSingleton) {
    this.$app = $app
    const gridDay = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__time-grid-day')
    if (gridDay) this.scrollOnRender()
    else this.observeIfGridDayExistsThenScroll()
  }

  private observeIfGridDayExistsThenScroll() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const gridDayExists = Array.from(mutation.addedNodes).find((node) =>
          (node as HTMLElement).classList.contains('sx__time-grid-day')
        )
        if (mutation.type === 'childList' && gridDayExists) {
          this.scrollOnRender()
          observer.disconnect()
        }
      })
    })
    observer.observe(
      (this.$app as CalendarAppSingleton).elements
        .calendarWrapper as HTMLElement,
      {
        childList: true,
        subtree: true,
      }
    )
  }

  private scrollOnRender() {
    const $app = this.$app as CalendarAppSingleton
    const viewContainer = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__view-container') as HTMLElement
    const initialScroll = this.config.initialScroll

    const pixelsPerHour =
      $app.config.weekOptions.gridHeight / ($app.config.timePointsPerDay / 100)
    const scrollToTimePoint = timePointsFromString(initialScroll || '07:50')
    const hoursFromDayStart =
      $app.config.isHybridDay &&
      scrollToTimePoint < $app.config.dayBoundaries.start
        ? 2400 - $app.config.dayBoundaries.start + scrollToTimePoint
        : scrollToTimePoint - $app.config.dayBoundaries.start
    const hoursPointsToScroll = hoursFromDayStart / 100
    const pixelsToScroll = hoursPointsToScroll * pixelsPerHour
    viewContainer.scroll(0, pixelsToScroll)
  }
}

export const createScrollControllerPlugin = (
  config: ScrollControllerConfig = {}
) => new ScrollControllerPlugin(config)
