import '@schedule-x/theme-default/dist/index.css'
import Image from 'next/image'
import calendarPng from '../../assets/calendar-month.png'
import calendarDarkPng from '../../assets/calendar-month-dark.png'
import Card from '../partials/card/card'
import darkModeIcon from '../../assets/icons/dark-mode.svg'
import dragAndDropIcon from '../../assets/icons/drag-drop.svg'
import customizeIcon from '../../assets/icons/customize.svg'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <div className={'landingPage page-wrapper'}>
        {/*<div className={'landingPageBG'}></div>*/}

        <h1>
          <span className={'headingGradient'}>Material design</span> calendar
          and date picker
        </h1>

        <h2>React, Vue and plain JS components that make scheduling simple and elegant in your web project</h2>

        <div className={'landingPageActions'}>
          <Link href={'/demos/calendar'}>
            <button className={'landingPageAction buttonPrimary'}>
              Calendar demo
            </button>
          </Link>

          <Link href={'/demos/date-picker'}>
            <button className={'landingPageAction buttonOutlined'}>
              Date picker demo
            </button>
          </Link>
        </div>

        <Image
          className={'landingPageImage landingPageImage--light'}
          src={calendarPng}
          width={900}
          height={500}
          alt="Schedule X"
        />

        <Image
          className={'landingPageImage landingPageImage--dark'}
          src={calendarDarkPng}
          width={900}
          height={500}
          alt="Schedule X"
        />

        <div className={'landingPageCards'}>
          <Card
            icon={customizeIcon}
            title={'Customizable'}
            description={
              'Choose which views to display, set custom day boundaries or even write a plugin.'
            }
          />

          <Card
            icon={dragAndDropIcon}
            title={'Drag and drop'}
            description={'Reschedule events through a classic drag and drop.'}
          />

          <Card
            icon={darkModeIcon}
            title={'Dark mode'}
            description={
              'Built with light- and dark modes in mind. Toggle between them, simply by calling a method.'
            }
          />
        </div>
      </div>
    </>
  )
}
