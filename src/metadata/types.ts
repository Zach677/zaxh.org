import type { RouteObject } from 'react-router'

export interface Metadata {
  title?: string
  description?: string
  url?: string
}

// react-router no longer supports augmenting its route object interfaces
// (they moved into hashed internal chunks), so we carry the extra field
// through an intersection type instead.
export type RouteObjectWithMetadata = RouteObject & { metadata?: Metadata }
