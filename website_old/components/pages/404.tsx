import styles from './404.module.scss'
import Link from 'next/link'

export default function Page404() {
  return (
    <div className={styles.page404}>
      <h1>Whoops 😬 Requested page not found</h1>

      <Link href={'/'}>Start page →</Link>
    </div>
  )
}
