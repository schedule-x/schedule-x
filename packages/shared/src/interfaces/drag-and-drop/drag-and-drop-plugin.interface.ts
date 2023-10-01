import PluginBase from '../../interfaces/plugin.interface'
import TimeGridDragHandler from './time-grid-drag-handler.interface'
import { DayBoundariesDateTime } from '../../types/day-boundaries-date-time'
import DateGridDragHandler from './date-grid-drag-handler.interface'
import DragHandlerDependencies from './drag-handler-dependencies.interface'

export default interface DragAndDropPlugin extends PluginBase {
  createTimeGridDragHandler(
    dependencies: DragHandlerDependencies,
    dayBoundariesDateTime: DayBoundariesDateTime
  ): TimeGridDragHandler

  createDateGridDragHandler(
    dependencies: DragHandlerDependencies
  ): DateGridDragHandler
}
