import styles from './landing-page.module.css'
import '@schedule-x/theme-default/dist/index.css'
import Image from 'next/image'

export default function LandingPage() {

  return <>
    <div className={styles.landingPage}>
      <div className={styles.landingPageBG}></div>

      <h1>
        <span className={styles.headingGradient}>Material design</span> scheduling components for the web
      </h1>

    </div>
  </>
}