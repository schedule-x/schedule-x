'use client'

import { useState } from 'react'

export default function VatTooltip() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span 
      className="vat-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="vat-asterisk">*</span>
      <span className="vat-text">plus VAT</span>
      {isVisible && (
        <div className="vat-tooltip">
          <p>
            VAT will be calculated and applied by Lemon Squeezy upon charging based on the tax regulations applicable in your country.
          </p>
        </div>
      )}
    </span>
  )
}

