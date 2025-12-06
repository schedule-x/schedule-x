import { useEffect, useRef } from 'preact/hooks'
import { useSignalEffect } from '@preact/signals'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { rangeToString } from './range-to-string'

export default function useFetchEvents($app: CalendarAppSingleton) {
  const hasCalledFetchEventsOnRenderRef = useRef(false)
  const initialRangeRef = useRef<string | null>(
    rangeToString($app.calendarState.range.value)
  )

  const fetchAndSetEvents = async () => {
    if (
      !$app.config.callbacks?.fetchEvents ||
      !$app.calendarState.range.value
    ) {
      return
    }

    const events = await $app.config.callbacks.fetchEvents(
      $app.calendarState.range.value
    )
    $app.calendarEvents.list.value = events.map((event) =>
      externalEventToInternal(event, $app.config)
    )
  }

  useEffect(() => {
    if (
      $app.config.callbacks?.fetchEvents &&
      $app.calendarState.range.value &&
      !hasCalledFetchEventsOnRenderRef.current
    ) {
      hasCalledFetchEventsOnRenderRef.current = true
      void fetchAndSetEvents()
    }
  }, [])

  // Call fetchEvents every time the range changes (same as onRangeUpdate)
  // Skip on initial render since we already call it in useEffect
  useSignalEffect(() => {
    if (
      !$app.config.callbacks?.fetchEvents ||
      !$app.calendarState.range.value ||
      !hasCalledFetchEventsOnRenderRef.current
    ) {
      return
    }

    // Skip if this is the initial range (already handled in useEffect)
    const currentRangeString = rangeToString($app.calendarState.range.value)
    if (currentRangeString === initialRangeRef.current) {
      return
    }

    void fetchAndSetEvents()
  })
}
