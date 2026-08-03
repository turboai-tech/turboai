export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Turbo AI',
  shortName: 'Turbo · ai',
  description:
    'Turbo AI is a frontier AI build-and-delivery company. We design, build and ship AI products for startups and enterprises in Shanghai, Tokyo and beyond.',
  tagline: 'We build anything with AI',
  email: 'contact@iturboai.com',
  careersEmail: 'careers@iturboai.com',
  locations: ['Shanghai, China', 'Tokyo, Japan'] as const,
}
