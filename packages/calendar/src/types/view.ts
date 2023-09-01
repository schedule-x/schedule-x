import { InternalView } from '../enums/internal-view.enum'

// Since implementers can use custom views, we need to have a type that combines the internal views with these custom views
export type View = InternalView | string
