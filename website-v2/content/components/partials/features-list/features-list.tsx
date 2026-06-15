import { Check } from 'lucide-react'

type Props = {
  features: string[]
}

export default function FeaturesList({ features }: Props) {
  return (
    <ul className="sx-feature-list">
      {features.map((feature) => (
        <li key={feature}>
          <Check aria-hidden="true" size={16} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}
