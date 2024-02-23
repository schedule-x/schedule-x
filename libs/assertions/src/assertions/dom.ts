export function assertIsDIV(
  element: Element | unknown
): asserts element is HTMLDivElement {
  if (!(element instanceof HTMLDivElement)) {
    throw new Error('Element is not a <div>')
  }
}

export function assertIsLI(
  element: Element | unknown
): asserts element is HTMLLIElement {
  if (!(element instanceof HTMLLIElement)) {
    throw new Error('Element is not a <li>')
  }
}

export function assertElementType<T extends Element>(
  element: Element | unknown,
  type: typeof Element
): asserts element is T {
  if (!(element instanceof Element)) {
    throw new Error('element is not of type Element')
  }

  if (!(element instanceof type)) {
    throw new Error(`element is not of type ${type.name}`)
  }
}
