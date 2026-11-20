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
    name: 'Mitori',
    oneLiner: 'Check Apple ID store credit across accounts from the menu bar.',
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
    oneLiner: 'Agent-native, programmatic UIKit starter for iOS 26 and Swift 6.',
    status: 'active',
    kind: 'iOS',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.UIKit' }],
  },
  {
    slug: 'homebrew-star',
    name: 'homebrew-star',
    oneLiner: 'Casks and formulae outside the official Homebrew taps.',
    status: 'active',
    kind: 'Homebrew',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/homebrew-star' }],
  },
]
