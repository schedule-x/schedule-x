import { Signal } from '@preact/signals'

export interface TimePickerState {
  isOpen: Signal<boolean>
  currentTime: Signal<string>
  inputRect: Signal<{ x: number; y: number; height: number; width: number }>
}
