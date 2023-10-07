export const setPosition = (
  appDOMRect: DOMRect,
  eventDOMRect: DOMRect,
  modalHeight = 250
) => {
  const MODAL_WIDTH = 400
  const INLINE_SPACE = 10
  const WIDTH_NEEDED = MODAL_WIDTH + INLINE_SPACE
  const hasSpaceTop = eventDOMRect.bottom - appDOMRect.top > modalHeight
  const eventBottomLessThanAppBottom = eventDOMRect.bottom < appDOMRect.bottom
  let top = 0
  let left = 0
  let animationStart = '0%'

  if (appDOMRect.bottom - eventDOMRect.top > modalHeight) {
    top = eventDOMRect.top
  } else if (hasSpaceTop && eventBottomLessThanAppBottom) {
    top = eventDOMRect.bottom - modalHeight
  } else if (hasSpaceTop && !eventBottomLessThanAppBottom) {
    top = appDOMRect.bottom - modalHeight
  } else {
    top = appDOMRect.top
  }

  if (appDOMRect.right - eventDOMRect.right > WIDTH_NEEDED) {
    left = eventDOMRect.right + INLINE_SPACE
    animationStart = '-10%'
  } else if (eventDOMRect.left - appDOMRect.left > WIDTH_NEEDED) {
    left = eventDOMRect.left - WIDTH_NEEDED
    animationStart = '10%'
  } else {
    left = appDOMRect.left
  }

  document.documentElement.style.setProperty(
    '--sx-event-modal-animation-start',
    animationStart
  )
  document.documentElement.style.setProperty('--sx-event-modal-top', `${top}px`)
  document.documentElement.style.setProperty(
    '--sx-event-modal-left',
    `${left}px`
  )
}
