import { EventId } from '../../../types/event-id'

export const getTimeGridEventCopyElementId = (id: EventId) => {
  return 'time-grid-event-copy-' + id
}
