import { ImageResponse } from 'next/og'

// Gemeinsames Layout für Vorschaubilder. Ohne Emojis, weil die zur Laufzeit nachgeladen würden.
export const ogSize = { width: 1200, height: 630 }

export function ogImage({ eyebrow, title, score, footer, bg = '#f4f7fb' }) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: bg,
                    padding: 60,
                    fontFamily: 'sans-serif',
                    border: '16px solid #0f172a',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                        style={{
                            display: 'flex',
                            background: '#0369a1',
                            color: '#fff',
                            fontSize: 34,
                            fontWeight: 800,
                            padding: '10px 22px',
                            border: '4px solid #0f172a',
                        }}
                    >
                        {'MENTAT.CODES >'}
                    </div>
                    {score != null && (
                        <div
                            style={{
                                display: 'flex',
                                background: '#6ee7b7',
                                color: '#0f172a',
                                fontSize: 40,
                                fontWeight: 800,
                                padding: '8px 24px',
                                border: '4px solid #0f172a',
                                borderRadius: 12,
                            }}
                        >
                            {`Jean-Score ${score}`}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: 34, color: '#475569', marginBottom: 12 }}>{eyebrow}</div>
                    <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{title}</div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        background: '#67e8f9',
                        color: '#0f172a',
                        fontSize: 30,
                        fontWeight: 700,
                        padding: '12px 20px',
                        border: '4px solid #0f172a',
                        alignSelf: 'flex-start',
                    }}
                >
                    {footer}
                </div>
            </div>
        ),
        ogSize
    )
}
