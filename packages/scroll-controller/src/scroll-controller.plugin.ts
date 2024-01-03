import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import ScrollControllerConfig from './interfaces/config'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

class ScrollControllerPlugin implements PluginBase {
  name = PluginName.ScrollController
  private $app: CalendarAppSingleton | null = null
  private observer: MutationObserver | null = null

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

  destroy(): void {
    this.observer?.disconnect()
  }

  /**
   * @param {string} time - time in format 'HH:mm'
   * */
  scrollTo(time: string) {
    const $app = this.$app as CalendarAppSingleton
    const pixelsPerHour =
      $app.config.weekOptions.gridHeight / ($app.config.timePointsPerDay / 100)
    const scrollToTimePoint = timePointsFromString(time)

    const hoursFromDayStart =
      $app.config.isHybridDay &&
      scrollToTimePoint < $app.config.dayBoundaries.start
        ? 2400 - $app.config.dayBoundaries.start + scrollToTimePoint
        : scrollToTimePoint - $app.config.dayBoundaries.start
    const hoursPointsToScroll = hoursFromDayStart / 100
    const pixelsToScroll = hoursPointsToScroll * pixelsPerHour

    const viewContainer = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__view-container') as HTMLElement
    viewContainer.scroll(0, pixelsToScroll)
  }

  private observeIfGridDayExistsThenScroll() {
    /**
     * Do not disconnect observer, because it should be used on every subsequent visit to the week- or day view
     * */
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const gridDayExists = Array.from(mutation.addedNodes).find((node) =>
          (node as HTMLElement).classList.contains('sx__time-grid-day')
        )
        if (mutation.type === 'childList' && gridDayExists) {
          this.scrollOnRender()
        }
      })
    })
    this.observer.observe(
      (this.$app as CalendarAppSingleton).elements
        .calendarWrapper as HTMLElement,
      {
        childList: true,
        subtree: true,
      }
    )
  }

  private scrollOnRender() {
    this.scrollTo(this.config.initialScroll || '07:50')
  }
}

export const createScrollControllerPlugin = (
  config: ScrollControllerConfig = {}
) => new ScrollControllerPlugin(config)
