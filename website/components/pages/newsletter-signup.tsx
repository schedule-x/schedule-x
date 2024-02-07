import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './newsletter-signup.module.scss'

export default function NewsletterSignupPage() {
  return (
    <div className={['page-wrapper', styles.newsletterPage].join(' ')}>
      <HeadingWithIcon icon={'✉️'} text={'Newsletter Signup'}/>

      <div dangerouslySetInnerHTML={{ __html: '<iframe width="540" height="700px"\n' +
          '              src="https://a467ac2a.sibforms.com/serve/MUIFAIspe26zofitZ3eJ5XGdfQPnq2kpV9LgQ_EDpCr4h1inDunI0gskIz89AeaHkxz_2M7SUs_LeitXL5EV4s3T4Jo1MsRyD0M0qDhByjiH_5P8xVaC7uZXY-82ty6jVt6dhUuUpM05qLKkQXGs2YOfSftGD5HA61IjFNhvlBNahIIDx4mp0muMiO2NalW79Q8nbaCjdsJ7HT8a"\n' +
          '              frameBorder="0" scrolling="auto" allowFullScreen\n' +
          '              style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>'}}></div>
    </div>
  )
}
