import { CustomComponentFn } from './calendar-config'

export type CustomComponentFns = {
  timeGridEvent?: CustomComponentFn
  dateGridEvent?: CustomComponentFn
  monthGridEvent?: CustomComponentFn
  monthAgendaEvent?: CustomComponentFn
  eventModal?: CustomComponentFn
  sidebar?: CustomComponentFn
}
