import DatePickerAppSingleton from './date-picker-app.singleton'

export type DatePickerListeners = {
  onChange?: (date: Temporal.PlainDate) => void
  onEscapeKeyDown?: ($app: DatePickerAppSingleton) => void
}
