import { PreactViewComponent } from '../../types/preact-view-component'
import { WeekWrapper } from '../week/week-wrapper'

export const DayWrapper: PreactViewComponent = ({ $app, id }) => {
  return <WeekWrapper $app={$app} id={id} />
}
