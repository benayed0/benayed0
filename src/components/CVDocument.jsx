import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer'
import { personal, experience, skills, projects } from '../data/portfolio'

const LABELS = {
  en: { summary: 'Summary', experience: 'Experience', skills: 'Skills', projects: 'Projects', shipped: 'shipped', remote: 'Remote' },
  fr: { summary: 'Résumé', experience: 'Expérience', skills: 'Compétences', projects: 'Projets', shipped: 'livrés', remote: 'Remote' },
}

const palette = {
  bg:     '#0f0f13',
  accent: '#7c3aed',
  text:   '#e4e4e7',
  muted:  '#a1a1aa',
  dim:    '#6b7280',
  border: '#27272a',
  chip:   '#3b1f6e',
}

const s = StyleSheet.create({
  page: { backgroundColor: palette.bg, padding: '26pt 26pt 22pt', fontFamily: 'Helvetica' },

  // ── Header ──────────────────────────────────────────────────────────────────
  headerRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  headerLeft:  { flex: 1 },
  headerRight: { alignItems: 'flex-end', gap: 3 },
  name:        { fontSize: 22, color: palette.text, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  title:       { fontSize: 10, color: palette.accent, letterSpacing: 1 },
  metaItem:    { fontSize: 8, color: palette.muted },
  metaLink:    { fontSize: 8, color: palette.muted, textDecoration: 'none' },
  divider:     { borderBottomWidth: 1, borderBottomColor: palette.border, marginTop: 10, marginBottom: 0 },

  // ── Section ──────────────────────────────────────────────────────────────────
  section:     { marginTop: 13 },
  sectionHead: {
    fontSize: 7,
    color: palette.accent,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingBottom: 3,
    marginBottom: 8,
  },

  // ── Summary ───────────────────────────────────────────────────────────────────
  summaryText: { fontSize: 8.5, color: palette.muted, lineHeight: 1.6 },

  // ── Experience ───────────────────────────────────────────────────────────────
  expEntry:   { marginBottom: 11 },
  expHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole:    { fontSize: 10, color: palette.text, fontFamily: 'Helvetica-Bold' },
  expPeriod:  { fontSize: 7.5, color: palette.muted },
  expCompany: { fontSize: 8.5, color: palette.accent, marginBottom: 4 },
  expDesc:    { fontSize: 8, color: palette.muted, lineHeight: 1.6 },
  chipsRow:   { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 },
  chip:       {
    fontSize: 7,
    color: palette.accent,
    backgroundColor: palette.chip,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 2,
  },

  // ── Skills (inline rows) ─────────────────────────────────────────────────────
  skillRow:   { flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' },
  skillCat:   { fontSize: 8, color: palette.text, fontFamily: 'Helvetica-Bold', width: 72, flexShrink: 0 },
  skillItems: { fontSize: 8, color: palette.muted, flex: 1, lineHeight: 1.5 },

  // ── Projects (3-column grid) ─────────────────────────────────────────────────
  projGrid:   { flexDirection: 'row', flexWrap: 'wrap' },
  projCard:   { width: '33.33%', paddingRight: 10, marginBottom: 8 },
  projTitle:  { fontSize: 8.5, color: palette.text, fontFamily: 'Helvetica-Bold', marginBottom: 1.5, textDecoration: 'none' },
  projTitleLink: { fontSize: 8.5, color: palette.accent, fontFamily: 'Helvetica-Bold', marginBottom: 1.5, textDecoration: 'underline' },
  projTagline:{ fontSize: 7.5, color: palette.muted, lineHeight: 1.45 },
})

export default function CVDocument({ lang = 'en', tr }) {
  const L = LABELS[lang] || LABELS.en
  const expItems = tr?.experience?.items || []
  const skillCategories = tr?.skills?.categories || {}

  return (
    <Document title={`${personal.name} — CV`} author={personal.name}>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.headerRow}>
          <View style={s.headerLeft}>
            <Text style={s.name}>{personal.name}</Text>
            <Text style={s.title}>{personal.title.toUpperCase()}</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.metaItem}>{personal.email}</Text>
            <Link src={personal.linkedin} style={s.metaLink}>linkedin.com/in/mohamed-aziz-ben-ayed</Link>
            <Text style={s.metaItem}>{personal.locations.map(l => l.name).join(' · ')}  ·  {L.remote}</Text>
          </View>
        </View>
        <View style={s.divider} />

        {/* ── Summary ── */}
        <View style={s.section}>
          <Text style={s.sectionHead}>{L.summary}</Text>
          <Text style={s.summaryText}>{tr?.hero?.bio || personal.bio}</Text>
        </View>

        {/* ── Experience ── */}
        <View style={s.section}>
          <Text style={s.sectionHead}>{L.experience}</Text>
          {experience.map((exp, i) => {
            const trExp = expItems[i] || {}
            return (
              <View key={i} style={s.expEntry}>
                <View style={s.expHeader}>
                  <Text style={s.expRole}>{trExp.role || exp.role}</Text>
                  <Text style={s.expPeriod}>{exp.period}</Text>
                </View>
                <Text style={s.expCompany}>{exp.company}</Text>
                <Text style={s.expDesc}>{trExp.description || exp.description}</Text>
                <View style={s.chipsRow}>
                  {(trExp.highlights || exp.highlights).map((h, j) => <Text key={j} style={s.chip}>{h}</Text>)}
                </View>
              </View>
            )
          })}
        </View>

        {/* ── Skills (one row per category) ── */}
        <View style={s.section}>
          <Text style={s.sectionHead}>{L.skills}</Text>
          {skills.map((cat, i) => (
            <View key={i} style={s.skillRow}>
              <Text style={s.skillCat}>{skillCategories[cat.category] || cat.category}</Text>
              <Text style={s.skillItems}>{cat.items.join('  ·  ')}</Text>
            </View>
          ))}
        </View>

        {/* ── Projects ── */}
        <View style={s.section}>
          <Text style={s.sectionHead}>{L.projects}  ·  {projects.length} {L.shipped}</Text>
          <View style={s.projGrid}>
            {projects.map((proj, i) => {
              const trProj = tr?.projects?.items?.[proj.id] || {}
              return (
                <View key={i} style={s.projCard}>
                  {proj.live
                    ? <Link src={proj.live} style={s.projTitleLink}>{proj.title}</Link>
                    : <Text style={s.projTitle}>{proj.title}</Text>
                  }
                  <Text style={s.projTagline}>{trProj.tagline || proj.tagline}</Text>
                </View>
              )
            })}
          </View>
        </View>

      </Page>
    </Document>
  )
}
