import { createAppSingleton } from '../../../factory'

export const appSingletonWithGerman = () =>
  createAppSingleton({
    locale: 'de-DE',
  })

export const appSingletonWithLocale = (locale: string) =>
  createAppSingleton({
    locale,
  })
