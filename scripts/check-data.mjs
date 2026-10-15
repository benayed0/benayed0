// Data integrity check: node scripts/check-data.mjs
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { projects, experience } from '../src/data/portfolio.js'
import { translations } from '../src/i18n/translations.js'

const pub = (p) => new URL(`../public${p}`, import.meta.url)
const ids = new Set(projects.map(p => p.id))

assert.equal(ids.size, projects.length, 'duplicate project ids')
assert.equal(projects.filter(p => p.featured).length, 3, 'expected exactly 3 featured projects')

for (const [lang, tr] of Object.entries(translations)) {
  const items = tr.projects.items
  for (const p of projects) {
    for (const f of ['tagline', 'snippet', 'technical']) {
      assert.ok(items[p.id]?.[f], `${lang}: project ${p.id} (${p.title}) missing ${f}`)
    }
    if (p.status) assert.ok(tr.projects.status?.[p.status], `${lang}: missing status label ${p.status}`)
  }
  for (const id of Object.keys(items)) assert.ok(ids.has(Number(id)), `${lang}: orphan translation for project ${id}`)
  assert.equal(tr.experience.items.length, experience.length, `${lang}: experience item count mismatch`)
}

for (const p of projects) {
  for (const f of [p.favicon, ...(p.screenshots ?? [])].filter(Boolean)) {
    assert.ok(existsSync(pub(f)), `missing asset ${f}`)
  }
}

console.log(`ok — ${projects.length} projects, ${experience.length} roles, ${Object.keys(translations).length} languages`)
