export type ProjectStatus = 'active' | 'paused'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  slug: string
  name: string
  oneLiner: string
  /** Short note for the home contents list. Falls back to `oneLiner`. */
  callout?: string
  status: ProjectStatus
  tags: string[]
  links: ProjectLink[]
  /** Listed on the home page, in index order. */
  featured?: boolean
}

/** Draft project index — copy is editable. */
export const projects: Project[] = [
  {
    slug: 'mitori',
    name: 'mitori',
    oneLiner:
      'Native macOS menu bar app for checking Apple ID store credit across accounts.',
    callout: 'menu bar · Apple ID credit',
    status: 'active',
    tags: ['Swift', 'macOS', 'AppKit'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Zach677/mitori' },
      { label: 'Privacy', url: '/mitori/privacy' },
    ],
    featured: true,
  },
  {
    slug: 'apple-package',
    name: 'ApplePackage',
    oneLiner: 'ipatool rewrite as a Swift library and CLI for Apple packages.',
    callout: 'ipatool rewrite · Swift CLI',
    status: 'active',
    tags: ['Swift', 'CLI', 'iOS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/ApplePackage' }],
    featured: true,
  },
  {
    slug: 'modern-uikit',
    name: 'Modern.UIKit',
    oneLiner: 'Agent-native UIKit starter for shipping iOS apps faster.',
    callout: 'agent-native UIKit starter',
    status: 'active',
    tags: ['Swift', 'UIKit', 'iOS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.UIKit' }],
    featured: true,
  },
  {
    slug: 'snell-panel',
    name: 'snell-panel',
    oneLiner:
      'Snell proxy node manager & subscription generator on Cloudflare Workers.',
    callout: 'snell · Cloudflare Workers',
    status: 'active',
    tags: ['Cloudflare', 'Hono', 'Workers'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/snell-panel' }],
    featured: true,
  },
  {
    slug: 'modern-appkit',
    name: 'Modern.AppKit',
    oneLiner: 'Companion AppKit starter alongside Modern.UIKit.',
    callout: 'AppKit starter alongside UIKit',
    status: 'active',
    tags: ['Swift', 'AppKit', 'macOS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.AppKit' }],
  },
  {
    slug: 'homebrew-star',
    name: 'homebrew-star',
    oneLiner: 'Casks and formulae not in the official Homebrew records.',
    callout: 'casks & formulae off-record',
    status: 'active',
    tags: ['Homebrew', 'Ruby', 'macOS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/homebrew-star' }],
    featured: true,
  },
  {
    slug: 'eevee-spotify',
    name: 'EeveeSpotifyReincarnated',
    oneLiner: 'Enhancing the Spotify experience on iOS via sideload sources.',
    callout: 'Spotify sideload on iOS',
    status: 'paused',
    tags: ['iOS', 'Spotify'],
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
    callout: 'personal agent skills',
    status: 'paused',
    tags: ['Python', 'Agents'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Zach-Skills' }],
  },
  {
    slug: 'cet-system',
    name: 'CET-System',
    oneLiner: 'CET exam tooling and workflow helpers.',
    callout: 'CET exam tooling',
    status: 'paused',
    tags: ['TypeScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/CET-System' }],
  },
  {
    slug: 'dotfiles',
    name: 'dotfiles',
    oneLiner: 'Machine setup, shell config, and everyday CLI defaults.',
    callout: 'machine setup, everyday CLI',
    status: 'paused',
    tags: ['Shell', 'dotfiles'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/dotfiles' }],
  },
  {
    slug: 'zaxh-org',
    name: 'zaxh.org',
    oneLiner: 'This site — personal hub, quiet paper.',
    callout: 'this site — quiet paper',
    status: 'active',
    tags: ['React', 'Vite', 'StyleX'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/zaxh.org' }],
  },
]

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
