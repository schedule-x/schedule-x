import { YEARS_VIEW } from '../constants/test-ids'

type props = {
  setMonthView: () => void
}

export default function YearsView({ setMonthView }: props) {
  return (
    <>
      <div data-testid={YEARS_VIEW} onClick={() => setMonthView()}>
        YearsView
      </div>
    </>
  )
}
