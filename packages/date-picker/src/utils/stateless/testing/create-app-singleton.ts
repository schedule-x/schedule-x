import { createAppSingleton } from '../../../factory'

export const appSingletonWithGerman = () =>
  createAppSingleton({
    locale: 'de-DE',
  })
