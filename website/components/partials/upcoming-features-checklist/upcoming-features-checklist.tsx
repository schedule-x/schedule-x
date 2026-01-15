import styles from './upcoming-features-checklist.module.scss';

type FeatureItem = {
  label: string;
  checked?: boolean;
}

type Props = {
  features: (string | FeatureItem)[];
}

export default function UpcomingFeaturesChecklist({ features }: Props) {
  return (
    <ul className={styles.checklist}>
      {features.map((feature, index) => {
        const item = typeof feature === 'string' ? { label: feature, checked: false } : feature;
        const isChecked = item.checked === true;
        
        return (
          <li key={index} className={styles.checklistItem}>
            <span className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`} aria-hidden="true">
              {isChecked ? (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="16" rx="2" fill="currentColor"/>
                  <path d="M6 10 L9 13 L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )}
            </span>
            <span className={styles.label}>{item.label}</span>
          </li>
        );
      })}
    </ul>
  )
}

