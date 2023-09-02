import { View } from '../../../types/view'
import { PreactViewComponent } from '../../../types/preact-view-component'
import { createElement, render as renderPreact } from 'preact'
import CalendarAppSingleton from '../app-singleton/calendar-app-singleton'

class PreactView implements View {
  private randomId = Math.random().toString(36).substring(7)

  constructor(
    public name: string,
    public label: string,
    private ComponentFn: PreactViewComponent
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
  ComponentFn: PreactViewComponent
): View => {
  return new PreactView(name, label, ComponentFn)
}
