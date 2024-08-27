/* eslint-disable max-lines */
import '@schedule-x/theme-default/dist/index.css'
import Card from '../partials/card/card'
import dragAndDropIconWhite from '../../assets/icons/drag-and-drop-white.svg'
import darkModeWhite from '../../assets/icons/dark-mode-white.svg'
import customizeIconWhite from '../../assets/icons/customize-white.svg'
import resizeWhite from '../../assets/icons/resize-white.svg'
import i18nWhite from '../../assets/icons/i18n-white.svg'
import responsiveWhite from '../../assets/icons/responsive-white.svg'
import Link from 'next/link'
import AppCalendar from '../partials/app-calendar/app-calendar'
import Image from 'next/image'
import { AppReveal } from '../partials/reveal/AppReveal'

export default function LandingPage() {
  return (
    <>
      <div className={'landingPage page-wrapper'}>
        <h1>
          <span className={'headingGradient'}>Material design</span> calendar
          and date picker
        </h1>

        <h2>
          Components that make scheduling simple and
          elegant in your web project, regardless of stack.
        </h2>

        <div className={'landingPageActions'}>
          <Link href={'/docs/calendar'}>
            <button className={'landingPageAction buttonPrimary'}>
              Get started →
            </button>
          </Link>

          <Link href={'https://github.com/schedule-x/schedule-x'} target="_blank">
            <button className={'landingPageAction buttonOutlined'}>
              <span>View on GitHub</span>
              <svg className="github-icon" width="24" height="24" fill="currentColor" viewBox="3 3 18 18">
                <title>GitHub</title>
                <path
                  d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
              </svg>
            </button>
          </Link>
        </div>

        <AppCalendar/>

        <section className={'landingPageSection'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_inclined.svg'} alt={'hello'} width={1400}
                 height={479}/>


          <div className={'features-heading'}>
            <AppReveal width={'fit-content'}>
              <div className="featuresText">
                For web devs
              </div>


              <h3>
                Ship a calendar in no time
              </h3>

              <p>
                Getting it right when building a calendar takes time. Schedule-X already has a lot of things figured out
                for
                you, so you can save yourself the months it would take to build a calendar from scratch.
              </p>
            </AppReveal>
          </div>

          <div className={'landingPageCards'}>
            <Card
              icon={customizeIconWhite}
              title={'Customizable'}
              description={
                'Choose which views to display, set custom day boundaries or even write a plugin.'
              }
            />

            <Card
              icon={dragAndDropIconWhite}
              title={'Drag and drop'}
              description={'Reschedule events through a classic drag and drop.'}
            />

            <Card
              icon={resizeWhite}
              title={'Event resizing'}
              description={
                'Resize events by dragging the edges.'
              }
            />
          </div>

          <div className={'landingPageCards'}>
            <Card
              icon={darkModeWhite}
              title={'Dark mode'}
              description={
                'Built with light- and dark modes in mind. Toggle between them, simply by calling a method.'
              }
            />

            <Card
              icon={i18nWhite}
              title={'i18n'}
              description={'Supports multiple languages out of the box.'}
            />

            <Card
              icon={responsiveWhite}
              title={'Responsive'}
              description={
                'Works on all devices, from desktop to mobile'
              }
            />
          </div>
        </section>

        <section className={'landingPageSection hasMarginBottom'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_pink_boxes.svg'} alt={'hello'}
                 width={1400}
                 height={479}/>

          <div className={'features-heading'}>
            <AppReveal width={'fit-content'}>
              <div className="featuresText">
                The all inclusive-way
              </div>

              <h3>
                Schedule-X Premium
              </h3>

              <p>Someone already took care of the complex details you need for an all-inclusive calendar experience. No
                need to build it yourself.</p>
            </AppReveal>


            <ul>
              <li>Build event modal with a form ~30 hours ❌</li>
              <li>Build Drag-to-create ~40 hours ❌</li>
              <li>Build Resource view ~100 hours ❌</li>
              <li>Install and configure Schedule-X premium ~1 hour ✅</li>
            </ul>

            <Link href={'https://premium.schedule-x.dev/#pricing'} target={'_blank'}>
              <button className={'landingPageAction buttonPrimary hasMarginBottom'}>
                Get premium →
              </button>
            </Link>

            <video autoPlay loop playsInline muted id={'demo'} className="landingPageDemoVideo" width={1000}
                   height={390}>
              <source src={'/videos/premium-demo.mp4'} type={'video/mp4'}/>
            </video>
          </div>
        </section>
      </div>
    </>
  )
}
