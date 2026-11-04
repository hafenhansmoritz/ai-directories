// PromptGott: Autoblog (promptgott.mentat.codes) und Newsletter (Substack).
// Die Feeds werden nur beim statischen Build gelesen; im Browser lädt nichts nach.
// Fällt bei Netzfehlern still auf eine leere Liste zurück, damit der Build nie daran scheitert.
export const PROMPTGOTT_BLOG_URL = 'https://promptgott.mentat.codes'
export const PROMPTGOTT_SUBSTACK_URL = 'https://promptgott.substack.com'

const decode = (s) =>
    s
        .replace(/^<!\[CDATA\[|\]\]>$/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/<[^>]+>/g, '')
        .trim()

const tag = (block, name) => {
    const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
    return m ? decode(m[1]) : ''
}

const cache = new Map()

export async function getFeed(url, limit = 3) {
    if (!cache.has(url)) {
        cache.set(
            url,
            (async () => {
                try {
                    const res = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { 'user-agent': 'mentat.codes-build' } })
                    if (!res.ok) return []
                    const xml = await res.text()
                    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
                        .map(([, b]) => ({ title: tag(b, 'title'), url: tag(b, 'link'), datum: tag(b, 'pubDate') }))
                        .filter((i) => i.title && /^https:\/\//.test(i.url))
                } catch {
                    return []
                }
            })()
        )
    }
    return (await cache.get(url)).slice(0, limit)
}

export const getBlogBeitraege = (limit = 4) => getFeed(`${PROMPTGOTT_BLOG_URL}/rss.xml`, limit)
export const getNewsletterAusgaben = (limit = 3) => getFeed(`${PROMPTGOTT_SUBSTACK_URL}/feed`, limit)
