"use client"

import { useState, useEffect, type CSSProperties } from "react"

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consentChoice = localStorage.getItem("cookieConsent")
    if (!consentChoice) {
      setShowConsent(true)
    }

    if (consentChoice === "accepted") {
      addGtag()
    }
  }, [])

  const addGtag = () => {
    const gtagScript = document.createElement('script');
    gtagScript.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=AW-16716598695');
    document.head.appendChild(gtagScript);
    const gtagHandler = document.createElement('script');
    gtagHandler.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16716598695');
    `;
    const uetTag = document.createElement('script');
    uetTag.innerHTML = `
        (function(w,d,t,r,u)
      {
        var f,n,i;
        w[u]=w[u]||[],f=function()
        {
          var o={ti:"97205819", enableAutoSpaTracking: true};
          o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
        },
        n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function()
        {
          var s=this.readyState;
          s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
        },
        i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
      })
      (window,document,"script","//bat.bing.com/bat.js","uetq");
    `

    document.head.appendChild(gtagHandler);
    const gTagManagerScript = document.createElement('script');
    gTagManagerScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NFBLZ8FC');
    `;
    document.head.appendChild(gTagManagerScript);
    document.head.appendChild(uetTag);
  }

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)

    addGtag()
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: "fixed",
      zIndex: 1000,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fafafa",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      padding: "4rem",
    },
    text: {
      color: "#4b5563",
    },
    buttonContainer: {
      display: "flex",
      gap: "0.5rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    acceptButton: {
      backgroundColor: "#6750a4",
      color: "white",
    },
    declineButton: {
      backgroundColor: "#e5e7eb",
      color: "#4b5563",
    },
  }

  return (
    <div style={styles.container}>
      <div className={'cookieConsentContent'}>
        <p style={styles.text}>
          We use cookies for marketing purposes. By clicking "Accept", you consent to the use of all cookies. If you decline, we will only use functional cookies. You can read more about our cookie policy <a style={{textDecoration: 'underline'}} href="/privacy">here</a>.
        </p>
        <div style={styles.buttonContainer}>
          <button onClick={handleAccept} style={{ ...styles.button, ...styles.acceptButton }}>
            Accept
          </button>
          <button onClick={handleDecline} style={{ ...styles.button, ...styles.declineButton }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent

