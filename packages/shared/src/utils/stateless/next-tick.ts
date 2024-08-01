/**
 * Push a task to the end of the current call stack
 * */
export const nextTick = (cb: (...args: unknown[]) => unknown) => {
  setTimeout(() => {
    cb()
  })
}
