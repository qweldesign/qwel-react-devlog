// navigation.ts
 
export const sections = [
  'feature',
  'about',
  'service',
  'news',
  'team',
  'access',
  'contact'
] as const

export type SectionName = typeof sections[number]

export const socials = [
  'x',
  'facebook',
  'instagram'
] as const

export type SocialName = typeof socials[number]
