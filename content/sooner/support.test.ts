import assert from 'node:assert/strict'
import { test } from 'node:test'

import { readPage } from './page.ts'

// The file's path is the page's address: content/sooner/support.md is
// /sooner/support, and scripts/ssg.ts fails the build if it is gone.
const page = readPage('./support.md')
const zh = page.text('zh', true)
const en = page.text('en', true)

test('stable bilingual title', () => {
  assert.match(page.title, /趁鲜支持 \/ Sooner Support/)
})

test('both locales are on the page with matching question counts', () => {
  assert.deepEqual(page.locales.map(({ id, lang }) => ({ id, lang })), [
    { id: 'zh', lang: 'zh-CN' }, { id: 'en', lang: 'en' },
  ])
  assert.equal(page.headings('zh').length, 7)
  assert.equal(page.headings('en').length, 7)
  assert.equal((page.body.match(/^# /gm) ?? []).length, 1)
  assert.match(page.header, /<a href="#zh" lang="zh-CN">/)
  assert.match(page.header, /<a href="#en" lang="en">/)
  // Nothing on the page selects a language or hides one.
  assert.doesNotMatch(page.body, /<script|hidden|style=|onclick/i)
})

test('contact email and privacy link appear in both locales and the header', () => {
  assert.match(page.header, /\[i@xingbest\.fun\]\(mailto:i@xingbest\.fun\)/)
  for (const id of ['zh', 'en']) {
    const hrefs = new Set(page.links(id).map(({ href }) => href))
    assert.deepEqual([...hrefs].sort(), ['/sooner/privacy', 'mailto:i@xingbest.fun'])
  }
})

test('answers match the shipped app', () => {
  assert.match(zh, /分开计算[\s\S]*按北京时间/)
  assert.match(en, /counted separately[\s\S]*Beijing time/)
  assert.match(zh, /到期前一天 9:00、到期当天 18:00/)
  assert.match(en, /9:00 the day before and one at 18:00 on the day/)
  assert.match(zh, /记下 3 天后 9:00/)
  assert.match(en, /9:00, three days after you add it/)
  assert.match(zh, /没有账号，也不做云同步/)
  assert.match(en, /no account and no cloud sync/)
  assert.match(zh, /没有一键清空/)
  assert.match(en, /no clear-all control/)
  assert.match(zh, /AI 识别照片和「问趁鲜」/)
  assert.match(en, /AI photo reads and Ask Sooner/)
  assert.match(zh, /拍一张包装/)
  assert.match(en, /photo of the package/)
  assert.match(zh, /iOS 26 及以上/)
  assert.match(en, /iOS 26 or later/)
  // Exact limits can change server-side; the page does not promise numbers.
  for (const text of [zh, en]) assert.doesNotMatch(text, /\b10\b|\b100\b|\b200\b/)
})
