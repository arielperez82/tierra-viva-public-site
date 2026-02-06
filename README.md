# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                               | Action                                                                         |
| :------------------------------------ | :----------------------------------------------------------------------------- |
| `pnpm install`                        | Installs dependencies                                                          |
| `pnpm dev`                            | Starts local dev server at `localhost:4321`                                    |
| `pnpm build`                          | Build your production site to `./dist/`                                        |
| `pnpm preview`                        | Preview your build locally, before deploying                                   |
| `pnpm check` / `pnpm type-check`      | TypeScript validation (`astro check`); runs in pre-commit (Phase 0)            |
| `pnpm lint` / `pnpm lint:fix`         | ESLint (check / fix); runs on staged TS/JS/Astro in pre-commit                 |
| `pnpm lint:format` / `...:fix`        | Prettier (check / write); runs on staged files in pre-commit                   |
| `pnpm lint:md` / `pnpm lint:md:fix`   | MarkdownLint (check / fix); runs on staged `.md` in pre-commit                 |
| `pnpm lint:css` / `pnpm lint:css:fix` | Stylelint (check / fix) on `src/**/*.css`; runs on staged `.css` in pre-commit |
| `pnpm lighthouse:audit`               | Run Lighthouse (a11y, SEO, performance). See [Lighthouse](#lighthouse) below.  |
| `pnpm astro ...`                      | Run CLI commands like `astro add`, `astro check`                               |
| `pnpm astro -- --help`                | Get help using the Astro CLI                                                   |

Pre-commit (Husky + lint-staged) runs full-project type-check, ESLint fix, Prettier fix, MarkdownLint fix, and Stylelint fix on staged files. Commit is blocked if any check fails.

**CI:** On push/PR to `main`, GitHub Actions runs `pnpm check` and `pnpm lint`. Lighthouse can be enabled in `.github/workflows/ci.yml` (optional job commented out).

**Deploy:** `.github/workflows/deploy.yml` builds the site and deploys to GitHub Pages on push to `main` or via **workflow_dispatch**. Enable it in **Settings → Pages → Source**: choose **GitHub Actions**. Build uses `ASTRO_SITE` and `ASTRO_BASE` from repository variables if set (see `.env.example`); otherwise defaults to GitHub Pages project-site URL and base path. No secrets are required for the static build.

### Lighthouse

`pnpm lighthouse:audit` runs Lighthouse (accessibility, SEO, performance) and writes reports to **`test-reports/`** (gitignored):

- `lighthouse-report.report.html` — interactive report
- `lighthouse-report.report.json` — raw data
- `lighthouse-report.md` — score summary table

**Config:** Defaults come from `lighthouse.config.ts` (`port`, `basePath`, `reportDir`). Override with env vars (no dotenv inside the script; pass env from outside if needed). The `.ts` config allows dynamic logic when required.

| Env var                 | Effect                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `LIGHTHOUSE_URL`        | Full URL to audit. If set, no local build or server; Lighthouse runs against this URL only. |
| `LIGHTHOUSE_PORT`       | Preview server port (when not using `LIGHTHOUSE_URL`)                                       |
| `LIGHTHOUSE_BASE_PATH`  | Base path for local URL                                                                     |
| `LIGHTHOUSE_REPORT_DIR` | Output directory (default `test-reports`)                                                   |

**Examples:**

```bash
# Local: build, serve preview, then audit
pnpm lighthouse:audit

# Audit production or any URL (no build)
LIGHTHOUSE_URL=https://example.com pnpm lighthouse:audit

# Load env from file (e.g. dotenv CLI)
dotenv -f .env.test -- pnpm lighthouse:audit
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
