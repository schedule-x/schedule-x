import { CSSProperties } from 'preact/compat'

export type BackgroundEvent = {
  start: string
  end: string
  style: CSSProperties
  title?: string
}
