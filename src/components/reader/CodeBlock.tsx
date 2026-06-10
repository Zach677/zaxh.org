import { type PropsWithChildren, type JSX, Children } from 'react'

export function FigureCodeBlock(props: PropsWithChildren) {
  if ('data-rehype-pretty-code-figure' in props) {
    const element = Children.only(props.children) as JSX.Element
    const lang = element.props?.['data-language'] as string | undefined
    return (
      <div className="code-block">
        {lang ? <div className="code-head">{lang}</div> : null}
        <pre className="shiki" {...element.props} />
      </div>
    )
  }
  return <figure {...props} />
}

export function PreCodeBlock(props: PropsWithChildren) {
  const codeElement = Children.only(props.children) as JSX.Element
  const code = codeElement.props.children as string
  const className = (codeElement.props.className as string) || ''
  const lang = /language-(\w+)/.exec(className)?.[1]
  const codeLines = code.trim().split('\n')
  return (
    <div className="code-block">
      {lang ? <div className="code-head">{lang}</div> : null}
      <pre className="shiki">
        <code>
          {codeLines.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </code>
      </pre>
    </div>
  )
}
