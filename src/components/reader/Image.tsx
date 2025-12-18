import { useState } from 'react'

export interface ImageProps {
  src?: string
  alt?: string
  title?: string
}

export function Image(props: ImageProps) {
  const { src, alt, title } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-md border border-separator">
      <img
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        alt={alt}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
