export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readTime: number
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
