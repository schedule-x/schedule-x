'use client'

import { ProductVariant } from "../pricing-card/pricing-card"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import PricingCard from "../pricing-card/pricing-card"
import SalesCard from "../sales-card/sales-card"


export default function AppCheckout() {
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
        return yearlyVariants.find((variant) => variant.id === selectedVariantYearly)?.price || 299
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
              price={lifetimePricing || 599}
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
        </>
    )
}