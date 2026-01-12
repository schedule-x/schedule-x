import { Resource } from '@schedule-x/shared/src/types/calendar/resource'

type props = {
  dates: string[]
  resources: Resource[]
}

export default function ResourceHeader({ dates, resources }: props) {
  return (
    <div className="sx__resource-header">
      {dates.map((dateString) =>
        resources.map((resource) => (
          <div
            key={`${dateString}-${resource.id}`}
            className="sx__resource-header__resource"
            data-date={dateString}
            data-resource-id={resource.id}
          >
            {resource.name}
          </div>
        ))
      )}
    </div>
  )
}
