import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import EventModal from './event-modal'

class EventModalPluginImpl implements EventModalPlugin {
  name = PluginName.EventModal

  ComponentFn = EventModal
}

export const createEventModalPlugin = () => new EventModalPluginImpl()
