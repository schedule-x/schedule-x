export const getWidthToSubtract = (
  hasOverflowLeft: boolean,
  hasOverflowRight: boolean
) => {
  let widthToSubtract = 2 // 2px for all events, to leave some space between them
  const eventOverflowMargin = 10 // CORRELATION ID: 1
  if (hasOverflowLeft) widthToSubtract += eventOverflowMargin
  if (hasOverflowRight) widthToSubtract += eventOverflowMargin
  return widthToSubtract
}

export const getBorderRadius = (
  hasOverflowLeft: boolean,
  hasOverflowRight: boolean
) => {
  return {
    borderBottomLeftRadius: hasOverflowLeft ? 0 : undefined,
    borderTopLeftRadius: hasOverflowLeft ? 0 : undefined,
    borderBottomRightRadius: hasOverflowRight ? 0 : undefined,
    borderTopRightRadius: hasOverflowRight ? 0 : undefined,
  }
}
