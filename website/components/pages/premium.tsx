import '@schedule-x/theme-default/dist/index.css'
import AppUnderline from "../partials/svg/underline";
import Link from "next/link";
import Image from 'next/image'
import ModalIcon from '../partials/icons/modal-icon'
import SidebarIcon from '../partials/icons/sidebar-icon'
import DragIcon from '../partials/icons/drag-icon'
import CoinsIcon from '../partials/icons/coins-icon'
import DrawIcon from '../partials/icons/draw-icon'
import AppCheckout from '../partials/premium/app-checkout'
import FAQ from '../partials/premium/faq'

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
            Don't waste time building event forms, a resource view, drag-to-create, or event drawing. Someone already built all
            that for you.
          </h2>

          <div className={'premiumPageActions'}>
            <Link href={'#pricing'}>
              <button className={'premiumPageAction buttonPrimary'}>
                Pricing →
              </button>
            </Link>
          </div>

          <video autoPlay loop playsInline muted id={'demo'} className="premiumPageDemoVideo" width={1000}
                 height={390}>
            <source src={'https://d19hgxvhjb2new.cloudfront.net/website/premium-demo.mp4'} type={'video/mp4'}/>
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
              <DragIcon/>

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

            <div className="premium-feature">
              <CoinsIcon/>

              <h3>
                Resource view
              </h3>

              <p className={'description'}>
                A view that shows resources and their events.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/resource-scheduler'}>
                  DOCS
                </Link>
                <Link href={'/demos/resource-scheduler'}>
                  DEMO
                </Link>
              </div>
            </div>

            <div className="premium-feature">
              <DrawIcon/>

              <h3>
                Draw
              </h3>

              <p className={'description'}>
                A plugin for drawing events by dragging on the calendar.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/draw'}>
                  DOCS
                </Link>

                <button disabled={true} style={{ color: 'gray' }}>
                  DEMO (coming soon)
                </button>
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
          </div>
        </section>

        <AppCheckout />

        <FAQ />
      </div>
    </>
)
}
