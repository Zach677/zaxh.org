import type { IconType } from '../components/icon'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: number
}

export interface SocialLink {
  name: string
  url: string
  icon: IconType
}
