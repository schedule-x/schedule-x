import Image from 'next/image'
import dragIcon from './drag-drop.svg'

export default function DragIcon() {
  return (
    <>
      <Image
        className={'drag-icon'}
        src={dragIcon}
        alt={''}
        width={48}
        height={48}
      />
    </>
  )
}
