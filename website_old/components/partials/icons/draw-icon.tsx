import Image from 'next/image'
import draw from './draw.svg'

export default function DrawIcon() {
  return <>
    <Image className={'coins-icon'} src={draw} alt={''} width={48} height={48} />
  </>
}
