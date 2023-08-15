export const translate = (locale: string, languages: Record<string, object>) => (key: string): string => {
  locale = locale.replace('-', '')
  const language = languages[locale]
  if (!language) return key

  return language[key as keyof typeof language] || key
}