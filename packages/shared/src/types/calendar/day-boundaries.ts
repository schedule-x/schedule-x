/**
 * Defines the visible hour range for week and day grid views.
 * Both `start` and `end` must be whole hours in the format HH:00 (e.g. 06:00, 18:00).
 * Half-hours and other minute values (e.g. 08:30) are not supported.
 * A "hybrid" day spanning midnight is supported, e.g. { start: '22:00', end: '06:00' }.
 */
export type DayBoundariesExternal = {
  start: string
  end: string
}

export type DayBoundariesInternal = {
  start: number
  end: number
}
