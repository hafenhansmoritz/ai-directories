import { getNews } from '../../lib/news'
import { ARTIKEL } from '../../lib/ratgeber'
import { SITE_NAME, absoluteUrl } from '../../lib/site'
import NEU from '../../db/neu-entdeckt.json'

// Gesamt-Feed: KI-News, Ratgeber und neu entdeckte Verzeichnisse in einem RSS-Feed, neueste zuerst.
// Nur Einträge mit eigenem Datum aus den Daten, nichts wird geschätzt. Der reine News-Feed bleibt unter /ki-news/feed.xml.
export const dynamic = 'force-static'

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const mitSchraegstrich = (p) => absoluteUrl(p.endsWith('/') ? p : `${p}/`)
const istDatum = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '')

export function GET() {
    const eintraege = [
        ...getNews()
            .filter((n) => istDatum(n.veroeffentlicht))
            .map((n) => ({
                titel: n.titel,
                url: mitSchraegstrich(`/ki-news/${n.slug}`),
                guid: mitSchraegstrich(`/ki-news/${n.slug}`),
                datum: n.veroeffentlicht,
                rubrik: 'KI-News',
                text: n.description,
            })),
        ...ARTIKEL.filter((a) => istDatum(a.geprueft)).map((a) => ({
            titel: a.title,
            url: mitSchraegstrich(`/ratgeber/${a.slug}`),
            guid: mitSchraegstrich(`/ratgeber/${a.slug}`),
            datum: a.geprueft,
            rubrik: 'Ratgeber',
            text: a.description,
        })),
        ...NEU.filter((v) => istDatum(v.verified_on)).map((v) => ({
            titel: `Neu entdeckt: ${v.name}`,
            url: mitSchraegstrich('/neu-entdeckt'),
            guid: `${mitSchraegstrich('/neu-entdeckt')}#${encodeURIComponent(v.name)}`,
            datum: v.verified_on,
            rubrik: 'Neue Verzeichnisse',
            text: v.hinweis || '',
        })),
    ].sort((a, b) => b.datum.localeCompare(a.datum) || a.titel.localeCompare(b.titel, 'de'))

    const items = eintraege
        .map(
            (e) => `    <item>
      <title>${esc(e.titel)}</title>
      <link>${e.url}</link>
      <guid isPermaLink="${e.guid === e.url}">${esc(e.guid)}</guid>
      <pubDate>${new Date(`${e.datum}T08:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(e.rubrik)}</category>
      <description>${esc(e.text)}</description>
    </item>`
        )
        .join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${SITE_NAME}: Neues auf einen Blick`)}</title>
    <link>${mitSchraegstrich('/')}</link>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>KI-News, Ratgeber und neu entdeckte KI-Verzeichnisse auf Deutsch.</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>
`
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
