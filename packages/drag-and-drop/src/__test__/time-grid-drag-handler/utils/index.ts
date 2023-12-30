export const dragEventNQuarters = (
  clickEvent: MouseEvent,
  nStepsToDrag: number,
  direction: 'up' | 'down'
) => {
  let currentY = clickEvent.clientY
  const pixelPerQuarterHour = 16.6666666667
  for (let i = 0; i < nStepsToDrag; i++) {
    if (direction === 'down') {
      currentY += pixelPerQuarterHour
    } else {
      currentY -= pixelPerQuarterHour
    }

    const event = {
      clientX: clickEvent.clientX,
      clientY: currentY,
    } as MouseEvent
    document.dispatchEvent(new MouseEvent('mousemove', event))
  }
}
