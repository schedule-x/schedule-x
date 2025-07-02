import AppCheckmark from "./checkmark";

type props = {
  data: {
    title: string;
    description: string;
    features: string[];
    buttonText: string;
  };
  buttonClass?: string;
  buttonLink?: string;
  buttonCallback?: () => void;
}

export default function SalesCard({ data, buttonClass, buttonLink, buttonCallback }: props) {
  return (
    <div className="sales-card">
      <h3 className="heading-font">
        {data.title}
      </h3>

      <p className="sales-card-description">{data.description}</p>

      <ul className="sales-card-features">
        {data.features.map((feature, index) => (
          <li key={index}>
            <AppCheckmark />
            {feature}
          </li>
        ))}
      </ul>

      {buttonLink && (
        <a href={buttonLink} target={'_blank'} className="btn-area">
          <button className={buttonClass + ' btn'}>{data.buttonText}</button>
        </a>
      )}

      {buttonCallback && (
        <button className={buttonClass + ' btn'} onClick={() => buttonCallback()}>{data.buttonText}</button>
      )}
    </div>
  );
}
