import { CalendarAppSingleton } from '@schedule-x/shared'
import { UndoRedoAction } from '@schedule-x/shared/src/interfaces/undo-redo/action'
import { UndoRedoPlugin } from '@schedule-x/shared/src/interfaces/undo-redo/undo-redo-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import UndoRedoUI from './undo-redo'

type UndoRedoConfig = {
  withUI: boolean
}

export class UndoRedoPluginImpl implements UndoRedoPlugin {
  name = PluginName.UndoRedo
  private $app!: CalendarAppSingleton
  public UndoRedoUI = undefined

  constructor(
    public config: UndoRedoConfig = {
      withUI: true,
    }
  ) {
    if (config.withUI) {
      this.UndoRedoUI = UndoRedoUI
    }
  }

  #undoStack: UndoRedoAction[] = []
  #redoStack: UndoRedoAction[] = []

  beforeInit($app: CalendarAppSingleton) {
    this.$app = $app
  }

  undo = () => {
    const action = this.#undoStack.pop()

    if (action) {
      action.undo()
      this.#redoStack.push(action)
    }
  }

  redo = () => {
    console.log('undo')
    const action = this.#redoStack.pop()

    if (action) {
      action.redo()
      this.#undoStack.push(action)
    }
  }

  addUndoAction = (undo: () => void, redo: () => void) => {
    this.#undoStack.push({ undo, redo })
  }
}

export const createUndoRedoPlugin = (config?: UndoRedoConfig) =>
  new UndoRedoPluginImpl(config)
