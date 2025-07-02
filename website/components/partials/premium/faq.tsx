'use client'

import {Accordion} from 'rsuite';

export default function FAQ() {
    return <>
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
    </>
}