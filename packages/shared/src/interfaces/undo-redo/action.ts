// export type UndoRedoActionType = 'undo' | 'redo'

export type UndoRedoAction = {
  // type: UndoRedoActionType
  undo: () => void
  redo: () => void
}
