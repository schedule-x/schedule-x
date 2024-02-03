import Image from 'next/image'

type props = {
  icon: string
  title: string
  description: string
}

export default function Card(props: props) {
  return (
    <>
      <div className={'landing-page-card'}>
        <Image
          className={'landing-page-card-icon'}
          src={props.icon}
          width={50}
          height={50}
          alt={props.title}
        />

        <h2>{props.title}</h2>

        <p>{props.description}</p>
      </div>
    </>
  )
}
