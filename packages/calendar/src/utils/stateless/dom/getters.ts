/**
 * Get an element in the DOM by their custom component id
 * */
export const getElementByCCID = (customComponentId: string | undefined) =>
  document.querySelector(`[data-ccid="${customComponentId}"]`) as HTMLElement
