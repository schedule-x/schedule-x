/* eslint-disable */
'use client'

import { ProductVariant } from "../pricing-card/pricing-card"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import PricingCard from "../pricing-card/pricing-card"
import PricingCardNew from "../pricing-card-new/pricing-card-new"
import SalesCard from "../sales-card/sales-card"
import { LicenseType } from "../pricing-card/pricing-card"
import { getStoredVariant, getStoredUserId } from "../../ab-test-init/ab-test-init"

const AB_TESTING_URL = 'https://sx-ab.netlify.app';
const EXPERIMENT_NAME = 'prefill_seats_vs_no_prefill';

// Track event
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function trackEvent(experimentName: string, userId: string, event: string, metadata?: Record<string, any>): Promise<void> {
  try {
    await fetch(`${AB_TESTING_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment: experimentName,
        userId: userId,
        event: event,
        metadata: metadata,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export default function AppCheckout() {
    // Initialize with defaults - will be updated from localStorage in useEffect
    const [abTestVariant, setAbTestVariant] = useState<string>('A')
    const [userId, setUserId] = useState<string>('')
    const [checkoutStep, setCheckoutStep] = useState<LicenseType | null>(null)
    const [developerCount, setDeveloperCount] = useState<string>('')
    
    // Old flow state (Variant A)
    const [selectedVariantYearly, setSelectedVariantYearly] = useState<number>(614707)
    const [selectedVariantLifetime, setSelectedVariantLifetime] = useState<number>(517516)

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
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        initLemonSqueezy()
        
        // Read variant and userId from localStorage (assigned by AbTestInit)
        const storedVariant = getStoredVariant()
        const storedUserId = getStoredUserId()
        
        if (storedVariant) {
          setAbTestVariant(storedVariant)
        }
        
        if (storedUserId) {
          setUserId(storedUserId)
        }
      }, [])
    
      const sendTrackingToGoogleAds = () => {
        if ('gtag' in window) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          gtag('event', 'conversion', { 'send_to': 'AW-16716598695/fmXbCKu755QaEKebjKM-', 'transaction_id': '' })
        }
      }

      const getVariantFromDeveloperCount = (count: number, licenseType: LicenseType): number => {
        const variants = licenseType === 'yearly' ? yearlyVariants : lifetimeVariants
        
        if (count === 1) return variants[0].id
        if (count >= 2 && count <= 3) return variants[1].id
        if (count >= 4 && count <= 6) return variants[2].id
        if (count >= 7 && count <= 9) return variants[3].id
        return variants[4].id // 10+
      }
      
      const getDeveloperCountFromVariant = (variantId: number, licenseType: LicenseType): number | null => {
        const variants = licenseType === 'yearly' ? yearlyVariants : lifetimeVariants
        const variant = variants.find(v => v.id === variantId)
        if (!variant) return null
        
        // Extract number from label like "1 developer", "2-3 developers", "10+ developers"
        const match = variant.label.match(/(\d+)/)
        return match ? parseInt(match[1]) : null
      }
    
      const startCheckout = (variantId: number, licenseType?: LicenseType, developerCount?: number) => {
        initLemonSqueezy()
        
        // Track conversion event
        if (userId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const metadata: Record<string, any> = {
            variantId,
            licenseType,
            timestamp: new Date().toISOString(),
          }
          
          if (developerCount !== undefined) {
            metadata.developerCount = developerCount
          }
          
          trackEvent(EXPERIMENT_NAME, userId, 'conversion', metadata)
        }
    
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
      
      // Old flow (Variant A): direct checkout with selected dropdown value
      const startCheckoutOldFlow = (licenseType: LicenseType) => {
        const variantId = licenseType === 'yearly' ? selectedVariantYearly : selectedVariantLifetime
        const devCount = getDeveloperCountFromVariant(variantId, licenseType)
        startCheckout(variantId, licenseType, devCount || undefined)
      }

      // New flow (Variant B): two-step checkout
      const handleStartCheckout = (licenseType: LicenseType) => {
        setCheckoutStep(licenseType)
        
        // Track that user clicked to start checkout
        if (userId) {
          trackEvent(EXPERIMENT_NAME, userId, 'start_checkout_clicked', {
            licenseType,
            timestamp: new Date().toISOString(),
          })
        }
      }

      const handleProceedToCheckout = () => {
        const count = parseInt(developerCount)
        if (isNaN(count) || count < 1 || !checkoutStep) return
        
        const variantId = getVariantFromDeveloperCount(count, checkoutStep)
        startCheckout(variantId, checkoutStep, count)
      }

      const handleBackToPricing = () => {
        setCheckoutStep(null)
        setDeveloperCount('')
      }

    const isOldFlow = abTestVariant === 'A'
    const yearlyPrice = yearlyVariants.find(v => v.id === selectedVariantYearly)?.price || 299
    const lifetimePrice = lifetimeVariants.find(v => v.id === selectedVariantLifetime)?.price || 599

    return (
        <>
        {checkoutStep === null ? (
        <section style={{ position: 'relative' }} id={'pricing'}
                 className={'landingPageSection premiumPage__pricing'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_inclined.svg'} alt={'hello'}
                 width={1400}
                 height={479}/>

          <h2 className={'premiumSectionHeading heading-font'}>Pricing</h2>

          <div className={'premiumPageCards'}>
            {isOldFlow ? (
              // Variant A: Old flow with dropdown
              <PricingCard
                startCheckout={startCheckoutOldFlow}
                price={yearlyPrice}
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
            ) : (
              // Variant B: New flow with price range
              <PricingCardNew
                onStartCheckout={handleStartCheckout}
                startingPrice={yearlyVariants[0].price}
                isPriceYearly
                data={{
                  title: 'Yearly plan',
                  description: 'License for one year, with support and updates',
                  features: [
                    'All products',
                    'Email support',
                    'Prioritized issue processing',
                  ],
                  buttonText: 'Start Checkout'
                }}
                buttonClass={'filled'}
                licenseType={'yearly'}
              />
            )}

            {isOldFlow ? (
              // Variant A: Old flow with dropdown
              <PricingCard
                startCheckout={startCheckoutOldFlow}
                price={lifetimePrice}
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
            ) : (
              // Variant B: New flow with price range
              <PricingCardNew
                onStartCheckout={handleStartCheckout}
                startingPrice={lifetimeVariants[0].price}
                isPriceYearly={false}
                data={{
                  title: 'Lifetime license',
                  description: 'Perpetual license, with 1 year of support and updates',
                  features: [
                    'All products',
                    'Email support',
                    'Prioritized issue processing',
                  ],
                  buttonText: 'Start Checkout'
                }}
                buttonClass={'filled'}
                licenseType={'lifetime'}
              />
            )}

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
        ) : !isOldFlow ? (
        // Variant B only: Developer count input screen
        <section style={{ position: 'relative' }} id={'checkout'}
                 className={'landingPageSection premiumPage__checkout'}>
          <Image className={'sectionImage'} src={'/images/website_section_fade_inclined.svg'} alt={''}
                 width={1400}
                 height={479}/>

          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <h2 className={'premiumSectionHeading heading-font'} style={{ marginBottom: '1rem' }}>
              How many developers are on your team?
            </h2>

            <p style={{ color: 'rgba(13, 13, 13, 0.6)', marginBottom: '2rem', lineHeight: '1.6' }}>
              What matters is the total number of developers working on your product, not just those who will directly integrate Schedule-X into your product.{' '}
              <Link target="_blank" href={'/terms-and-conditions#2-seat-based-licensing-per-software-project'} style={{ textDecoration: 'underline', color: '#6750a4' }}>
                Read more about our seat-based licensing
              </Link>
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <input
                type="number"
                min="1"
                value={developerCount}
                onChange={(e) => setDeveloperCount(e.target.value)}
                placeholder="Enter number of developers"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#6750a4'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleBackToPricing}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  border: '2px solid #6750a4',
                  background: 'transparent',
                  color: '#6750a4',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Back
              </button>
              <button
                onClick={handleProceedToCheckout}
                disabled={!developerCount || parseInt(developerCount) < 1}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  border: 'none',
                  background: (!developerCount || parseInt(developerCount) < 1) 
                    ? '#ccc' 
                    : 'linear-gradient(to right, #6750a4 50%, #8c6fb7 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: (!developerCount || parseInt(developerCount) < 1) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>
        ) : null}
        </>
    )
}