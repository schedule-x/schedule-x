import { EventInstanceInfo } from './list-wrapper'

export const EventTimes = ({
  isFirstDay,
  isLastDay,
  isMultiDay,
  endLocaleString,
  startLocaleString,
}: EventInstanceInfo) => {
  if (!isMultiDay) {
    return (
      <>
        <div className="sx__list-event-start-time">{startLocaleString}</div>
        {endLocaleString && (
          <div className="sx__list-event-end-time">{endLocaleString}</div>
        )}
      </>
    )
  }

  if (isFirstDay) {
    return (
      <>
        <div className="sx__list-event-start-time">{startLocaleString}</div>
        <div className="sx__list-event-arrow">→</div>
      </>
    )
  }

  if (isLastDay) {
    return (
      <>
        <div className="sx__list-event-arrow">←</div>
        <div className="sx__list-event-end-time">{endLocaleString}</div>
      </>
    )
  }

  return <div className="sx__list-event-arrow">↔</div>
}
