import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { SOONER_SUPPORT_EMAIL, soonerSupportContent, soonerSupportMetadata } from './sooner-support-content.ts'

const page = readFileSync(new URL('./sooner-support.tsx', import.meta.url), 'utf8')
const routes = readFileSync(new URL('../routes.tsx', import.meta.url), 'utf8')
type Locale = typeof soonerSupportContent[number]
const join = (segments: Locale['intro']) => segments.map((s) => typeof s === 'string' ? s : s.text).join('')
const textOf = (locale: Locale) => [
  join(locale.intro),
  ...locale.questions.flatMap((q) => [q.heading, ...q.paragraphs.map(join)]),
].join('\n')
const linksOf = (locale: Locale) => [locale.intro, ...locale.questions.flatMap((q) => q.paragraphs)]
  .flat().filter((s) => typeof s !== 'string')

const zh = textOf(soonerSupportContent[0])
const en = textOf(soonerSupportContent[1])

test('one static support route under RootLayout with bilingual metadata', () => {
  assert.equal(soonerSupportMetadata.url, 'https://zaxh.org/sooner/support')
  assert.match(soonerSupportMetadata.title, /趁鲜支持 \/ Sooner Support/)
  assert.equal((routes.match(/path: 'sooner\/support'/g) ?? []).length, 1)
  assert.match(routes, /Component: RootLayout,[\s\S]*path: 'sooner\/support',\s*Component: SoonerSupportPage,\s*metadata: soonerSupportMetadata/)
})

test('both locales render unconditionally with matching question counts', () => {
  assert.deepEqual(soonerSupportContent.map(({ id, lang }) => ({ id, lang })), [
    { id: 'zh', lang: 'zh-CN' }, { id: 'en', lang: 'en' },
  ])
  assert.equal(soonerSupportContent[0].questions.length, soonerSupportContent[1].questions.length)
  assert.equal(soonerSupportContent[0].questions.length, 7)
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1)
  assert.match(page, /<a href="#zh" lang="zh-CN"/)
  assert.match(page, /<a href="#en" lang="en"/)
  assert.doesNotMatch(page, /useState|useEffect|hidden=|display: 'none'|dangerouslySetInnerHTML|onClick/)
})

test('contact email and privacy link appear in both locales and the header', () => {
  assert.equal(SOONER_SUPPORT_EMAIL, 'i@xingbest.fun')
  assert.match(page, /href=\{`mailto:\$\{SOONER_SUPPORT_EMAIL\}`\}/)
  for (const locale of soonerSupportContent) {
    const hrefs = new Set(linksOf(locale).map(({ href }) => href))
    assert.deepEqual([...hrefs].sort(), ['/sooner/privacy', 'mailto:i@xingbest.fun'])
  }
})

test('answers match the shipped app', () => {
  assert.match(zh, /分开计算[\s\S]*按北京时间/)
  assert.match(en, /counted separately[\s\S]*Beijing time/)
  assert.match(zh, /到期前一天早上 9 点、到期当天下午 6 点/)
  assert.match(en, /9 AM the day before and one at 6 PM on the day/)
  assert.match(zh, /加入 3 天后早上 9 点/)
  assert.match(en, /9 AM, three days after you add it/)
  assert.match(zh, /没有账号，也不做云同步/)
  assert.match(en, /no account and no cloud sync/)
  assert.match(zh, /没有一键清空/)
  assert.match(en, /no clear-all control/)
  assert.match(zh, /iOS 26 及以上/)
  assert.match(en, /iOS 26 or later/)
  // Exact limits can change server-side; the page does not promise numbers.
  for (const text of [zh, en]) assert.doesNotMatch(text, /\b10\b|\b100\b|\b200\b/)
})
