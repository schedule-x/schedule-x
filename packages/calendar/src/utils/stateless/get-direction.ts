export const getDirection = (): 'rtl' | 'ltr' => {
  const html = document.querySelector('html')
  if (!html) {
    return 'ltr'
  }
  const direction = html.getAttribute('dir')
  if (direction === 'rtl') {
    return 'rtl'
  }
  return 'ltr'
}
