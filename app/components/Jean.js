// Jean als Comic-Figur mit Sprechblase. SVG als String, damit die Zeichnung ohne Bilddatei auskommt.
const JEAN_SVG =
    '<svg viewBox="0 0 120 150" aria-hidden="true" focusable="false"><path d="M8 150c2-30 18-44 52-48 34 4 50 18 52 48z" fill="#2b2f36"/><path d="M42 104l18 46 18-46-18-6z" fill="#8fb3d9"/><path d="M42 104l12 14 6-16zM78 104l-12 14-6-16z" fill="#a9c6e6" stroke="#6d93bd" stroke-width="1.5"/><circle cx="60" cy="124" r="2" fill="#1f2a3a"/><circle cx="60" cy="138" r="2" fill="#1f2a3a"/><path d="M42 104l-14 46h10l12-38zM78 104l14 46H82l-12-38z" fill="#1e2228"/><rect x="50" y="84" width="20" height="20" rx="6" fill="#efbb9c"/><ellipse cx="25" cy="58" rx="7" ry="10" fill="#efbb9c"/><ellipse cx="95" cy="58" rx="7" ry="10" fill="#efbb9c"/><ellipse cx="60" cy="52" rx="34" ry="40" fill="#f4c8ac"/><ellipse cx="48" cy="26" rx="12" ry="6" fill="#fff" opacity=".45"/><path d="M27 58c0 22 12 40 33 40s33-18 33-40c-4 10-8 14-12 14H39c-4 0-8-4-12-14z" fill="#c4581f"/><path d="M44 70c6-5 26-5 32 0-5 2-27 2-32 0z" fill="#b54d18"/><path d="M50 78c6 3 14 3 20-1" stroke="#7a2f0c" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M40 44c4-3 10-3 14-1M66 43c4-2 10-2 14 1" stroke="#c4581f" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="47" cy="52" rx="4" ry="3.2" fill="#fff"/><ellipse cx="73" cy="52" rx="4" ry="3.2" fill="#fff"/><circle cx="48" cy="52.5" r="2.2" fill="#6b6a3a"/><circle cx="74" cy="52.5" r="2.2" fill="#6b6a3a"/><path d="M58 56c-2 6-2 9 2 10 3 0 4-1 4-2" stroke="#d99a7a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'

export const HELLO = [
    'Moin! Ich bin Jean, Senior SEO/SGE Manager. Ich habe diese Liste durchgeklickt, damit du es nicht musst.',
    'Servus! Jean hier. Ich habe mehr Einreichungsformulare ausgefüllt als ein Bürgeramt an einem Montag.',
    'Hi, ich bin Jean. Kaffee steht, Domain Rating steigt. Willkommen!',
    'Jean hier. Kein Tool wurde beim Testen verletzt, nur mein Kaffeevorrat.',
]

export default function Jean({ children }) {
    return (
        <figure className="jean">
            <div className="jean-face" dangerouslySetInnerHTML={{ __html: JEAN_SVG }} />
            <figcaption className="bubble">
                <b>Jean sagt:</b> {children}
            </figcaption>
        </figure>
    )
}
