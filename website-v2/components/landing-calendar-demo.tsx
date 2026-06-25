import type { CSSProperties } from 'react'

const days = [
  { label: 'Mon', date: '04' },
  { label: 'Tue', date: '05' },
  { label: 'Wed', date: '06' },
  { label: 'Thu', date: '07' },
  { label: 'Fri', date: '08' },
]

const hours = ['08:00', '10:00', '12:00', '14:00', '16:00']

const allDayEvents = [
  { title: 'Launch freeze', range: 'Mon', start: 1, span: 1, tone: 'violet' },
  { title: 'Team offsite', range: 'Tue - Wed', start: 2, span: 2, tone: 'teal' },
  { title: 'Provider sync rollout', range: 'Fri - Sun', start: 5, span: 1, tone: 'blue' },
]

const timedEvents = [
  {
    title: 'Resource planning',
    meta: '08:30 - 10:00',
    day: 1,
    top: 10,
    height: 92,
    tone: 'violet',
  },
  {
    title: 'Google sync QA',
    meta: '10:30 - 11:30',
    day: 2,
    top: 118,
    height: 74,
    tone: 'teal',
  },
  {
    title: 'Design critique',
    meta: '12:00 - 13:00',
    day: 3,
    top: 204,
    height: 78,
    tone: 'blue',
  },
  {
    title: 'Token refresh',
    meta: '13:30 - 14:45',
    day: 4,
    top: 282,
    height: 86,
    tone: 'amber',
  },
  {
    title: 'Release handoff',
    meta: '15:00 - 16:30',
    day: 5,
    top: 358,
    height: 102,
    tone: 'violet',
  },
  {
    title: 'Calendar import',
    meta: '09:30 - 10:30',
    day: 4,
    top: 76,
    height: 72,
    tone: 'teal',
  },
]

export default function LandingCalendarDemo() {
  return (
    <div className="sx-live-calendar-wrapper" aria-label="Schedule-X calendar preview">
      <div className="sx-demo-calendar">
        <div className="sx-demo-toolbar">
          <div>
            <span className="sx-demo-kicker">Schedule-X Cloud</span>
            <strong>August 2025</strong>
          </div>
          <div className="sx-demo-toolbar-actions" aria-hidden="true">
            <span>Today</span>
            <span className="sx-demo-active-view">Week</span>
            <span>Month</span>
          </div>
        </div>

        <div className="sx-demo-sync-row" aria-hidden="true">
          <span>
            <strong>Token</strong>
            Browser session valid
          </span>
          <span>
            <strong>Sync</strong>
            Google Calendar connected
          </span>
          <span>
            <strong>API</strong>
            34 events loaded
          </span>
        </div>

        <div className="sx-demo-week">
          <div className="sx-demo-week-header">
            <span className="sx-demo-timezone">NYC</span>
            {days.map((day) => (
              <div className="sx-demo-day-heading" key={day.date}>
                <span>{day.label}</span>
                <strong>{day.date}</strong>
              </div>
            ))}
          </div>

          <div className="sx-demo-all-day">
            <span className="sx-demo-all-day-label">All day</span>
            <div className="sx-demo-all-day-grid">
              {allDayEvents.map((event) => (
                <span
                  className={`sx-demo-all-day-event sx-demo-event-${event.tone}`}
                  key={event.title}
                  style={{
                    '--sx-demo-start': event.start,
                    '--sx-demo-span': event.span,
                  } as CSSProperties}
                >
                  {event.title}
                  <small>{event.range}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="sx-demo-body">
            <div className="sx-demo-time-rail">
              {hours.map((hour) => (
                <span key={hour}>{hour}</span>
              ))}
            </div>
            {days.map((day, index) => (
              <div className="sx-demo-day-column" key={day.date}>
                {timedEvents
                  .filter((event) => event.day === index + 1)
                  .map((event) => (
                    <article
                      className={`sx-demo-event sx-demo-event-${event.tone}`}
                      key={event.title}
                      style={{
                        '--sx-demo-top': `${event.top}px`,
                        '--sx-demo-height': `${event.height}px`,
                      } as CSSProperties}
                    >
                      <strong>{event.title}</strong>
                      <span>{event.meta}</span>
                    </article>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
