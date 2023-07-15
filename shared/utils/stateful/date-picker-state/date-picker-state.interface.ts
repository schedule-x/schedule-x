export default interface DatePickerState {
  isOpen: boolean
  selectedDate: string | undefined

  open(): void
  close(): void
  toggle(): void
}
