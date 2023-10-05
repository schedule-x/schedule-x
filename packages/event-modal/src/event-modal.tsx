import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

type props = { calendarEvent: CalendarEventInternal }

export default function EventModal({ calendarEvent }: props) {
  return (
    <>
      <div className={'sx__event-modal'}>event with id {calendarEvent.id}</div>
    </>
  )
}
