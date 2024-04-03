import { useEffect, useState } from 'preact/hooks'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { EventModalProps } from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { Fragment } from 'preact/jsx-runtime'

export default function Sidebar({ $app }: EventModalProps) {
  const [sidebarId] = useState(randomStringId())
  const customComponent = $app.config._customComponentFns.sidebar
  console.log('customcomp', customComponent)
  useEffect(() => {
    if (customComponent) {
      // const setIsOpen = (value: boolean) => {
      //   if ($app.config.plugins.sidebar) {
      //     $app.config.plugins.sidebar.isOpen.value = value
      //   }
      // }
      customComponent(
        document.querySelector(`[data-ccid=${sidebarId}]`) as HTMLElement,
        {
          isOpen: $app.config.plugins.sidebar?.isOpen,
        }
      )
    }
  }, [])

  return (
    <div id={sidebarId} data-ccid={sidebarId} className={``}>
      {!customComponent && (
        <Fragment>custom sidebar in the sidebar.tsx</Fragment>
      )}
    </div>
  )
}
