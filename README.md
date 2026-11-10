# QuestOmniNCS

Artemis Web SDK chat for the **Quest Results IVR - Text Link** project in the **Quest NCS Results IVR** workspace
(React + Vite, `@koreai/artemis-web-sdk`). Same behaviour as [QuestOmni](https://github.com/NagabhadramCh/QuestOmni),
pointed at the Quest workspace project.

Live site: <https://nagabhadramch.github.io/QuestOmniNCS/>

## Two ways in

| How the page is opened | What happens |
|---|---|
| **Texted link** from a Quest voice call: `.../QuestOmniNCS/s=0&c=<record>.<one-time key>` | A full-page **secure chat** starts with the single-use, server-minted verified token (hosted exchange on the QuestWebSDK channel). The Quest agent asks for the one value it needs, saves it for the call, and the caller says *done* on the call. |
| **Plain visit** | A normal chat bubble on the QuestWebSDK channel using the public key. |

The link code is read once and removed from the address bar right away. The token works once, for 5 minutes.

## Settings

| Setting | Value / where |
|---|---|
| Endpoint | `https://agents.kore.ai` (`src/config.js`) |
| Project | `01a1c476-2137-7d83-8e52-dc1258810f95` (`src/config.js`) |
| Web SDK channel (QuestWebSDK, hosted exchange) | `01a1c477-dade-7770-ad82-728cbe996364` (`src/config.js`) |
| Public key `VITE_AGENT_PUBLIC_API_KEY` | `.env` (public key of the **QuestSDK** key only; never put the channel secret `sk_...` here) |
| Link base the voice bot texts | Project config variable `TEXT_LINK_FORM_URL` = `https://nagabhadramch.github.io/QuestOmniNCS/` |

## Deploy (GitHub Pages, no Actions)

The built site is committed in `docs/`. `npm run build` also writes `docs/404.html` (a copy of `index.html`) so the
path-style texted links (`/QuestOmniNCS/s=0&c=...`) open the app instead of a GitHub 404 page.

1. `npm install` (first time)
2. Put the public key in `.env` (copy `.env.example`).
3. `npm run build` (writes `docs/`)
4. Commit and push `docs/` with your changes.
5. GitHub repository **Settings > Pages > Deploy from a branch > Branch: main, Folder: /docs**.

## Run locally

```bash
npm install
npm run dev
```

The public key only allows `https://nagabhadramch.github.io`; for `localhost` add `http://localhost:5173` to the key's
allowed origins in Studio.
