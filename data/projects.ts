export type ProjectStatus = 'active' | 'paused'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  slug: string
  name: string
  oneLiner: string
  status: ProjectStatus
  /** Short kind label, shown at the end of a contents line. */
  kind: string
  links: ProjectLink[]
}

/** Draft project index — copy is editable. */
export const projects: Project[] = [
  {
    slug: 'mitori',
    name: 'mitori',
    oneLiner:
      'Native macOS menu bar app for checking Apple ID store credit across accounts.',
    status: 'active',
    kind: 'macOS',
    links: [
      { label: 'GitHub', url: 'https://github.com/Zach677/mitori' },
      { label: 'Privacy', url: '/mitori/privacy' },
    ],
  },
  {
    slug: 'modern-uikit',
    name: 'Modern.UIKit',
    oneLiner: 'Agent-native UIKit starter for shipping iOS apps faster.',
    status: 'active',
    kind: 'iOS',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.UIKit' }],
  },
  {
    slug: 'homebrew-star',
    name: 'homebrew-star',
    oneLiner: 'Casks and formulae not in the official Homebrew records.',
    status: 'active',
    kind: 'Homebrew',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/homebrew-star' }],
  },
]
