import '@schedule-x/theme-default/dist/index.css'
import Link from 'next/link'
import ModalIcon from '../../components/partials/icons/modal-icon'
import SidebarIcon from '../../components/partials/icons/sidebar-icon'
import DragIcon from '../../components/partials/icons/drag-icon'
import CoinsIcon from '../../components/partials/icons/coins-icon'
import DrawIcon from '../../components/partials/icons/draw-icon'
import GanttIcon from '../../components/partials/icons/gantt-icon'
import AppCheckout from '../../components/partials/premium/app-checkout'
import FAQ from '../../components/partials/premium/faq'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule-X Premium | Advanced Calendar Components',
  description:
    'Premium components for Schedule-X. Resource scheduler, event modal with form, drag-and-drop event creation and more.',
}

export default function PremiumPage() {
  return (
    <>
      <div className={'premiumPage page-wrapper'}>
        <section className={'premiumPage__heroAndDemo'}>
          <p className="pageEyebrow">Schedule-X Premium</p>
          <h1>
            Build the advanced calendar.<br />Skip the advanced calendar work.
          </h1>

          <h2 className={'heroSubHeading'}>
            Add polished scheduling workflows—resource views, event forms,
            drag-to-create, drawing, and Gantt—without turning them into a
            multi-month engineering project.
          </h2>

          <div className={'premiumPageActions'}>
            <Link className="premiumPageAction buttonPrimary" href={'#pricing'}>
              <span>See pricing</span><span aria-hidden="true">→</span>
            </Link>
            <Link className="premiumTextLink" href={'/docs/calendar/installing-premium'}>
              Read the docs <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="premiumCapabilityStrip" aria-label="Premium features">
            <span>Gantt chart</span>
            <span>Event forms</span>
            <span>Resource views</span>
            <span>Drag-to-create</span>
          </div>

          <div className="premiumDemoFrame">
            <div className="premiumDemoFrame__topline">
              <span>Premium in action</span>
              <span>Interactive scheduling workflows</span>
            </div>
            <video
              autoPlay
              loop
              playsInline
              muted
              id={'demo'}
              className="premiumPageDemoVideo"
              width={1000}
              height={390}
            >
              <source
                src={'https://d19hgxvhjb2new.cloudfront.net/website/premium-demo.mp4'}
                type={'video/mp4'}
              />
            </video>
          </div>
        </section>

        <section className={'premiumFeatures landingPageSection'}>
          <div className="premiumSectionIntro">
            <h2 className={'premiumSectionHeading'}>Complex interactions. Ready to install.</h2>
            <p>Premium components share the same API and design language as the open-source calendar, so your product stays coherent as it grows.</p>
          </div>

          <div className="features-grid">
            <div className="premium-feature">
              <GanttIcon />

              <h3>Gantt chart</h3>

              <p className={'description'}>
                Plan projects with tasks, milestones, dependencies, progress,
                and business calendars.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/gantt-chart'}>DOCS</Link>
                <Link href={'/demos/gantt-chart'}>DEMO</Link>
              </div>
            </div>

            <div className="premium-feature">
              <ModalIcon />

              <h3>Event modal with form</h3>

              <p className={'description'}>
                A modal that enables you to read, create, update and delete
                events
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/interactive-event-modal'}>
                  DOCS
                </Link>
                <Link href={'/demos/modal-and-sidebar'}>DEMO</Link>
              </div>
            </div>

            <div className="premium-feature">
              <DragIcon />

              <h3>Drag-to-create</h3>

              <p className={'description'}>
                Create events by dragging them onto the calendar.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/drag-to-create'}>DOCS</Link>
                <Link href={'/demos/drag-to-create'}>DEMO</Link>
              </div>
            </div>

            <div className="premium-feature">
              <CoinsIcon />

              <h3>Resource view</h3>

              <p className={'description'}>
                A view that shows resources and their events.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/resource-scheduler'}>DOCS</Link>
                <Link href={'/demos/resource-scheduler'}>DEMO</Link>
              </div>
            </div>

            <div className="premium-feature">
              <DrawIcon />

              <h3>Draw</h3>

              <p className={'description'}>
                A plugin for drawing events by dragging on the calendar.
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/draw'}>DOCS</Link>
                <Link href={'/demos/draw'}>DEMO</Link>
              </div>
            </div>

            <div className="premium-feature">
              <SidebarIcon />

              <h3>Sidebar</h3>

              <p className={'description'}>
                Add a sidebar with calendar toggles, "Add event"-button and
                placeholder events for drag-to-create
              </p>

              <div className={'links'}>
                <Link href={'/docs/calendar/plugins/sidebar'}>DOCS</Link>
                <Link href={'/demos/modal-and-sidebar'}>DEMO</Link>
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
