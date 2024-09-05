/* eslint-disable max-lines */
import '@schedule-x/theme-default/dist/index.css'
import AppUnderline from "../partials/svg/underline";
import Link from "next/link";
import SalesCard from "../partials/sales-card/sales-card";
import {Accordion} from 'rsuite';
import Image from 'next/image'
import ModalIcon from '../partials/icons/modal-icon'
import SidebarIcon from '../partials/icons/sidebar-icon'
import DragIcon from '../partials/icons/drag-icon'

export default function PremiumPage() {
  return (
    <>
      <div className={'premiumPage page-wrapper'}>
        <section className={'premiumPage__heroAndDemo'}>
          <h1>
            Ship even faster with
            <div className="headingGradient">
              <AppUnderline className="app-underline"/>
              Premium
            </div>
          </h1>

          <h2 className={'heroSubHeading'}>
            Don't waste time building stuff like forms, calendar toggles, or drag-to-create. Someone already built all
            that for you.
          </h2>

          <div className={'premiumPageActions'}>
            <Link href={'#pricing'}>
              <button className={'premiumPageAction buttonPrimary'}>
                Pricing →
              </button>
            </Link>
          </div>

          <video autoPlay loop playsInline muted id={'demo'} className="landingPageDemoVideo" width={1000}
                 height={390}>
            <source src={'/videos/premium-demo.mp4'} type={'video/mp4'}/>
          </video>
        </section>

        <section className={'premiumFeatures landingPageSection'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_pink_boxes.svg'} alt={''}
                 width={1400}
                 height={479}/>

          <h2 className={'premiumSectionHeading heading-font'}>Features</h2>

          <div className="features-grid">
            <div className="premium-feature">
              <ModalIcon/>

              <h3>
                Event modal with form
              </h3>

              <p className={'description'}>A modal that enables you to read, create, update and delete events</p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/interactive-event-modal'}>
                  DOCS
                </Link>
                <Link href={'/demos/modal-and-sidebar'}>
                  DEMO
                </Link>
              </div>
            </div>

            <div className="premium-feature">
              <SidebarIcon/>

              <h3>
                Sidebar
              </h3>

              <p className={'description'}>Add a sidebar with calendar toggles, "Add event"-button and placeholder
                events for drag-to-create</p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/sidebar'}>
                  DOCS
                </Link>
                <Link href={'/demos/modal-and-sidebar'}>
                  DEMO
                </Link>
              </div>
            </div>

            <div className="premium-feature">
              <DragIcon />

              <h3>
                Drag-to-create
              </h3>

              <p className={'description'}>
                Create events by dragging them onto the calendar.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/drag-to-create'}>
                  DOCS
                </Link>
                <Link href={'/demos/drag-to-create'}>
                  DEMO
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section style={{ position: 'relative' }} id={'pricing'}
                 className={'landingPageSection premiumPage__pricing'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_inclined.svg'} alt={'hello'}
                 width={1400}
                 height={479}/>

          <h2 className={'premiumSectionHeading heading-font'}>Pricing</h2>

          <div className={'premiumPageCards'}>
            <SalesCard
              data={{
                title: 'Team',
                description: 'All products, ready to use out of the box',
                  features: [
                    'All products',
                    'Email support',
                    'Prioritized issue processing',
                  ],
                  buttonText: 'Buy now'
                }}
                buttonClass={'filled'}
                buttonLink={'https://schedule-x.lemonsqueezy.com'}
              />

              <SalesCard
                data={{
                  title: 'Enterprise',
                  description: 'All products, plus service and custom plugins',
                  features: [
                    'All products',
                    'Private chat support',
                    'Prioritized issue processing',
                    'Service Level Agreement',
                    'Custom-made plugins',
                  ],
                  buttonText: 'Get in touch'
                }}
                buttonLink={'https://docs.google.com/forms/d/e/1FAIpQLSfE0G6RCUbnzbEUCMGEKcfUGx6XprAPU_IGRxNZ2UajizU7SA/viewform?usp=sf_link'}
                buttonClass={'black'}
              />
            </div>
          </section>

          <section className={'faq'}>
            <h2 className={'premiumSectionHeading heading-font'}>FAQ</h2>

            <Accordion style={{ width: '100%', maxWidth: '950px' }}>
              <Accordion.Panel header="Can I use the license commercially?" defaultExpanded>
                <i>Yes, you can.</i> Though I plan to introduce an OEM license later, I believe in honoring those who
                believed in the project early on. You can continue using Schedule-X premium commercially without having
                to upgrade licenses later on, if you buy it before OEM licensing is introduced.
              </Accordion.Panel>
              <Accordion.Panel header="How many issues and feature requests are included?">
                There is no limit to how many issues and feature requests you can submit. However, you buy the
                software <i>as is</i>, without any guarantee that I will build features that you request. If I believe
                that a feature is useful to many customers, I am more likely to build it.

                <br/>
                <br/>

                If you want certainty that a feature will be built, you need to select an enterprise license so we can
                discuss the terms of the feature request.
              </Accordion.Panel>
              <Accordion.Panel header="Can I cache the software on my servers?">
                Yes. This is even encouraged. For example, you can use software like <a href={"https://verdaccio.org/"}
                                                                                        target={'_blank'} style={{
                textDecoration: 'underline',
                color: '#6750a4'
              }}>Verdaccio</a> or JFrog artifactory. However,
                <strong> this does not mean that you are allowed to use Schedule-X premium beyond the terms of the
                  license you purchased.</strong> You need to pay the yearly subscription, for as long as the software
                is being used.
              </Accordion.Panel>
            </Accordion>
          </section>
      </div>
    </>
)
}
