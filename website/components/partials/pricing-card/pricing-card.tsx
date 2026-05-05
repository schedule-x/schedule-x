import AppCheckmark from "./checkmark";
import AppDropdown from "../app-dropdown/app-dropdown";
import VatTooltip from "./vat-tooltip";
import "./vat-tooltip.scss";

export type ProductVariant = {
  label: string;
  price: number;
  id: number;
}

export type LicenseType = 'yearly' | 'lifetime';

type props = {
  data: {
    title: string;
    description: string;
    variants: ProductVariant[];
    features: string[];
    buttonText: string;
  };
  buttonClass?: string;
  onSelectVariant?: (item: number) => void;
  price: number;
  isPriceYearly?: boolean;
  startCheckout?: (licenseType: LicenseType) => void;
  licenseType?: LicenseType;
  defaultVariantId?: number;
}

export default function PricingCard({ data, buttonClass, onSelectVariant, price, isPriceYearly, startCheckout, licenseType, defaultVariantId }: props) {
  const showVatTooltip = licenseType === 'yearly' || licenseType === 'lifetime';
  const defaultVariant =
    (defaultVariantId !== undefined && data.variants?.find((v) => v.id === defaultVariantId)) ||
    data.variants?.[0];

  return (
    <div className="pricing-card">
      <h3 className="heading-font">
        {data.title}
      </h3>

      <p className="pricing-card-description">{data.description}</p>

      {data.variants && data.variants.length && (
        <AppDropdown onSelect={onSelectVariant} items={data.variants} selectedItem={defaultVariant} />
      )}

      <div className="pricing-card-price-wrapper">
        <h4 className="pricing-card-price">
          €{price}

          {isPriceYearly && (
            <span className="pricing-card-price-period">/ year</span>
          )}
        </h4>
        
        {showVatTooltip && (
          <VatTooltip />
        )}
      </div>

      <ul className="pricing-card-features">
        {data.features.map((feature, index) => (
          <li key={index}>
            <AppCheckmark />
            {feature}
          </li>
        ))}
      </ul>

      {licenseType && (
        <button className={buttonClass + ' btn'} onClick={() => startCheckout?.(licenseType)}>{data.buttonText}</button>
      )}
    </div>
  );
}
