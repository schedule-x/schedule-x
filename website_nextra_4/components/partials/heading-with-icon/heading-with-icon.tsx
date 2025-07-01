import styles from './heading-with-icon.module.scss'

type props = {
  icon: string
  text: string
}

export default function HeadingWithIcon({ icon, text }: props) {
  return (
    <>
      <h1 className={styles.headingWithIcon}>
        <span className={styles.calendarIcon}>{icon}</span> {text}
      </h1>
    </>
  )
}
