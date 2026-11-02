# GitBook-Integration: KI-Tool-Karte (AIGeddon)

Eigener Block für den GitBook-Editor. Tool auswählen (oder einen AIGeddon-Steckbrief-Link wie
`https://jmp-collab.github.io/ai-directories/tools/chatgpt/` einfügen), und der Block zeigt:

- Kurzbeschreibung, Kategorie, Preis ab, Gratis-Tarif, deutsche Oberfläche, Zielgruppe
- Button zum Anbieter: der Partnerlink aus `db/affiliate-links.json`, sonst die Website. Partnerlinks tragen ein `*` und einen Hinweistext.
- Button zum AIGeddon-Steckbrief

Die Daten kommen live aus `https://jmp-collab.github.io/ai-directories/api/tools.json` (Route `app/api/tools.json/route.js`).
Ein neuer Partnerlink in `db/affiliate-links.json` erscheint nach dem nächsten Deploy automatisch in allen Karten.

## Einrichten (einmalig, mit Jeans GitBook-Konto)

1. Node 18+, dann `npm install -g @gitbook/cli` und `gitbook auth` (persönliches Token von https://app.gitbook.com/account/developer, nicht ins Repo).
2. In `gitbook-manifest.yaml` bei `organization` die eigene GitBook-Organisation eintragen (ID oder Subdomain).
3. Im Ordner `integrations/gitbook-ki-tool-karte`: `npm install`, dann `gitbook publish .`
4. Den ausgegebenen Installationslink öffnen und die Integration in der Organisation bzw. im Space installieren.
5. Im Editor mit ⌘ + / den Block „KI-Tool-Karte“ einfügen.

Lokal weiterentwickeln: `gitbook dev` (leitet die installierte Integration auf den lokalen Code um, Bedienung im GitBook-Editor).

Sichtbarkeit bleibt `private`. Für andere Organisationen auf `unlisted` stellen und neu veröffentlichen.
