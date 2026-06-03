# SEO Phase 2 - Statisches Prerendering via GitHub Actions

**Status: vorbereitet, aber INAKTIV.** Erst aktivieren, wenn die Schritte unten
erledigt und einmal getestet sind. Greift nicht in den laufenden Hostinger-Build
ein.

## Warum dieser Weg

Hostingers Build-Sandbox kann kein Headless-Chromium ausführen. Deshalb laufen
Build **und** Prerendering (Puppeteer) in GitHub Actions, und nur die fertigen
statischen Dateien werden per FTP zu Hostinger geschoben. So bekommen Crawler je
Route echtes HTML mit Inhalt - statt einer leeren SPA-Shell.

## Schritt 1: Workflow-Datei anlegen

> Hinweis: Diese Datei muss über die **GitHub-Weboberfläche** angelegt werden
> (Add file → Create new file → Pfad `.github/workflows/prerender-deploy.yml`).
> Die API/Integration darf keine Workflow-Dateien schreiben.

```yaml
name: Prerender & Deploy (Phase 2 - manuell)

# Nur manuell startbar. Solange Hostinger den Build noch selbst macht, NICHT
# automatisch laufen lassen - sonst deployen zwei Systeme parallel.
on:
  workflow_dispatch: {}

jobs:
  build-prerender-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build (vite)
        env:
          VITE_SITE_URL: ${{ secrets.VITE_SITE_URL }}
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: pnpm build

      - name: Prerender (Puppeteer)
        run: |
          pnpm add -D puppeteer
          node scripts/prerender.mjs

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/public/
          server-dir: ${{ secrets.FTP_REMOTE_DIR }}
```

## Schritt 2: GitHub Secrets anlegen
(Repo → Settings → Secrets and variables → Actions)

| Secret | Wert |
|---|---|
| `FTP_HOST` | FTP-Server von Hostinger (z. B. `ftp.deine-domain.de`) |
| `FTP_USERNAME` | FTP-Benutzer |
| `FTP_PASSWORD` | FTP-Passwort |
| `FTP_REMOTE_DIR` | Zielordner, i. d. R. `/public_html/` |
| `VITE_SITE_URL` | finale Domain, z. B. `https://deine-domain.de` |
| `VITE_SUPABASE_URL` | aus `client/.env` |
| `VITE_SUPABASE_ANON_KEY` | aus `client/.env` (öffentlicher Anon-Key) |

## Schritt 3: Hostinger-Auto-Build deaktivieren

Solange Hostinger bei jedem Push selbst `vite build` ausführt, würde es die per
FTP hochgeladenen, vorgerenderten Dateien wieder überschreiben. Daher in den
Hostinger-Deployment-Einstellungen den automatischen Git-Build abschalten
(bzw. das Git-Deployment trennen), sodass `public_html` nur noch die per FTP
gelieferten Dateien enthält.

## Schritt 4: Testen

- Repo → Actions → „Prerender & Deploy (Phase 2 - manuell)“ → **Run workflow**.
- Danach prüfen:
  - Quelltext der Startseite enthält sichtbaren Text/Meta (nicht nur leere Shell).
  - `/impressum`, `/datenschutz`, `/agb` direkt aufrufbar mit Inhalt.
  - Rich-Results-Test besteht: https://search.google.com/test/rich-results

## Wichtige Caveats

- **.htaccess / Routing:** In `client/public/.htaccess` prüfen, dass direkte
  Aufrufe von `/impressum` etc. die vorgerenderte `/impressum/index.html`
  ausliefern und nicht vorher auf `/index.html` umgeschrieben werden.
- **Routenliste pflegen:** Neue Seiten in `scripts/prerender.mjs` (`ROUTES`)
  ergänzen.
- **robots.txt:** Auf der finalen Domain sicherstellen, dass Googlebot erlaubt
  ist (die Hostinger-Staging-robots.txt blockt ihn aktuell).
- **Sitemap:** Separat eine `sitemap.xml` erzeugen und in der Search Console
  einreichen.
- `puppeteer` wird bewusst nur im Workflow installiert, damit der normale
  Hostinger-Build clean bleibt.
