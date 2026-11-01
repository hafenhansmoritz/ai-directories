import Link from 'next/link'
import '../styles/meme.css'

// Echter Chat, anonymisiert: ohne Namen, Foto und Uhrzeiten, ein Schimpfwort entschärft.
const NACHRICHTEN = [
    { von: 'links', text: 'I feel like these people who are so proud for not using AI will be obsolete first :)' },
    {
        von: 'links',
        text: 'It’s like saying hey look I still write my mails with pen and paper and don’t use the internet to send it ;) I’m so cool',
    },
    { von: 'rechts', text: '😂', nurEmoji: true },
]

export default function MemeChat() {
    return (
        <section className="meme" aria-labelledby="meme-titel">
            <h2 id="meme-titel">Die ganze KI-Debatte in zwei Nachrichten 📮</h2>
            <figure className="meme-figur">
                <ul className="meme-chat" aria-label="Chatverlauf">
                    {NACHRICHTEN.map((n, i) => (
                        <li key={i} className={`meme-blase meme-${n.von}${n.nurEmoji ? ' meme-emoji' : ''}`}>
                            {n.nurEmoji ? <span role="img" aria-label="Tränen gelacht">{n.text}</span> : n.text}
                        </li>
                    ))}
                </ul>
                <figcaption className="widget-note">Echter Chat, anonymisiert. Ein Wort entschärft, weil wir hier alle lieb haben, auch die Stift-und-Papier-Fraktion.</figcaption>
            </figure>
            <details className="meme-uebersetzung">
                <summary>Auf Deutsch, für alle, die noch Faxe schicken</summary>
                <p>„Ich hab das Gefühl, die Leute, die so stolz darauf sind, keine KI zu nutzen, werden als Erste überflüssig :)“</p>
                <p>„Das ist, als würdest du sagen: Schau mal, ich schreibe meine Mails noch mit Stift und Papier und schicke sie nicht übers Internet ;) Ich bin so cool“</p>
            </details>
            <p className="meme-weiter">
                Lieber nicht als Erste überflüssig werden? <Link href="/ki-tools">Hier sind über 700 KI-Tools zum Ausprobieren →</Link>
            </p>
        </section>
    )
}
