import { useContext } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'

export default function AppInput() {
  const $app = useContext(AppContext)

  return (
    <>
      <div>
        <input
          data-testid="date-picker-input"
          readonly
          class="sx__date-input"
          onClick={() => $app.datePickerState.toggle()}
          type="text"
        />
      </div>
    </>
  )
}
