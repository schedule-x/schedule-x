import { createElement, render } from 'preact'
import CalendarWrapper from './components/calendar-wrapper'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import EventsFacadeImpl from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.impl'
import { CustomComponentFn } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { CustomComponentFns } from '@schedule-x/shared/src/interfaces/calendar/custom-component-fns'
import { invokePluginsBeforeRender } from './utils/stateless/plugins-lifecycle'
import { PluginBase } from '@schedule-x/shared/src'

export default class CalendarApp {
  public events: EventsFacade
  private calendarContainerEl: HTMLElement | undefined

  constructor(private $app: CalendarAppSingleton) {
    this.events = new EventsFacadeImpl(this.$app)
    invokePluginsBeforeRender(this.$app)

    Object.values(this.$app.config.plugins).forEach((plugin) => {
      if (!plugin?.name) return

      // "hack" for enabling accessing plugins via calendarApp[pluginName]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this[plugin.name] = plugin as PluginBase<string>
    })

    if ($app.config.callbacks?.beforeRender) {
      $app.config.callbacks.beforeRender($app)
    }
  }

  render(el: HTMLElement): void {
    this.calendarContainerEl = el
    render(createElement(CalendarWrapper, { $app: this.$app }), el)
  }

  destroy(): void {
    Object.values(this.$app.config.plugins || {}).forEach((plugin) => {
      if (!plugin || !plugin.destroy) return

      plugin.destroy()
    })

    if (this.calendarContainerEl) {
      render(null, this.calendarContainerEl)
    }
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.$app.calendarState.isDark.value = theme === 'dark'
  }

  getTheme(): 'light' | 'dark' {
    return this.$app.calendarState.isDark.value ? 'dark' : 'light'
  }

  /**
   * @internal
   * Purpose: To be consumed by framework adapters for custom component rendering.
   * */
  _setCustomComponentFn(fnId: keyof CustomComponentFns, fn: CustomComponentFn) {
    this.$app.config._customComponentFns[fnId] = fn
  }

  _setDestroyCustomComponentInstanceCallback(cb: (ccid: string) => void) {
    this.$app.config._destroyCustomComponentInstanceCallback = cb
  }
}
