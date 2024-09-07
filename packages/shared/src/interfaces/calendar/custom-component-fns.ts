import { CustomComponentFn } from './calendar-config'

export type CustomComponentFns = {
  timeGridEvent?: CustomComponentFn
  dateGridEvent?: CustomComponentFn
  monthGridEvent?: CustomComponentFn
  monthAgendaEvent?: CustomComponentFn
  eventModal?: CustomComponentFn
  headerContentLeftPrepend?: CustomComponentFn
  headerContentLeftAppend?: CustomComponentFn
  headerContentRightPrepend?: CustomComponentFn
  headerContentRightAppend?: CustomComponentFn
  headerContent?: CustomComponentFn
}
