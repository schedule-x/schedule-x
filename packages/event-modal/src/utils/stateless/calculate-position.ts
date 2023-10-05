export const calculatePosition = (
  appDOMRect: DOMRect,
  eventDOMRect: DOMRect
) => {
  const MODAL_WIDTH = 400
  const INLINE_SPACE = 10
  const WIDTH_NEEDED = MODAL_WIDTH + INLINE_SPACE
  const MODAL_HEIGHT = 250
  const hasSpaceTop = eventDOMRect.bottom - appDOMRect.top > MODAL_HEIGHT
  const eventBottomLessThanAppBottom = eventDOMRect.bottom < appDOMRect.bottom
  let top = 0
  let left = 0

  if (appDOMRect.bottom - eventDOMRect.top > MODAL_HEIGHT) {
    top = eventDOMRect.top
  } else if (hasSpaceTop && eventBottomLessThanAppBottom) {
    top = eventDOMRect.bottom - MODAL_HEIGHT
  } else if (hasSpaceTop && !eventBottomLessThanAppBottom) {
    top = appDOMRect.bottom - MODAL_HEIGHT
  } else {
    top = appDOMRect.top
  }

  if (appDOMRect.right - eventDOMRect.right > WIDTH_NEEDED) {
    left = eventDOMRect.right + INLINE_SPACE
  } else if (eventDOMRect.left - appDOMRect.left > WIDTH_NEEDED) {
    left = eventDOMRect.left - WIDTH_NEEDED
  } else {
    left = appDOMRect.left
  }

  document.documentElement.style.setProperty('--sx-event-modal-top', `${top}px`)
  document.documentElement.style.setProperty(
    '--sx-event-modal-left',
    `${left}px`
  )
}
