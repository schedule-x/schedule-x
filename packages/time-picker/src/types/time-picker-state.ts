import { ReadonlySignal, Signal } from '@preact/signals'

export interface TimePickerState {
  isOpen: Signal<boolean>
  currentTime: Signal<string>
  // a separate signal for the displayed value is needed, in order to support the 12-hour format
  currentTimeDisplayedValue: ReadonlySignal<string>
  inputWrapperElement: Signal<HTMLDivElement | undefined>
  isAM: Signal<boolean>
}
