import { EventCoordinates } from '../../../interfaces/shared/event-coordinates'
import { isUIEventTouchEvent } from './is-touch-event'

export const getEventCoordinates = (uiEvent: UIEvent): EventCoordinates => {
  const actualEvent = isUIEventTouchEvent(uiEvent)
    ? (uiEvent as TouchEvent).changedTouches[0]
    : (uiEvent as MouseEvent)

  return {
    clientX: actualEvent.clientX,
    clientY: actualEvent.clientY,
  }
}
