import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { signal } from '@preact/signals'
import TimezoneSelect from './timezone-select'
import TimezoneSelectPlugin from '@schedule-x/shared/src/interfaces/timezone-select/timezone-select-plugin'
import './timezone-select.scss'

class TimezoneSelectPluginImpl implements TimezoneSelectPlugin {
  name = 'timezoneSelect'
  $app!: CalendarAppSingleton
  ComponentFn = TimezoneSelect
  isEnabled = signal<boolean>(true)

  onRender($app: CalendarAppSingleton): void {
    this.$app = $app
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled.value = enabled
  }
}

export const createTimezoneSelectPlugin = () => {
  return definePlugin(
    'timezoneSelect',
    new TimezoneSelectPluginImpl()
  ) as TimezoneSelectPlugin & { name: 'timezoneSelect' }
}
