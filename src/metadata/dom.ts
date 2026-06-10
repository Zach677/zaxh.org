import type { Metadata } from './types'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function findOrInsertMetaElement(name?: string, property?: string) {
  const selector = name
    ? `meta[name='${name}']`
    : property
      ? `meta[property='${property}']`
      : ''
  if (!selector) {
    throw new Error('Invalid metadata')
  }

  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    if (name) {
      element.setAttribute('name', name)
    } else if (property) {
      element.setAttribute('property', property)
    }
    document.head.appendChild(element)
  }
  return element as HTMLMetaElement
}

export function renderMetadata(metadata: Metadata) {
  const { title, description, url } = metadata

  let titleElement = document.head.querySelector('title')
  if (!titleElement) {
    titleElement = document.createElement('title')
    document.head.appendChild(titleElement)
  }
  titleElement.textContent = title || ''

  const descriptionElement = findOrInsertMetaElement('description')
  descriptionElement.setAttribute('content', description || '')

  const ogDescriptionElement = findOrInsertMetaElement(
    undefined,
    'og:description',
  )
  ogDescriptionElement.setAttribute('content', description || '')

  const twDescriptionElement = findOrInsertMetaElement('twitter:description')
  twDescriptionElement.setAttribute('content', description || '')

  // Routes without a url (e.g. 404) carry no og:url/canonical at all,
  // matching the SSG output.
  if (url) {
    const ogUrlElement = findOrInsertMetaElement(undefined, 'og:url')
    ogUrlElement.setAttribute('content', url)
  } else {
    document.head.querySelector('meta[property=\'og:url\']')?.remove()
  }

  let canonicalElement = document.head.querySelector('link[rel=\'canonical\']')
  if (url) {
    if (!canonicalElement) {
      canonicalElement = document.createElement('link')
      canonicalElement.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalElement)
    }
    canonicalElement.setAttribute('href', url)
  } else if (canonicalElement) {
    canonicalElement.remove()
  }
}

export function renderMetadataToString(metadata: Metadata) {
  const { title, description, url } = metadata
  let htmlString = ''

  if (title) {
    htmlString += `<title>${escapeHtml(title)}</title>`
  }

  if (description) {
    const escapedDescription = escapeHtml(description)
    htmlString += `<meta name="description" content="${escapedDescription}">`
    htmlString += `<meta property="og:description" content="${escapedDescription}">`
    htmlString += `<meta name="twitter:description" content="${escapedDescription}">`
  }

  if (url) {
    const escapedUrl = escapeHtml(url)
    htmlString += `<meta property="og:url" content="${escapedUrl}">`
    htmlString += `<link rel="canonical" href="${escapedUrl}">`
  }

  return htmlString
}
