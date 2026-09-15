export type ProjectStatus = 'active' | 'paused' | 'archive'
export type ProjectVisibility = 'public' | 'private'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  slug: string
  name: string
  oneLiner: string
  /** Short atlas callout for constellation hover (optional). */
  callout?: string
  status: ProjectStatus
  tags: string[]
  links: ProjectLink[]
  featured?: boolean
  visibility?: ProjectVisibility
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
    visibility: 'public',
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
    visibility: 'public',
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
    visibility: 'public',
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
    visibility: 'public',
  },
  {
    slug: 'modern-appkit',
    name: 'Modern.AppKit',
    oneLiner: 'Companion AppKit starter alongside Modern.UIKit.',
    callout: 'AppKit starter alongside UIKit',
    status: 'active',
    tags: ['Swift', 'AppKit', 'macOS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Modern.AppKit' }],
    visibility: 'public',
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
    visibility: 'public',
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
    visibility: 'public',
  },
  {
    slug: 'zach-skills',
    name: 'Zach-Skills',
    oneLiner: 'Personal AI agent skills collection.',
    callout: 'personal agent skills',
    status: 'paused',
    tags: ['Python', 'Agents'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/Zach-Skills' }],
    visibility: 'public',
  },
  {
    slug: 'cet-system',
    name: 'CET-System',
    oneLiner: 'CET exam tooling and workflow helpers.',
    callout: 'CET exam tooling',
    status: 'paused',
    tags: ['TypeScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/CET-System' }],
    visibility: 'public',
  },
  {
    slug: 'dotfiles',
    name: 'dotfiles',
    oneLiner: 'Machine setup, shell config, and everyday CLI defaults.',
    callout: 'machine setup, everyday CLI',
    status: 'paused',
    tags: ['Shell', 'dotfiles'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/dotfiles' }],
    visibility: 'public',
  },
  {
    slug: 'liftparse',
    name: 'LiftParse',
    oneLiner:
      'Compile workout videos into evidence-backed structured training plans.',
    status: 'active',
    tags: ['Rust', 'Fitness'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'rivet',
    name: 'Rivet',
    oneLiner:
      'Cloudflare-native recruitment collection pipeline for local job boards.',
    status: 'active',
    tags: ['TypeScript', 'Cloudflare'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'keeping-books',
    name: 'keeping-books',
    oneLiner: 'Personal ledger and bookkeeping tools.',
    status: 'active',
    tags: ['Python', 'Finance'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'wechat-post',
    name: 'wechat-post',
    oneLiner: 'WeChat official-account post drafting and publishing helpers.',
    status: 'active',
    tags: ['HTML', 'WeChat'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'local-skills',
    name: 'local-skills',
    oneLiner: 'On-device AI agent skills in a scalable directory layout.',
    status: 'active',
    tags: ['Python', 'Agents'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'hanjiang',
    name: 'hanjiang',
    oneLiner: 'Small TypeScript utility project (private).',
    status: 'active',
    tags: ['TypeScript'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'shop-miniprogram',
    name: 'shop-miniprogram',
    oneLiner: 'WeChat mini-program for a small shopfront.',
    status: 'active',
    tags: ['JavaScript', 'WeChat'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'twitter-sc',
    name: 'twitter-sc',
    oneLiner: 'Twitter/X scraping and collection experiments.',
    status: 'paused',
    tags: ['TypeScript'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'capart',
    name: 'CapArt',
    oneLiner: 'macOS capture / art utility (private).',
    status: 'paused',
    tags: ['Swift', 'macOS'],
    links: [],
    visibility: 'private',
  },
  {
    slug: 'zaxh-org',
    name: 'zaxh.org',
    oneLiner: 'This site — personal hub, quiet paper.',
    callout: 'this site — quiet paper',
    status: 'active',
    tags: ['React', 'Vite', 'StyleX'],
    links: [{ label: 'GitHub', url: 'https://github.com/Zach677/zaxh.org' }],
    visibility: 'public',
  },
]

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function publicProjects(): Project[] {
  return projects.filter((p) => p.visibility !== 'private')
}

export function privateProjects(): Project[] {
  return projects.filter((p) => p.visibility === 'private')
}
