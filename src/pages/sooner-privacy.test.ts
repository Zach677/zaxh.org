import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { soonerPrivacyContent, soonerPrivacyMetadata } from './sooner-privacy-content.ts'

const page = readFileSync(new URL('./sooner-privacy.tsx', import.meta.url), 'utf8')
const routes = readFileSync(new URL('../routes.tsx', import.meta.url), 'utf8')
const textOf = (locale: typeof soonerPrivacyContent[number]) => [
  locale.intro,
  ...locale.sections.flatMap((section) => section.paragraphs.map((paragraph) => (
    paragraph.map((segment) => typeof segment === 'string' ? segment : segment.text).join('')
  ))),
].join('\n')

const zh = textOf(soonerPrivacyContent[0])
const en = textOf(soonerPrivacyContent[1])

test('one static route uses RootLayout and stable bilingual metadata', () => {
  assert.equal(soonerPrivacyMetadata.url, 'https://zaxh.org/sooner/privacy')
  assert.match(soonerPrivacyMetadata.title, /趁鲜.*Sooner Privacy Policy/)
  assert.match(soonerPrivacyMetadata.description, /趁鲜隐私政策：.*Sooner privacy policy:/)
  assert.equal((routes.match(/path: 'sooner\/privacy'/g) ?? []).length, 1)
  assert.match(routes, /Component: RootLayout,[\s\S]*path: 'sooner\/privacy',\s*Component: SoonerPrivacyPage,\s*metadata: soonerPrivacyMetadata/)
  assert.doesNotMatch(routes, /path: ['"]sooner\/privacy\//)
})

test('both complete locales are rendered unconditionally with a consistent heading hierarchy', () => {
  assert.deepEqual(soonerPrivacyContent.map(({ id, lang }) => ({ id, lang })), [
    { id: 'zh', lang: 'zh-CN' }, { id: 'en', lang: 'en' },
  ])
  assert.deepEqual(soonerPrivacyContent.map(({ title }) => title), [
    '趁鲜隐私政策', 'Sooner Privacy Policy',
  ])
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1)
  assert.match(page, /soonerPrivacyContent\.map/)
  assert.match(page, /id=\{locale.id\}[\s\S]*lang=\{locale.lang\}[\s\S]*aria-labelledby=/)
  assert.match(page, /<h2[^>]*>\{locale.title\}<\/h2>/)
  assert.match(page, /<h3>\{section.heading\}<\/h3>/)
  assert.match(page, /section\.paragraphs\.map/)
  assert.doesNotMatch(page, /useState|useEffect|hidden=|display: 'none'|dangerouslySetInnerHTML/)
  for (const locale of soonerPrivacyContent) {
    assert.equal(locale.sections.length, 11)
    assert.equal(new Set(locale.sections.map(({ heading }) => heading)).size, 11)
    assert.ok(locale.intro.length > 100)
    assert.ok(locale.sections.every(({ paragraphs }) => paragraphs.length > 0))
    assert.ok(textOf(locale).length > 2500)
  }
})

test('native locale links, scroll offsets, and visible keyboard focus remain available', () => {
  assert.match(page, /<nav aria-label=/)
  assert.match(page, /<a href="#zh" lang="zh-CN"/)
  assert.match(page, /<a href="#en" lang="en"/)
  assert.match(page, /scrollMarginTop: '2rem'/)
  assert.match(page, /':focus-visible': `2px solid \$\{colors.accent\}`/)
  assert.match(page, /outlineOffset: '4px'/)
  assert.doesNotMatch(page, /onClick|preventDefault/)
})

test('both locales show the same publish-day effective date, outside the body copy', () => {
  assert.equal(soonerPrivacyContent.map(({ effective }) => effective).join(' / '),
    '更新与生效日期：2026年11月11日 / Updated and effective: November 11, 2026')
  assert.match(page, /soonerPrivacyContent\[0\]\.effective/)
  assert.match(page, /soonerPrivacyContent\[1\]\.effective/)
  assert.doesNotMatch(zh + en + soonerPrivacyMetadata.description, /预览|尚未生效|[Pp]review|[Nn]ot yet effective/)
  assert.doesNotMatch(zh + en, /\b20\d{2}[-年/]\d|Effective date:|生效日期：/)
  assert.doesNotMatch(zh + en, /内部发布前核对|五行设计计划|Pluso2807|Camo2810/)
})

test('each locale includes the actual provider, website, and contact links', () => {
  const expected = [
    'https://world.openfoodfacts.org/privacy',
    'https://air.build/privacy/',
    'https://openrouter.ai/privacy',
    'https://openrouter.ai/docs/guides/privacy/data-collection',
    'https://openrouter.ai/docs/guides/privacy/provider-logging',
    'https://openrouter.ai/docs/guides/features/zdr',
    'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/data-governance',
    'https://www.apple.com/legal/privacy/',
    'https://www.apple.com/legal/privacy/data/en/test-flight/',
    'https://www.cloudflare.com/web-analytics/',
    'https://developers.google.com/fonts/faq/privacy',
    'mailto:i@xingbest.fun',
  ].sort()
  for (const locale of soonerPrivacyContent) {
    const links = locale.sections.flatMap(({ paragraphs }) => paragraphs.flat())
      .filter((segment) => typeof segment !== 'string')
    assert.deepEqual([...new Set(links.map(({ href }) => href))].sort(), expected)
    assert.ok(links.every(({ text }) => text.trim().length > 0))
  }
  assert.match(page, /href=\{segment.href\}/)
})

test('retention states 90-day device cleanup and provider-specific limits', () => {
  assert.match(zh, /连续 90 天没有使用的设备密钥及相关记录会被自动删除/)
  assert.match(zh, /每天检查一次/)
  assert.match(en, /unused for 90 days are deleted automatically/)
  assert.match(en, /checks once a day/)
  assert.doesNotMatch(zh, /验证记录；目前尚未设自动删除期限/)
  assert.doesNotMatch(en, /These records currently have no automatic deletion period/)
  assert.match(zh, /两天前及更早/)
  assert.match(en, /two days ago and earlier/)
  for (const text of [zh, en]) {
    assert.doesNotMatch(text, /AI Studio/)
    assert.match(text, /Google Vertex AI/)
    assert.match(text, /90/)
    assert.match(text, /24/)
  }
  assert.match(zh, /不主动记录内容日志/)
  assert.match(en, /Our server does not save[\s\S]*server-side database or actively record content logs/)
  assert.match(en, /hosting infrastructure may process request and error logs/)
  assert.match(en, /AirBuild records usage and cost for each AI call/)
  assert.match(en, /optional logging settings and safety processing affect retention/)
  assert.match(en, /Google may keep some data for a limited time/)
  assert.doesNotMatch(zh, /设备.{0,20}90\s*天.{0,10}(自动|删除|清理)/)
  assert.doesNotMatch(en, /(?:device|verification) records[^.]*delet(?:ed|ion)[^.]*90 days/i)
  assert.doesNotMatch(en, /all (?:AI )?providers (?:never|do not) (?:store|retain)/i)
})

test('copy preserves opt-in, local data, actual AI chain, and deletion limitations', () => {
  assert.match(zh, /「用 AI」默认关闭/)
  assert.match(en, /Use AI is off by default/)
  assert.match(zh, /第一次使用「问趁鲜」时会再征求一次同意/)
  assert.match(en, /asks again before you first use Ask Sooner/)
  assert.match(en, /AI services only when you consent to using AI/)
  assert.match(zh, /本机数据库/)
  assert.match(en, /local database/)
  assert.match(en, /AirBuild-hosted server, AirBuild's AirRouter AI relay, and OpenRouter/)
  assert.match(zh, /目前没有设定反馈的自动删除期限/)
  assert.match(en, /Feedback currently has no automatic deletion period/)
  assert.match(en, /cannot guarantee that the platform can delete it/)
  assert.match(en, /no clear-all-data control/)
  assert.match(en, /Cloudflare Web Analytics/)
  assert.match(en, /Google Fonts/)
  assert.match(zh, /自己选择的图片（最多 4 张）/)
  assert.match(en, /images you select \(up to four\)/)
  assert.match(zh, /支持的手机还会向 AirFeedback 发一份设备验证，用来确认反馈来自真的趁鲜 App。它带一个这次安装用的编号，不是手机序列号，也和 AI、查条码用的那个不同；重装后会换，失效时也可能换新的。拿不到验证时，反馈照样能发出/)
  assert.match(en, /supported phones also send AirFeedback a device check that confirms it came from the real Sooner app\. It carries an ID for this install\. It isn't your phone's serial number, and it's separate from the one used for AI and barcode lookups\. It changes if you reinstall, and may be replaced if it stops working\. If the check isn't available, your feedback still sends/)
  assert.match(zh, /App 不自动附上食物清单或联系方式/)
  assert.doesNotMatch(zh + en, /固定不变|stays the same for this install/)
  assert.doesNotMatch(zh + en, /食物清单、设备标识或联系方式|food list, device ID, or contact details/)
  assert.match(zh, /设备标识/)
  assert.match(en, /device ID/)
  assert.match(en, /eaten or thrown away/)
  assert.doesNotMatch(zh + en, /安装标识|installation ID|订单截图|order-screenshot|server code we wrote|我们没有核实/)
})

test('discloses full food list for Ask Sooner and barcode hints with remembered names', () => {
  assert.match(zh, /当前的食物清单（最多 200 项）/)
  assert.match(zh, /而不只是问题提到的食物/)
  assert.match(en, /current food list \(up to 200 items\), not only foods mentioned/)
  assert.match(zh, /条码数字和对应名称[\s\S]*手机上记住的名称[\s\S]*不一定出现在照片里/)
  assert.match(en, /Barcode numbers scanned[\s\S]*remembered on your phone[\s\S]*may not appear in the photo/)
  for (const text of [zh, en]) assert.doesNotMatch(text, /相关食物|相关清单|relevant food|related food list/)
})

test('barcode cache periods are reuse limits, not deletion promises', () => {
  assert.match(zh, /缓存有效期为 180 天，查不到的为 14 天/)
  assert.match(zh, /过期不代表记录已经删除，目前没有为这类缓存设置自动删除期限/)
  assert.doesNotMatch(zh, /保存 180 天|保存 14 天/)
  assert.match(en, /reused for up to 180 days, and unsuccessful results for 14 days/)
  assert.match(en, /Expiry does not delete the stored entry; these cache records currently have no automatic deletion period/)
  assert.doesNotMatch(en, /results for 180 days, or an unsuccessful lookup for 14 days/)
})

test('daily limits: separate, Beijing time, used-up request reached the server, last 3 rounds', () => {
  assert.match(zh, /分开计算，一样用完不影响另一样；「每天」按北京时间算/)
  assert.match(zh, /这一次的照片或问题已经到了我们的服务器，但不会再转给 AI/)
  assert.match(zh, /包括用掉最后一次时），到北京时间当天 24 点前不再发出这一类内容/)
  assert.equal((zh.match(/最近 3 轮对话/g) ?? []).length, 2)
  assert.doesNotMatch(zh, /最近几轮对话|当天次数用完时，我们的服务器不会再把照片转给 AI/)
  assert.match(en, /counted separately, so running out of one doesn't affect the other\. Days are counted in Beijing time\./)
  assert.match(en, /that photo or question has already reached our server, but it isn't passed on to AI/)
  assert.match(en, /including when the last use is spent\), it stops sending that kind of content until midnight Beijing time/)
  assert.equal((en.match(/the last 3 rounds of conversation/g) ?? []).length, 2)
  assert.doesNotMatch(en, /recent conversation turns|our server no longer passes photos to AI/)
})

test('TF13: barcode device verification, hedged AI request, no device-ID-free barcode claim', () => {
  assert.doesNotMatch(zh, /不附上食物清单或设备标识/)
  assert.doesNotMatch(en, /without your food list or device ID/)
  assert.match(zh, /查询手机上没有记住的条码时，还会附上[\s\S]*设备验证[\s\S]*但不记录是哪些条码/)
  assert.match(en, /barcode not remembered on your phone, the request also carries the device verification[\s\S]*does not record which barcodes/)
  assert.match(zh, /AI 和条码查询共用设备验证密钥，首次使用其中一项时生成；密钥失效时可能重新生成/)
  assert.match(en, /share a device verification key, created when you first use either feature\. It may be regenerated if it becomes invalid/)
  assert.match(zh, /再发一次给同一家 AI 服务，最多一次/)
  assert.match(en, /once more to the same AI service, at most once/)
  assert.match(zh, /识别或回答太慢时/)
  assert.doesNotMatch(zh + en, /只生成一把|creates one verification key/)
  assert.doesNotMatch(zh, /App 也会改在手机上识别/)
})
