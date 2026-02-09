import AppCheckmark from "../pricing-card/checkmark";
import VatTooltip from "../pricing-card/vat-tooltip";
import "../pricing-card/vat-tooltip.scss";
import "./pricing-card-new.scss";
import { LicenseType } from "../pricing-card/pricing-card";

type props = {
  data: {
    title: string;
    description: string;
    features: string[];
    buttonText: string;
  };
  buttonClass?: string;
  startingPrice: number;
  isPriceYearly?: boolean;
  onStartCheckout?: (licenseType: LicenseType) => void;
  licenseType?: LicenseType;
}

export default function PricingCardNew({ data, buttonClass, startingPrice, isPriceYearly, onStartCheckout, licenseType }: props) {
  const showVatTooltip = licenseType === 'yearly' || licenseType === 'lifetime';

  return (
    <div className="pricing-card-new">
      <h3 className="heading-font">
        {data.title}
      </h3>

      <p className="pricing-card-new-description">{data.description}</p>

      <div className="pricing-card-new-price-wrapper">
        <p className="pricing-card-new-starting-text">
          Plans starting at
        </p>
        <h4 className="pricing-card-new-price">
          €{startingPrice}

          {isPriceYearly && (
            <span className="pricing-card-new-price-period">/ year</span>
          )}
        </h4>
        
        {showVatTooltip && (
          <VatTooltip />
        )}
      </div>

      <ul className="pricing-card-new-features">
        {data.features.map((feature, index) => (
          <li key={index}>
            <AppCheckmark />
            {feature}
          </li>
        ))}
      </ul>

      {licenseType && (
        <button className={buttonClass + ' btn'} onClick={() => onStartCheckout?.(licenseType)}>{data.buttonText}</button>
      )}
    </div>
  );
}
