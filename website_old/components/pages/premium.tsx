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
import PricingCard, { ProductVariant } from '../partials/pricing-card/pricing-card'
import { useEffect, useMemo, useState } from 'react'
import CoinsIcon from '../partials/icons/coins-icon'
import DrawIcon from '../partials/icons/draw-icon'

export default function PremiumPage() {
  const yearlyVariants: ProductVariant[] = [
    {
      price: 299,
      id: 614707,
      label: '1 developer'
    },
    {
      price: 479,
      id: 421689,
      label: '2-3 developers'
    },
    {
      price: 649,
      id: 614706,
      label: '4-6 developers'
    },
    {
      price: 849,
      id: 614709,
      label: '7-9 developers'
    },
    {
      price: 1099,
      id: 614710,
      label: '10+ developers'
    },
  ]

  const lifetimeVariants: ProductVariant[] = [
    {
      price: 599,
      id: 517516,
      label: '1 developer'
    },
    {
      price: 999,
      id: 614719,
      label: '2-3 developers'
    },
    {
      price: 1499,
      id: 614720,
      label: '4-6 developers'
    },
    {
      price: 1999,
      id: 614722,
      label: '7-9 developers'
    },
    {
      price: 2499,
      id: 614723,
      label: '10+ developers'
    },
  ]

  function initLemonSqueezy() {
    if ('createLemonSqueezy' in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.createLemonSqueezy()
    }
  }

  useEffect(() => {
    initLemonSqueezy()
  }, [])


  const [selectedVariantYearly, setSelectedVariantYearly] = useState<number>(yearlyVariants[0].id)
  const yearlyPricing = useMemo(() => {
    return yearlyVariants.find((variant) => variant.id === selectedVariantYearly)?.price
  }, [selectedVariantYearly])

  const [selectedVariantLifetime, setSelectedVariantLifetime] = useState<number>(lifetimeVariants[0].id)
  const lifetimePricing = useMemo(() => {
    return lifetimeVariants.find((variant) => variant.id === selectedVariantLifetime)?.price
  }, [selectedVariantLifetime])

  const sendTrackingToGoogleAds = () => {
    if ('gtag' in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gtag('event', 'conversion', { 'send_to': 'AW-16716598695/fmXbCKu755QaEKebjKM-', 'transaction_id': '' })
    }
  }

  const startCheckout = (licenseType: 'yearly' | 'lifetime') => {
    initLemonSqueezy()
    const variantId = licenseType === 'yearly' ? selectedVariantYearly : selectedVariantLifetime

    fetch('/api/start-checkout', {
      method: 'POST',
      body: JSON.stringify({ variantId: variantId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: { url: string }) => {
        sendTrackingToGoogleAds()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        LemonSqueezy.Url.Open(data.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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

        <section style={{ position: 'relative' }} id={'pricing'}
                 className={'landingPageSection premiumPage__pricing'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_inclined.svg'} alt={'hello'}
                 width={1400}
                 height={479}/>

          <h2 className={'premiumSectionHeading heading-font'}>Pricing</h2>

          <div className={'premiumPageCards'}>
            <PricingCard
              startCheckout={startCheckout}
              price={yearlyPricing}
              isPriceYearly
              data={{
                title: 'Yearly plan',
                description: 'License for one year, with support and updates',
                variants: yearlyVariants,
                features: [
                  'All products',
                  'Email support',
                  'Prioritized issue processing',
                ],
                buttonText: 'Start 14-day trial'
              }}
              buttonClass={'filled'}
              onSelectVariant={(value) => setSelectedVariantYearly(value)}
              licenseType={'yearly'}
            />

            <PricingCard
              startCheckout={startCheckout}
              price={lifetimePricing}
              isPriceYearly={false}
              data={{
                title: 'Lifetime license',
                description: 'Perpetual license, with 1 year of support and updates',
                variants: lifetimeVariants,
                features: [
                  'All products',
                  'Email support',
                  'Prioritized issue processing',
                ],
                buttonText: 'Buy now'
              }}
              buttonClass={'filled'}
              onSelectVariant={(value) => setSelectedVariantLifetime(value)}
              licenseType={'lifetime'}
            />

            <SalesCard
              data={{
                title: 'Enterprise',
                description: 'All products, plus service and custom plugins',
                features: [
                  'All products',
                  'Service Level Agreement',
                  'Custom-made plugins',
                  'Private chat support',
                  'Prioritized issue processing',
                ],
                buttonText: 'Get in touch'
              }}
              buttonLink={'https://docs.google.com/forms/d/e/1FAIpQLSfE0G6RCUbnzbEUCMGEKcfUGx6XprAPU_IGRxNZ2UajizU7SA/viewform?usp=sf_link'}
              buttonClass={'black'}
            />
          </div>

          <p style={{ color: 'gray', margin: '0 2rem', textAlign: 'center' }}>The following&nbsp;
            <Link href={'/terms-and-conditions'} style={{ textDecoration: 'underline' }}>
              terms and conditions
            </Link> apply to all license models.
          </p>
        </section>

        <section className={'faq'}>
          <h2 className={'premiumSectionHeading heading-font'}>FAQ</h2>

          <Accordion style={{ width: '100%', maxWidth: '950px' }}>
            <Accordion.Panel header="Can I use the license commercially?" defaultExpanded>
                <i>Yes, you can.</i> Use it whatever way you see fit, except reselling the Schedule-X premium source code
                as if it was your own product.
              </Accordion.Panel>

              <Accordion.Panel header="For how many projects can I use 1 license?">
                You need 1 license per project you use Schedule-X premium in. If you for example have a dev agency with
                multiple customers and projects,
                you need 1 license per project.

                <br></br>
                <br></br>
                A "project" here, however, is not defined by the number of users or the number of instances your
                software will be deployed to.
                Think of it more as a "product". If you have a SaaS platform with many customers that maybe even self-host
                your platform, that still just counts as 1 project. After all,
                for you it's just 1 product.

                <br></br>
                <br></br>
                If you are uncertain about how many licenses you need, please reach out to tom(at)schedule-x.dev
              </Accordion.Panel>

              <Accordion.Panel header="How many issues and feature requests are included?">
                There is no limit to how many issues and feature requests you can submit. However, you buy the
                software <i>as is</i>, without any guarantee that I will build features that you request.

                <br/>
                <br/>

                If you want certainty that a feature will be built, you need to select "Enterprise". Thereafter we can discuss the features, so I can give you a quote.
              </Accordion.Panel>

              <Accordion.Panel header="Can I cache the software on my servers?">
                Yes. This is even encouraged. For example, you can use software like <a href={"https://verdaccio.org/"}
                                                                                        target={'_blank'} style={{
                textDecoration: 'underline',
                color: '#6750a4'
              }}>Verdaccio</a> or JFrog artifactory. However,
                <strong> this does not mean that you are allowed to use Schedule-X premium beyond the terms of the
                  license you purchased.</strong> You need to pay the yearly subscription, for as long as the software
                is being used, unless you have a lifetime license.
              </Accordion.Panel>

              <Accordion.Panel header="Is there a trial for the lifetime license?">
                No, there is no trial for the lifetime license, due to limitations in my merchant of record, Lemonsqueezy. If you need a free trial
                but want to purchase a lifetime license, you will need to purchase the yearly license first, cancel the trial, and then purchase the lifetime license.
              </Accordion.Panel>
            </Accordion>
          </section>
      </div>
    </>
)
}
