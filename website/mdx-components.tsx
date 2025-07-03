import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: any) {
  return {
    ...themeComponents,
    ...components
  }
}
