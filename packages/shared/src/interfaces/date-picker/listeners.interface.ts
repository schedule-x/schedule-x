import DatePickerAppSingleton from './date-picker-app.singleton'

export type DatePickerListeners = {
  onChange?: (date: string) => void
  onEscapeKeyDown?: ($app: DatePickerAppSingleton) => void
}
