'use client'

import Link from 'next/link'
import { useEffect, useRef, type ComponentProps } from 'react'

type AnalyticsProperties = Record<string, string>

type LightAnalytics = {
  track: (event: string, properties: AnalyticsProperties) => void
}

declare global {
  interface Window {
    lightAnalytics?: LightAnalytics
  }
}

type PendingEvent = {
  event: string
  properties: AnalyticsProperties
}

const pendingEvents: PendingEvent[] = []
let flowId: string | undefined
let entryPoint = 'direct'
let retryTimer: ReturnType<typeof setTimeout> | undefined
let retryCount = 0

const createFlowId = () => {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()

  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  )
}

const getFlowId = (startNewFlow: boolean) => {
  if (startNewFlow || !flowId) flowId = createFlowId()
  return flowId
}

const flushPendingEvents = () => {
  retryTimer = undefined
  const analytics = window.lightAnalytics

  if (analytics) {
    retryCount = 0
    pendingEvents.splice(0).forEach(({ event, properties }) => {
      analytics.track(event, properties)
    })
    return
  }

  if (pendingEvents.length > 0 && retryCount < 50) {
    retryCount += 1
    retryTimer = setTimeout(flushPendingEvents, 100)
  }
}

const trackSetupEvent = (
  event: string,
  properties: AnalyticsProperties,
  startNewFlow = false
) => {
  if (startNewFlow) entryPoint = properties.entry_point ?? 'direct'

  pendingEvents.push({
    event,
    properties: {
      entry_point: properties.entry_point ?? entryPoint,
      ...properties,
      flow_id: getFlowId(startNewFlow),
    },
  })

  if (!retryTimer) flushPendingEvents()
}

type SetupAnalyticsViewProps = {
  event: string
  properties: AnalyticsProperties
}

export function SetupAnalyticsView({
  event,
  properties,
}: SetupAnalyticsViewProps) {
  const serializedProperties = JSON.stringify(properties)
  const lastTrackedView = useRef<string | undefined>(undefined)

  useEffect(() => {
    const viewKey = `${event}:${serializedProperties}`
    if (lastTrackedView.current === viewKey) return

    lastTrackedView.current = viewKey
    trackSetupEvent(event, JSON.parse(serializedProperties))
  }, [event, serializedProperties])

  return null
}

type SetupAnalyticsLinkProps = ComponentProps<typeof Link> & {
  analyticsEvent: string
  analyticsProperties: AnalyticsProperties
  startsNewFlow?: boolean
}

export function SetupAnalyticsLink({
  analyticsEvent,
  analyticsProperties,
  startsNewFlow = false,
  onClick,
  ...linkProps
}: SetupAnalyticsLinkProps) {
  const lastTrackedAt = useRef(0)

  return (
    <Link
      {...linkProps}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return

        const now = Date.now()
        if (now - lastTrackedAt.current < 1000) return

        lastTrackedAt.current = now
        trackSetupEvent(analyticsEvent, analyticsProperties, startsNewFlow)
      }}
    />
  )
}
