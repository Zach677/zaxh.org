import { type FunctionComponent, type JSX, Children } from 'react'
import type { MDXComponents } from 'mdx/types'

import { FigureCodeBlock, PreCodeBlock } from './CodeBlock'
import { Image } from './Image'
import { Inventory } from '@/components/Inventory'
import { AboutNow } from '@/components/AboutNow'

export interface ReaderProps {
  contentComponent: FunctionComponent<{
    components: MDXComponents
  }>
  components?: MDXComponents
}

const overrideComponents: MDXComponents = {
  figure: FigureCodeBlock,
  pre: PreCodeBlock,
  Inventory: Inventory as unknown as FunctionComponent,
  AboutNow: AboutNow as unknown as FunctionComponent,
  p(props) {
    if (Children.count(props.children) === 1) {
      const child = Children.toArray(props.children)[0] as JSX.Element
      if (
        typeof child === 'object' &&
        'type' in child &&
        child.type === 'img'
      ) {
        return <Image {...child.props} />
      }
    }
    return <p {...props} />
  },
}

export function Reader(props: ReaderProps) {
  const ContentComponent = props.contentComponent
  const components = {
    ...overrideComponents,
    ...props.components,
  }
  return <ContentComponent components={components} />
}
