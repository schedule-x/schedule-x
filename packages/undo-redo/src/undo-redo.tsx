import { UndoRedoPlugin } from '@schedule-x/shared/src/interfaces/undo-redo/undo-redo-plugin.interface'

type props = {
  undoRedoPlugin: UndoRedoPlugin
}

export default function UndoRedoUI({ undoRedoPlugin }: props) {
  return (
    <div>
      <button onClick={undoRedoPlugin.undo}>Undo</button>
      <button onClick={undoRedoPlugin.redo}>Redo</button>
    </div>
  )
}
