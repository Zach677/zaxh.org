import * as stylex from '@stylexjs/stylex'

import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { soonerPrivacyContent } from './sooner-privacy-content'

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
  preview: {
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

export default function SoonerPrivacyPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(shared.pageTitle, styles.title)}>
        <span {...stylex.props(styles.accent)}>趁鲜 / Sooner</span>{' '}
        <span lang="zh-CN">隐私政策</span> / <span lang="en">Privacy Policy</span>
      </h1>
      <p {...stylex.props(shared.regLabel, styles.preview)}>
        <span lang="zh-CN">{soonerPrivacyContent[0].preview}</span> /{' '}
        <span lang="en">{soonerPrivacyContent[1].preview}</span>
      </p>

      <article className="md-reader" style={{ fontSize: '16px' }}>
        <nav aria-label="语言 / Language" {...stylex.props(styles.languages)}>
          <a href="#zh" lang="zh-CN" {...stylex.props(styles.link)}>中文</a>
          <a href="#en" lang="en" {...stylex.props(styles.link)}>English</a>
        </nav>

        {soonerPrivacyContent.map((locale) => (
          <section
            key={locale.id}
            id={locale.id}
            lang={locale.lang}
            aria-labelledby={`${locale.id}-title`}
            {...stylex.props(styles.locale)}
          >
            <h2 id={`${locale.id}-title`}>{locale.title}</h2>
            <p>{locale.intro}</p>
            {locale.sections.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.map((segment, segmentIndex) => (
                      typeof segment === 'string' ? segment : (
                        <a key={segmentIndex} href={segment.href} {...stylex.props(styles.link)}>
                          {segment.text}
                        </a>
                      )
                    ))}
                  </p>
                ))}
              </section>
            ))}
          </section>
        ))}
      </article>
    </main>
  )
}
