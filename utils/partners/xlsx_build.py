# Erzeugt docs/partnerprogramme.xlsx: alle verlinkten Tools, Verzeichnisse und Domains der Website mit
# Partnerprogramm, Registrierungslink und leeren Spalten zum Eintragen der eigenen Partnerlinks.
# Aufruf nach einem Build (für das Blatt „Alle Domains“ wird out/ gelesen):
#   python3 utils/partners/xlsx_build.py
# Bereits eingetragene Status kommen aus db/partners.json, Links und Codes aus db/affiliate-links.json; beim Neuerzeugen geht nichts verloren.
import collections
import glob
import html
import json
import re
import subprocess
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parents[2]
SITE = 'https://jmp-collab.github.io/ai-directories'
reg = json.loads((ROOT / 'db/partners.json').read_text())
_links = {l['id']: l for l in json.loads((ROOT / 'db/affiliate-links.json').read_text())['links']}
for _p in reg['programme']:
    _l = _links.get(_p['id']) or {}
    _p['partner_link'] = _l.get('link', '')
    _p['coupon'] = {'code': _l['code'], 'text': _l.get('rabatt') or 'discount'} if _l.get('code') else None
STATUS = reg['status_werte']
prog = reg['programme']
by_tool = {p['tool_slug']: p for p in prog if p.get('tool_slug')}
by_dir = {p['directory_slug']: p for p in prog if p.get('directory_slug')}
by_host = {p['host']: p for p in prog if p.get('host')}

host = lambda u: urlparse(u or '').netloc.lower().removeprefix('www.')

tools = json.loads((ROOT / 'db/tools.json').read_text())
dirs = json.loads(subprocess.check_output(['node', '-e', "const s=require('./utils/slugify');const d=require('./db/directories.json');console.log(JSON.stringify((d.data||d).map(x=>({...x,slug:s(x.name)}))))"], cwd=ROOT))
kb = json.loads((ROOT / 'db/kb-tools.json').read_text())['tools']
neu = json.loads((ROOT / 'db/neu-entdeckt.json').read_text())

tool_hosts = {host(t['url']): t for t in tools}
dir_hosts = {host(d['link']): d for d in dirs}
kb_hosts = {t['domain'].removeprefix('www.'): t for t in kb}
neu_hosts = {host(n['link']): n for n in neu}

# Externe Links aus dem fertigen Export zählen
links = collections.defaultdict(lambda: {'n': 0, 'seiten': set()})
for f in glob.glob(str(ROOT / 'out/**/index.html'), recursive=True):
    seite = '/' + str(Path(f).relative_to(ROOT / 'out').parent).replace('.', '').strip('/')
    for u in re.findall(r'href="(https?://[^"]+)"', open(f, encoding='utf8').read()):
        h = host(html.unescape(u))
        if h and 'jmp-collab.github.io' not in h:
            links[h]['n'] += 1
            links[h]['seiten'].add(seite.rstrip('/') + '/')

GRUEN = PatternFill('solid', fgColor='DCFCE7')
GELB = PatternFill('solid', fgColor='FEF9C3')
GRAU = PatternFill('solid', fgColor='F3F4F6')
KOPF = PatternFill('solid', fgColor='1B1B1F')
EINTRAG = PatternFill('solid', fgColor='FFF7D6')

FILL_COLS = ['Status', 'Partner-Link (eintragen)', 'Rabattcode', 'Rabatt-Text (englisch, z. B. 20% discount)', 'Registriert am', 'Login / Konto', 'Notizen']


def programm_felder(p):
    if not p:
        return ['unklar, nicht recherchiert', '', '', '', '', '']
    vorhanden = p.get('programm') or ('nur Rabattcode' if p.get('kind') == 'directory' and not p.get('signup_url') else 'ja')
    return [vorhanden, p.get('network') or '', p.get('commission') or '', p.get('cookie') or '', p.get('signup_url') or '', p.get('quelle') or '']


def eintrag_felder(p):
    if not p:
        return ['nicht registriert', '', '', '', '', '', '']
    c = p.get('coupon') or {}
    return [p.get('status') or 'nicht registriert', p.get('partner_link') or '', c.get('code', ''), c.get('text', ''), p.get('registriert_am', ''), p.get('konto', ''), p.get('notes') or '']


def seiten_info(h):
    e = links.get(h)
    if not e:
        return [0, 0, '']
    beispiel = sorted(e['seiten'], key=len)[0]
    return [e['n'], len(e['seiten']), SITE + beispiel]


def suche(name):
    return 'https://www.google.com/search?q=' + re.sub(r'\s+', '+', f'{name} affiliate program')


wb = Workbook()

# Anleitung
ws = wb.active
ws.title = 'Anleitung'
anleitung = [
    ['Partnerprogramme AIGeddon', ''],
    ['Stand', date.today().isoformat()],
    ['', ''],
    ['So funktioniert es', ''],
    ['1.', 'In den Blättern „Tools“ und „Verzeichnisse“ stehen alle Anbieter, die auf der Website verlinkt sind, mit recherchiertem Partnerprogramm und Registrierungslink. „KI-Tool-Datenbank“, „Neu entdeckt“ und „Alle Domains“ listen den Rest.'],
    ['2.', 'Anmelden über den Link in der Spalte „Anmeldung (Registrierungslink)“. Bei „unklar, nicht recherchiert“ hilft der Link „Suche nach Programm“.'],
    ['3.', 'Nach der Freischaltung in den gelb hinterlegten Spalten eintragen: Status, Partner-Link (muss mit https:// beginnen), optional Rabattcode und Rabatt-Text, Datum, Login und Notizen.'],
    ['4.', 'Datei zurück ins Projekt legen (docs/partnerprogramme.xlsx) oder Claude im Chat geben. Dann: python3 utils/partners/xlsx_import.py und npm run partners. Ab dem nächsten Build nutzt die Website den Link überall automatisch, markiert ihn mit * und rel="sponsored".'],
    ['', ''],
    ['Status-Werte', ', '.join(STATUS)],
    ['Wann wird ein Link genutzt?', 'Nur bei Status „aktiv“ und eingetragenem Partner-Link. Ein Partner-Link ohne Status setzt den Status automatisch auf „aktiv“.'],
    ['Wo greift der Link?', 'Tools: Steckbrief, Vergleiche, Prompts, Rubriken. Verzeichnisse: Liste, Verzeichnis-Seite, Rabattcodes. KI-Tool-Datenbank und Domains: über die Domain auf allen Tool-Karten und Tool-Seiten.'],
    ['Regeln', 'Keine bezahlten Suchanzeigen auf Markennamen, wenn das Programm es verbietet. Anmeldung mit der Firma (USt-IdNr. bereithalten), nicht mit der Arbeitsadresse. Provisionen und Cookie-Laufzeiten sind Angaben der Anbieter, Stand siehe Spalte „Quelle“.'],
]
for r in anleitung:
    ws.append(r)
ws['A1'].font = Font(bold=True, size=16)
ws['A4'].font = Font(bold=True)
for r in range(1, ws.max_row + 1):
    ws.cell(r, 2).alignment = Alignment(wrap_text=True, vertical='top')
    ws.cell(r, 1).alignment = Alignment(vertical='top')
    if r > 9:
        ws.cell(r, 1).font = Font(bold=True)
ws.column_dimensions['A'].width = 26
ws.column_dimensions['B'].width = 120


def blatt(titel, kopf, rows, breiten, link_spalten=(), id_spalte=None):
    ws = wb.create_sheet(titel)
    ws.append(kopf + FILL_COLS)
    for r in rows:
        ws.append(r)
    for i, k in enumerate(kopf + FILL_COLS, 1):
        c = ws.cell(1, i)
        c.font = Font(bold=True, color='FFFFFF')
        c.fill = KOPF
        c.alignment = Alignment(wrap_text=True, vertical='center')
        ws.column_dimensions[get_column_letter(i)].width = (breiten + [16, 48, 14, 22, 14, 22, 30])[i - 1]
    ws.row_dimensions[1].height = 34
    ws.freeze_panes = ws.cell(2, 3)
    ws.auto_filter.ref = ws.dimensions
    n_kopf = len(kopf)
    dv = DataValidation(type='list', formula1='"' + ','.join(STATUS) + '"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f'{get_column_letter(n_kopf + 1)}2:{get_column_letter(n_kopf + 1)}{max(2, ws.max_row)}')
    prog_col = kopf.index('Partnerprogramm') + 1 if 'Partnerprogramm' in kopf else None
    for r in range(2, ws.max_row + 1):
        for i in range(n_kopf + 1, n_kopf + len(FILL_COLS) + 1):
            ws.cell(r, i).fill = EINTRAG
        if prog_col:
            v = str(ws.cell(r, prog_col).value or '')
            ws.cell(r, prog_col).fill = GRUEN if v.startswith('ja') or v.startswith('nur') else GELB if v.startswith('unklar') else GRAU
        for name in link_spalten:
            ci = kopf.index(name) + 1
            c = ws.cell(r, ci)
            if c.value and str(c.value).startswith('http'):
                c.hyperlink = c.value
                c.font = Font(color='1D4ED8', underline='single')
    return ws


PK = ['Partnerprogramm', 'Netzwerk', 'Provision', 'Cookie', 'Anmeldung (Registrierungslink)', 'Quelle']

# Tools (Steckbriefe)
rows = []
for t in sorted(tools, key=lambda t: t['name'].lower()):
    p = by_tool.get(t['slug'])
    h = host(t['url'])
    rows.append([t['name'], t['slug'], t['category'], t['url'], f"{SITE}/tools/{t['slug']}/", *seiten_info(h)[:2], *programm_felder(p), suche(t['name']), *eintrag_felder(p)])
blatt('Tools', ['Name', 'Slug', 'Kategorie', 'Website', 'Steckbrief auf AIGeddon', 'Links auf der Seite', 'Seiten mit Link', *PK, 'Suche nach Programm'], rows, [22, 18, 22, 30, 40, 10, 10, 16, 16, 40, 12, 44, 30, 30], ('Website', 'Steckbrief auf AIGeddon', 'Anmeldung (Registrierungslink)', 'Quelle', 'Suche nach Programm'))

# Verzeichnisse
rows = []
for d in sorted(dirs, key=lambda d: d['name'].lower()):
    p = by_dir.get(d['slug'])
    rows.append([d['name'], d['slug'], d['link'], d.get('submission_link') or '', d.get('pricing') or '', d.get('domain_rating'), f"{SITE}/verzeichnis/{d['slug']}/", *programm_felder(p), suche(d['name']), *eintrag_felder(p)])
blatt('Verzeichnisse', ['Name', 'Slug', 'Website', 'Einreichung', 'Preis', 'Domain Rating', 'Seite auf AIGeddon', *PK, 'Suche nach Programm'], rows, [24, 22, 30, 30, 9, 9, 40, 16, 16, 40, 12, 44, 30, 30], ('Website', 'Einreichung', 'Seite auf AIGeddon', 'Anmeldung (Registrierungslink)', 'Quelle', 'Suche nach Programm'))

# KI-Tool-Datenbank (ohne die Tools mit Steckbrief, die stehen oben)
rows = []
for t in sorted(kb, key=lambda t: t['name'].lower()):
    h = t['domain'].removeprefix('www.')
    if h in tool_hosts:
        continue
    p = by_host.get(h)
    rows.append([t['name'], h, t['url'], t.get('rubrik') or '', t.get('preis') or '', f"{SITE}/ki-tools/tool/{t['slug']}/", *seiten_info(h)[:2], *programm_felder(p), suche(t['name']), *eintrag_felder(p)])
blatt('KI-Tool-Datenbank', ['Name', 'Domain', 'Website', 'Rubrik', 'Preis (Quelle)', 'Seite auf AIGeddon', 'Links auf der Seite', 'Seiten mit Link', *PK, 'Suche nach Programm'], rows, [24, 22, 30, 14, 12, 40, 10, 10, 16, 16, 40, 12, 44, 30, 30], ('Website', 'Seite auf AIGeddon', 'Anmeldung (Registrierungslink)', 'Quelle', 'Suche nach Programm'))

# Neu entdeckte Verzeichnisse
rows = []
for n in sorted(neu, key=lambda n: n['name'].lower()):
    h = host(n['link'])
    p = by_host.get(h)
    rows.append([n['name'], h, n['link'], n.get('submission_link') or '', n.get('pricing') or '', n.get('typ') or '', *programm_felder(p), suche(n['name']), *eintrag_felder(p)])
blatt('Neu entdeckt', ['Name', 'Domain', 'Website', 'Einreichung', 'Preis', 'Typ', *PK, 'Suche nach Programm'], rows, [24, 22, 30, 30, 10, 12, 16, 16, 40, 12, 44, 30, 30], ('Website', 'Einreichung', 'Anmeldung (Registrierungslink)', 'Quelle', 'Suche nach Programm'))


# Alle Domains aus dem Export
def art(h):
    if h in tool_hosts:
        return 'Tool (Steckbrief)'
    if h in dir_hosts:
        return 'KI-Verzeichnis'
    if h in neu_hosts:
        return 'Neu entdecktes Verzeichnis'
    if h in kb_hosts:
        return 'Tool (KI-Tool-Datenbank)'
    if h in ('github.com', 'youtube.com', 'google.com'):
        return 'Plattform'
    return 'Quelle, Beleg oder Sonstiges'


rows = []
for h, e in sorted(links.items(), key=lambda x: -len(x[1]['seiten'])):
    p = by_host.get(h) or next((by_tool.get(t['slug']) for hh, t in tool_hosts.items() if hh == h), None) or next((by_dir.get(d['slug']) for hh, d in dir_hosts.items() if hh == h), None)
    rows.append([h, h, art(h), e['n'], len(e['seiten']), SITE + sorted(e['seiten'], key=len)[0], *programm_felder(p), suche(h), *eintrag_felder(p)])
blatt('Alle Domains', ['Name', 'Domain', 'Art', 'Links auf der Seite', 'Seiten mit Link', 'Beispielseite', *PK, 'Suche nach Programm'], rows, [24, 24, 22, 10, 10, 40, 16, 16, 40, 12, 44, 30, 30], ('Beispielseite', 'Anmeldung (Registrierungslink)', 'Quelle', 'Suche nach Programm'))

# Neutrale Metadaten (kein Generator- oder Tool-Name in den Dokumenteigenschaften)
wb.properties.creator = 'AIGeddon'
wb.properties.lastModifiedBy = 'AIGeddon'
wb.properties.title = 'Partnerprogramme AIGeddon'
ziel = ROOT / 'docs' / 'partnerprogramme.xlsx'
wb.save(ziel)
print(f'{ziel.relative_to(ROOT)}: Tools {len(tools)}, Verzeichnisse {len(dirs)}, KI-Tool-Datenbank {len(kb) - sum(1 for t in kb if t["domain"].removeprefix("www.") in tool_hosts)}, Neu entdeckt {len(neu)}, Domains {len(links)}')

# Generator-Kennung aus docProps/app.xml entfernen (Metadaten neutral halten)
import zipfile

tmp = ziel.with_suffix('.tmp')
with zipfile.ZipFile(ziel) as zin, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        daten = zin.read(item.filename)
        if item.filename == 'docProps/app.xml':
            daten = re.sub(rb'<Application>.*?</Application>', b'<Application>Microsoft Excel</Application>', daten)
            daten = re.sub(rb'<AppVersion>.*?</AppVersion>', b'<AppVersion>16.0300</AppVersion>', daten)
        zout.writestr(item, daten)
tmp.replace(ziel)
