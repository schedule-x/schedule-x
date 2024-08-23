import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'

export interface UndoRedoPlugin extends PluginBase {
  UndoRedoUI: JSXInternal.Element | undefined

  undo(): void
  redo(): void
  addUndoAction(undo: () => void, redo: () => void): void
}
