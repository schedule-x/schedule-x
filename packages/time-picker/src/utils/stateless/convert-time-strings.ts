import { TimePickerAppContext } from '../../types/time-picker-app.context'

export const convert12HourTo24HourTimeString = (
  hoursValue: string,
  minutesValue: string,
  $app: TimePickerAppContext
) => {
  const hoursInt = Number(hoursValue)
  const isAM = $app.timePickerState.isAM.value
  if (isAM && hoursInt === 12) {
    $app.timePickerState.currentTime.value = `00:${minutesValue}`
  } else if (!isAM && hoursInt < 12) {
    $app.timePickerState.currentTime.value = `${hoursInt + 12}:${minutesValue}`
  } else {
    $app.timePickerState.currentTime.value = `${hoursValue}:${minutesValue}`
  }
}
