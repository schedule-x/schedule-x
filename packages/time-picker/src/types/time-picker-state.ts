import { Signal } from '@preact/signals'

export interface TimePickerState {
  isOpen: Signal<boolean>
  currentTime: Signal<string>
}
