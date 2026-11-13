// Reads a Sooner page for its tests: the front matter, and each locale's copy
// as a reader sees it.
import { readFileSync } from 'node:fs'

export function readPage(name: string) {
  const source = readFileSync(new URL(name, import.meta.url), 'utf8')
  const [, front, body] = /^---\n(.*?)\n---\n(.*)$/s.exec(source)!
  const field = (key: string) => new RegExp(`^${key}: (.*)$`, 'm').exec(front)?.[1] ?? ''

  // What is between a locale's title and the end of its section.
  function markdown(id: string) {
    return new RegExp(`<section id="${id}"[^>]*>\n<h2[^>]*>.*?</h2>\n(.*?)\n</section>`, 's').exec(body)![1]
  }

  return {
    title: field('title'),
    description: field('description'),
    body,
    // Everything before the first locale: the title and the line under it.
    header: body.slice(0, body.indexOf('<section')),
    locales: [...body.matchAll(/<section id="(\w+)" lang="([\w-]+)" aria-labelledby="\1-title">\n<h2 id="\1-title">(.*?)<\/h2>/g)]
      .map(([, id, lang, title]) => ({ id, lang, title })),
    headings: (id: string) => [...markdown(id).matchAll(/^### (.*)$/gm)].map(([, heading]) => heading),
    links: (id: string) => [...markdown(id).matchAll(/\[([^\]]*)\]\(([^)]*)\)/g)].map(([, text, href]) => ({ text, href })),
    // One line per paragraph, links as their text. Headings are optional.
    text: (id: string, headings = false) =>
      markdown(id)
        .split('\n')
        .filter((line) => line && (headings || !line.startsWith('#')))
        .map((line) => line.replace(/^#+ /, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'))
        .join('\n'),
  }
}
