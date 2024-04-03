// import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
// import { effect, signal } from '@preact/signals'

// export const useIconColors = ($app: CalendarAppSingleton) => {
//   const ICON_COLOR_LIGHT_MODE = '#000'
//   const ICON_COLOR_DARK_MODE = 'var(--sx-color-neutral-variant)'
//   const iconColor = signal(
//     $app.calendarState.isDark.value
//       ? ICON_COLOR_DARK_MODE
//       : ICON_COLOR_LIGHT_MODE
//   )

//   effect(() => {
//     if ($app.calendarState.isDark.value) iconColor.value = ICON_COLOR_DARK_MODE
//     else iconColor.value = ICON_COLOR_LIGHT_MODE
//   })
//   return iconColor
// }
