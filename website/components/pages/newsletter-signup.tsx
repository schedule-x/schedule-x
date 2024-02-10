import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './newsletter-signup.module.scss'

export default function NewsletterSignupPage() {
  return (
    <div className={['page-wrapper', styles.newsletterPage].join(' ')}>
      {/*<HeadingWithIcon icon={'✉️'} text={'Newsletter Signup'}/>*/}

      <div dangerouslySetInnerHTML={{ __html: '<iframe width="540" height="750" src="https://a467ac2a.sibforms.com/serve/MUIFACtCuvb75u3td5WtQzf9goaBLPgZ7_dILA_rNsAZGiRpAquo-rw4Gw7r7gM2UX8_Y9F0rWZ7mVTrisYvy_r-ex8j2crcI2rVFgUMvqWzTPifp_GRBDhCTLFEbrPYxxbn_271P1vN29wlB0XoOFGzlUPFobTCfFTIl5a-H2lRKPNIdco0wF91dSygQvgrrNg2xD0_TW2XQk0a" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>'}}></div>
    </div>
  )
}
