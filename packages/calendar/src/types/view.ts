import { DefaultView } from '../enums/default-view.enum'

// Since implementers can use custom views, we need to have a type that combines the default views with these custom views
export type View = DefaultView | string
