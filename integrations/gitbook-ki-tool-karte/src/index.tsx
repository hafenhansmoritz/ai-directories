import { ContentKitIcon } from '@gitbook/api';
import { createComponent, createIntegration, RuntimeContext } from '@gitbook/runtime';

// Standardquelle: Tool-Steckbriefe von mentat.codes. href ist der Anbieter-Link (Partnerlink, falls hinterlegt).
const STANDARD_API = 'https://mentat.codes/api/tools.json';
const STECKBRIEF = 'https://mentat.codes/tools/';

type Tool = {
    slug: string;
    name: string;
    kategorie: string;
    kurz: string;
    fuer?: string;
    preis_ab?: string;
    gratis: boolean;
    deutsch: boolean;
    href: string;
    partner: boolean;
    steckbrief: string;
};

type Props = { slug?: string };
type State = { auswahl?: string };
type Action = { action: 'uebernehmen' } | { action: 'aendern' } | { action: '@link.unfurl'; url: string };

async function ladeTools(context: RuntimeContext): Promise<Tool[]> {
    const config = (context.environment.installation?.configuration ?? {}) as { api_url?: string };
    const res = await fetch(config.api_url || STANDARD_API);
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: Tool[] };
    return json.data ?? [];
}

// Slug aus einem eingefügten Steckbrief-Link wie .../ai-directories/tools/chatgpt/
const slugAusUrl = (url: string) => url.slice(STECKBRIEF.length).split(/[/?#]/)[0] || undefined;

const kiToolKarte = createComponent<Props, State, Action>({
    componentId: 'ki-tool-karte',
    initialState: (props) => ({ auswahl: props.slug }),
    action: async (element, action) => {
        switch (action.action) {
            case '@link.unfurl':
                return { props: { slug: slugAusUrl(action.url) } };
            case 'uebernehmen':
                return { props: { slug: element.state.auswahl } };
            case 'aendern':
                return { props: { slug: undefined } };
            default:
                return {};
        }
    },
    render: async (element, context) => {
        const tools = await ladeTools(context);
        const tool = tools.find((t) => t.slug === element.props.slug);

        // Noch kein Tool gewählt (oder unbekannter Slug): Auswahl anzeigen, nur im Editor sichtbar.
        if (!tool) {
            return (
                <block>
                    <vstack>
                        <text style="bold">KI-Tool auswählen</text>
                        <select
                            state="auswahl"
                            placeholder="Tool suchen …"
                            options={tools.map((t) => ({ id: t.slug, label: `${t.name} (${t.kategorie})` }))}
                        />
                        <button label="Übernehmen" style="primary" onPress={{ action: 'uebernehmen' }} />
                    </vstack>
                </block>
            );
        }

        const fakten = [
            tool.preis_ab ? `**Preis ab:** ${tool.preis_ab}` : null,
            `**Gratis-Tarif:** ${tool.gratis ? 'ja' : 'nein'}`,
            `**Deutsche Oberfläche:** ${tool.deutsch ? 'ja' : 'nein'}`,
            tool.fuer ? `**Passt für:** ${tool.fuer}` : null,
        ].filter(Boolean);

        return (
            <block
                controls={[{ icon: ContentKitIcon.Edit, label: 'Anderes Tool wählen', onPress: { action: 'aendern' } }]}
            >
                <card
                    title={tool.name}
                    hint={tool.kategorie}
                    buttons={[
                        <button
                            label={tool.partner ? `Zu ${tool.name} *` : `Zu ${tool.name}`}
                            style="primary"
                            onPress={{ action: '@ui.url.open', url: tool.href }}
                        />,
                        <button
                            label="Steckbrief"
                            style="secondary"
                            onPress={{ action: '@ui.url.open', url: tool.steckbrief }}
                        />,
                    ]}
                >
                    <markdown
                        content={[
                            tool.kurz,
                            '',
                            ...fakten.map((f) => `- ${f}`),
                            ...(tool.partner ? ['', '\\* Partnerlink: Bei einem Kauf erhalten wir eine Provision, für dich ändert sich der Preis nicht.'] : []),
                        ].join('\n')}
                    />
                </card>
            </block>
        );
    },
});

export default createIntegration({
    components: [kiToolKarte],
});
