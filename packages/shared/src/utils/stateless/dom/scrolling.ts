const isScrollable = (el: HTMLElement | null) => {
  if (el) {
    const hasScrollableContent = el.scrollHeight > el.clientHeight
    const overflowYStyle = window.getComputedStyle(el).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

    return hasScrollableContent && !isOverflowHidden
  }
  return true
}

export const getScrollableParents = (
  el: HTMLElement | null,
  acc: (HTMLElement | Window)[] = []
): (HTMLElement | Window)[] => {
  if (
    !el ||
    el === document.body ||
    el.nodeType === Node.DOCUMENT_FRAGMENT_NODE
  ) {
    acc.push(window)
    return acc
  }

  if (isScrollable(el)) {
    acc.push(el)
  }

  return getScrollableParents(
    (el.assignedSlot
      ? el.assignedSlot.parentNode
      : el.parentNode) as HTMLElement,
    acc
  )
}
