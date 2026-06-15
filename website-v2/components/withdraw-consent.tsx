'use client'

export default function WithdrawConsent() {
  const withdraw = () => {
    localStorage.removeItem('cookieConsent')
    location.reload()
  }

  return (
    <button className="sx-text-button" onClick={withdraw} type="button">
      Reset cookie consent
    </button>
  )
}
