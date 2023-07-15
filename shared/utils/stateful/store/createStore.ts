export default function createStore<T extends object>(data: T, name: string) {
  function emit(type: string, detail: object) {
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    })

    return document.dispatchEvent(event)
  }

  return new Proxy<T>(data, {
    get: function (obj, prop) {
      return obj[prop as keyof typeof obj]
    },
    set: function (obj: T, prop: string, value: unknown) {
      console.log('set ' + prop + ' to ' + value + ' in ' + name)

      const propToSet = prop as keyof T

      if (obj[propToSet as keyof T] === value) return true

      obj[propToSet] = value as T[keyof T]
      emit(name, data)

      return true
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop as keyof typeof obj]
      emit(name, data)

      return true
    },
  })
}
