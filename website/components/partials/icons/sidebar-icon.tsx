import Image from 'next/image'
import sidebarIcon from './sidebar-2-layout-toggle-nav-navbar-svgrepo-com.svg'

export default function SidebarIcon() {
  return (
    <>
      <Image
        className={'sidebar-icon'}
        src={sidebarIcon}
        alt={''}
        width={48}
        height={48}
      />
    </>
  )
}
