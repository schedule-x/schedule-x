import Link from 'next/link'
import { JSX } from 'react'

type props = {
  title: string
  icon: JSX.Element
  link: string
}

export default function FrameworkButton({ title, icon, link }: props) {
  return (
    <Link href={link}>
      <button title={title} className={'frameworkButton'}>
        {icon}
      </button>
    </Link>
  )
}
