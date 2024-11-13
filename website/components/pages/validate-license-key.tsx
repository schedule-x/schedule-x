import { Fragment, useState } from 'react'
import styles from './validate-license-key.module.scss'

export default function ValidateLicenseKeyPage() {
  const [licenseKey, setLicenseKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [accessToken, setAccessToken] = useState('')

  const validateLicenseKey = async () => {
    setIsLoading(true)

    fetch('/api/validate-license-key', {
      method: 'POST',
      body: JSON.stringify({ key: licenseKey }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)

        if (data.status === 200) {
          setAccessToken(data.token)
        } else {
          setHasError(true)
        }
      })
      .catch(() => {
        setIsLoading(false)
        setHasError(true)
      })
  }

  return (
    <>
      <div className={styles.licenseKeyPage}>
        <section
          className={'validateLicenseKeyPage validateLicenseKeyPage__form'}
        >
          {!isLoading && !accessToken && !hasError && (
            <Fragment>
              <h1>Validate your license key 🔑</h1>

              <p>
                Enter your license key to validate it. In return, you will get
                an access token for the Schedule-X private registry. If you run
                into any problems, please contact us at tom@schedule-x.dev.
              </p>

              <input
                type="text"
                name="key"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Enter your license key"
              />
              <button onClick={validateLicenseKey} type="submit">
                Enter
              </button>
            </Fragment>
          )}

          {isLoading && <p>Validating...</p>}

          {accessToken && (
            <Fragment>
              <h1>Your access token ✅</h1>
              <p>
                Your access token is: <strong>{accessToken}</strong>
              </p>
              <p>
                Please save this token in a safe place. You will not be able to
                retrieve this token via this form again.
              </p>
            </Fragment>
          )}

          {hasError && (
            <>
              <h1>Something went wrong 🤔</h1>

              <p>
                There was an error validating your license key. Please try again
                or contact us at tom@schedule-x.dev, and we will get in touch as
                soon as possible.
              </p>
            </>
          )}
        </section>
      </div>
    </>
  )
}
