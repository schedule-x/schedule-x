import { CustomComponentFn } from './calendar-config'

export type CustomComponentName =
  | 'timeGridEvent'
  | 'dateGridEvent'
  | 'monthGridEvent'
  | 'monthAgendaEvent'
  | 'eventModal'
  | 'headerContentLeftPrepend'
  | 'headerContentLeftAppend'
  | 'headerContentRightPrepend'
  | 'headerContentRightAppend'
  | 'headerContent'
  | 'interactiveModalAdditionalFields'
  | string

export type CustomComponentFns = {
  [key in CustomComponentName]?: CustomComponentFn
}
