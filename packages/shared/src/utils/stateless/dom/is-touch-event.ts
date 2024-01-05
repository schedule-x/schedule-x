export const isUIEventTouchEvent = (event: UIEvent): boolean => {
  return 'touches' in event && typeof event.touches === 'object'
}
