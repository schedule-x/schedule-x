import { View } from '../../../types/view'
import { PreactViewComponent } from '../../../types/preact-view-component'
import { createElement, render as renderPreact } from 'preact'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'

class PreactView implements View {
  private randomId = randomStringId()

  constructor(
    public name: string,
    public label: string,
    private ComponentFn: PreactViewComponent,
    public setDateRange: (config: RangeSetterConfig) => void
  ) {}

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

export const createPreactView = (
  name: string,
  label: string,
  ComponentFn: PreactViewComponent,
  setDateRange: (config: RangeSetterConfig) => void
): View => {
  return new PreactView(name, label, ComponentFn, setDateRange)
}
