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
    slug: 'apple-package',
    name: 'ApplePackage',
    oneLiner: 'ipatool rewrite as a Swift library and CLI for Apple packages.',
    status: 'active',
    kind: 'Swift CLI',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/ApplePackage' }],
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
    slug: 'snell-panel',
    name: 'snell-panel',
    oneLiner:
      'Snell proxy node manager & subscription generator on Cloudflare Workers.',
    status: 'active',
    kind: 'Workers',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/snell-panel' }],
  },
  {
    slug: 'modern-appkit',
    name: 'Modern.AppKit',
    oneLiner: 'Companion AppKit starter alongside Modern.UIKit.',
    status: 'active',
    kind: 'macOS',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.AppKit' }],
  },
  {
    slug: 'homebrew-star',
    name: 'homebrew-star',
    oneLiner: 'Casks and formulae not in the official Homebrew records.',
    status: 'active',
    kind: 'Homebrew',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/homebrew-star' }],
  },
  {
    slug: 'eevee-spotify',
    name: 'EeveeSpotifyReincarnated',
    oneLiner: 'Enhancing the Spotify experience on iOS via sideload sources.',
    status: 'paused',
    kind: 'iOS',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Zach677/EeveeSpotifyReincarnated',
      },
    ],
  },
  {
    slug: 'zach-skills',
    name: 'Zach-Skills',
    oneLiner: 'Personal AI agent skills collection.',
    status: 'paused',
    kind: 'Agents',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Zach-Skills' }],
  },
  {
    slug: 'cet-system',
    name: 'CET-System',
    oneLiner: 'CET exam tooling and workflow helpers.',
    status: 'paused',
    kind: 'TypeScript',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/CET-System' }],
  },
  {
    slug: 'dotfiles',
    name: 'dotfiles',
    oneLiner: 'Machine setup, shell config, and everyday CLI defaults.',
    status: 'paused',
    kind: 'Shell',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/dotfiles' }],
  },
  {
    slug: 'zaxh-org',
    name: 'zaxh.org',
    oneLiner: 'This site — personal hub, quiet paper.',
    status: 'active',
    kind: 'Web',
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/zaxh.org' }],
  },
]
