// Writes every page into dist/: the book (prerendered, then hydrated), the
// app pages from content/ (plain HTML, no script), and the 404 page.
import assert from 'node:assert/strict'
import { globSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { marked } from 'marked'

import type * as book from '../src/main.ssg'

const root = path.resolve(import.meta.dirname, '..')
const SITE = 'https://zaxh.org'
// The App Store and the apps link to these pages. The build fails without them.
const STABLE = ['/mitori/privacy', '/sooner/privacy', '/sooner/support', '/xiaorichang/privacy']

const template = readFileSync(path.join(root, 'dist/index.html'), 'utf8')
// Only the book runs script.
const plain = template
  .replace(/\s*<script type="module"[^>]*><\/script>/, '')
  .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')

type Page = { title: string; description: string; lang?: string; body: string }

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const written: string[] = []

// A route without `canonical` (404) has no address of its own.
function write(route: string, shell: string, page: Page, canonical = true) {
  const title = escape(page.title)
  const description = escape(page.description)
  const url = SITE + (route === '/' ? '' : route)
  const head =
    `<title>${title}</title>` +
    `<meta name="description" content="${description}">` +
    `<meta property="og:title" content="${title}">` +
    `<meta property="og:description" content="${description}">` +
    (canonical ? `<meta property="og:url" content="${url}"><link rel="canonical" href="${url}">` : '')
  // Function replacers: a `$` in the copy is not a replacement pattern.
  const html = shell
    .replace('<html lang="en">', () => `<html lang="${page.lang ?? 'en'}">`)
    .replace('<!--META-SLOT-->', () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${page.body}</div>`)
  assert.ok(html.includes(head) && html.includes(page.body), `${route}: the template lost a slot`)
  assert.equal(html.match(/<h1[ >]/g)?.length, 1, `${route}: needs exactly one h1`)
  assert.equal(html.includes('type="module"'), shell === template, `${route}: wrong shell`)

  const file = path.join(root, 'dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`)
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, html)
  written.push(route)
}

// A Markdown file with `key: value` front matter (title, description, lang).
function reader(file: string): Page {
  const match = /^---\n(.*?)\n---\n(.*)$/s.exec(readFileSync(file, 'utf8'))
  assert.ok(match, `${file}: no front matter`)
  const front: Record<string, string | undefined> = Object.fromEntries(
    match[1].split('\n').map((line) => {
      const at = line.indexOf(': ')
      return [line.slice(0, at), line.slice(at + 2)]
    }),
  )
  assert.ok(front.title && front.description, `${file}: needs a title and a description`)
  return {
    title: `${front.title} | zaxh`,
    description: front.description,
    lang: front.lang,
    body:
      '<div class="reader"><header><a href="/">zaxh</a></header>' +
      `<main>${marked.parse(match[2], { async: false })}</main>` +
      `<footer>© ${new Date().getFullYear()} Zach</footer></div>`,
  }
}

// A ragged top edge from a fixed sequence, so every build tears the same.
const tear = Array.from({ length: 41 }, (_, i) => {
  const noise = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1
  return `${i * 2.5}% ${(noise * 2.4).toFixed(2)}%`
}).join(', ')

const missing: Page = {
  title: 'Page not found | zaxh',
  description: 'This page was torn out of the book, or it was never printed.',
  body:
    `<main class="torn"><div><article style="clip-path: polygon(${tear}, 100% 100%, 0 100%)">` +
    '<header><span>zaxh.org</span><span>Missing</span></header>' +
    '<div><h1>404<span class="sr-only"> page not found</span></h1><hr>' +
    '<p>This page was torn out of the book, or it was never printed.</p></div>' +
    '<a href="/">← Back to the book</a></article></div></main>',
}

const server = path.join(root, 'dist/server')
const { render }: typeof book = await import(path.join(server, 'main.ssg.js'))

write('/', template, {
  title: 'zaxh',
  description:
    'Zach builds small tools for iOS and macOS. A small book of projects, notes, and devices.',
  body: await render(),
})
const content = path.join(root, 'content')
for (const file of globSync('**/*.md', { cwd: content }).sort()) {
  write(`/${file.slice(0, -'.md'.length)}`, plain, reader(path.join(content, file)))
}
write('/404', plain, missing, false)

for (const route of STABLE) assert.ok(written.includes(route), `${route} is gone: apps link to it`)
// The server bundle is a build step, not a page.
rmSync(server, { recursive: true })
console.log(`Wrote ${written.length} pages: ${written.join(' ')}`)
