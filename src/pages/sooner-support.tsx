import * as stylex from '@stylexjs/stylex'

import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { SOONER_SUPPORT_EMAIL, soonerSupportContent, type SupportSegment } from './sooner-support-content'

const styles = stylex.create({
  main: {
    maxWidth: '42rem',
  },
  title: {
    margin: '2rem 0 1rem',
  },
  accent: {
    color: colors.accent,
  },
  contact: {
    marginBottom: '1.5rem',
  },
  languages: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  },
  locale: {
    scrollMarginTop: '2rem',
  },
  link: {
    outline: {
      default: null,
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '4px',
  },
})

function Segments({ segments }: { segments: SupportSegment[] }) {
  return segments.map((segment, index) => (
    typeof segment === 'string' ? segment : (
      <a key={index} href={segment.href} {...stylex.props(styles.link)}>
        {segment.text}
      </a>
    )
  ))
}

export default function SoonerSupportPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(shared.pageTitle, styles.title)}>
        <span {...stylex.props(styles.accent)}>趁鲜 / Sooner</span>{' '}
        <span lang="zh-CN">支持</span> / <span lang="en">Support</span>
      </h1>
      <p {...stylex.props(shared.regLabel, styles.contact)}>
        <span lang="zh-CN">联系</span> / <span lang="en">Contact</span>:{' '}
        <a href={`mailto:${SOONER_SUPPORT_EMAIL}`} {...stylex.props(styles.link)}>{SOONER_SUPPORT_EMAIL}</a>
      </p>

      <article className="md-reader" style={{ fontSize: '16px' }}>
        <nav aria-label="语言 / Language" {...stylex.props(styles.languages)}>
          <a href="#zh" lang="zh-CN" {...stylex.props(styles.link)}>中文</a>
          <a href="#en" lang="en" {...stylex.props(styles.link)}>English</a>
        </nav>

        {soonerSupportContent.map((locale) => (
          <section
            key={locale.id}
            id={locale.id}
            lang={locale.lang}
            aria-labelledby={`${locale.id}-title`}
            {...stylex.props(styles.locale)}
          >
            <h2 id={`${locale.id}-title`}>{locale.title}</h2>
            <p><Segments segments={locale.intro} /></p>
            {locale.questions.map((question) => (
              <section key={question.heading}>
                <h3>{question.heading}</h3>
                {question.paragraphs.map((paragraph, index) => (
                  <p key={index}><Segments segments={paragraph} /></p>
                ))}
              </section>
            ))}
          </section>
        ))}
      </article>
    </main>
  )
}
