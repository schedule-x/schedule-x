import AppCheckmark from "../sales-card/checkmark";
import styles from './features-list.module.scss';

type props = {
  features: string[];
}

export default function FeaturesList({ features }: props) {
  return (
    <ul className={styles.featuresList}>
      {features.map((feature, index) => (
        <li key={index}>
          <AppCheckmark/>
          {feature}
        </li>
      ))}
    </ul>
  )
}
