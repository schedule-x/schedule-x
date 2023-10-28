import { View, ViewConfig } from '../../../types/view'
import { PreactViewComponent } from '../../../types/preact-view-component'
import { createElement, render as renderPreact } from 'preact'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'

class PreactView implements View {
  private randomId = randomStringId()

  public name: string
  public label: string
  public ComponentFn: PreactViewComponent
  public setDateRange: (config: RangeSetterConfig) => void
  public hasSmallScreenCompat: boolean
  public hasWideScreenCompat: boolean

  constructor(config: ViewConfig) {
    this.name = config.name
    this.label = config.label
    this.ComponentFn = config.ComponentFn
    this.setDateRange = config.setDateRange
    this.hasSmallScreenCompat = config.hasSmallScreenCompat
    this.hasWideScreenCompat = config.hasWideScreenCompat
  }

  render(onElement: HTMLElement, $app: CalendarAppSingleton): void {
    renderPreact(
      createElement(this.ComponentFn, { $app, id: this.randomId }),
      onElement
    )
  }

  destroy(): void {
    const el = document.getElementById(this.randomId)
    if (el) {
      el.remove()
    }
  }
}

export const createPreactView = (config: ViewConfig): View => {
  return new PreactView(config)
}
