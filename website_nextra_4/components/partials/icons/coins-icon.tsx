import Image from 'next/image'
import coinsIcon from './coins.svg'

export default function CoinsIcon() {
  return <>
    <Image className={'coins-icon'} src={coinsIcon} alt={''} width={48} height={48} />
  </>
}
