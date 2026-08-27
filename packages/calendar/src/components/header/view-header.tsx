import { useEffect, useRef } from 'preact/hooks'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import DefaultHeader from './default-header'

type Props = {
  $app: CalendarAppSingleton
  view?: View | null
}

export default function ViewHeader({ $app, view }: Props) {
  const headerElement = useRef<HTMLElement>(null)
  const hasViewHeader = Boolean(view?.HeaderComponent && view.renderHeader)

  useEffect(() => {
    if (!hasViewHeader || !view?.renderHeader || !headerElement.current) return

    view.renderHeader(headerElement.current, $app)

    return () => view.destroyHeader?.()
  }, [view, hasViewHeader])

  if (!hasViewHeader) return <DefaultHeader />

  return <header ref={headerElement} className={'sx__calendar-header'} />
}
