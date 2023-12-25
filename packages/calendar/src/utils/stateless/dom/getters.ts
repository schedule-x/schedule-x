export const getElementByCCID = (customComponentId: string | undefined) =>
  document.querySelector(`[data-ccid="${customComponentId}"]`) as HTMLElement
