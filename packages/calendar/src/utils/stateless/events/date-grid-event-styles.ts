export const getWidthToSubtract = (
  hasOverflowLeft: boolean,
  hasOverflowRight: boolean,
  enableOverflowSubtraction: boolean
) => {
  let widthToSubtract = 2 // 2px for all events, to leave some space between them
  const eventOverflowMargin = 10 // CORRELATION ID: 1
  if (hasOverflowLeft && enableOverflowSubtraction)
    widthToSubtract += eventOverflowMargin
  if (hasOverflowRight && enableOverflowSubtraction)
    widthToSubtract += eventOverflowMargin
  return widthToSubtract
}

export const getBorderRadius = (
  hasOverflowLeft: boolean,
  hasOverflowRight: boolean,
  forceZeroRule: boolean
) => {
  if (!forceZeroRule) return {}

  return {
    borderBottomLeftRadius: hasOverflowLeft || forceZeroRule ? 0 : undefined,
    borderTopLeftRadius: hasOverflowLeft || forceZeroRule ? 0 : undefined,
    borderBottomRightRadius: hasOverflowRight || forceZeroRule ? 0 : undefined,
    borderTopRightRadius: hasOverflowRight || forceZeroRule ? 0 : undefined,
  }
}
