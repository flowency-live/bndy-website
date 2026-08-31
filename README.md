# bndy-website

The bndy public website. Static, greenfield, house design D.

Spec: `AllProjectsMD\bndy\10-Projects\bndy-website\BUILD-SPEC-bndy-website.md` (v1.0).
Copy sources: the `.md` files in `AllProjectsMD\bndy\10-Projects\bndy-website\`. The vault is the drafting home. This repo is what ships.

## Stack

1. Astro, static output. Every page renders full copy in the HTML source.
2. Plain CSS with custom properties. Tokens in `src/styles/global.css`.
3. Fonts self-hosted via @fontsource (Inter Tight, Inter, IBM Plex Mono). No Google runtime load.
4. No CMS. No component library.

## Commands

1. `npm install`
2. `npm run dev` for local work.
3. `npm run build` builds to `dist/`.
4. `npm run preview` serves the built output.

## Routes

`/` home · `/why` manifesto · `/promise` eight promises · `/artists` · `/venues` · `/go` gig-goers · `/how-bndy-thinks` public Backline explainer · `/stage` bndy Stage · `404`.

Outbound targets live in one place: `src/config.ts`. Explore gigs → `https://bndy.live`. Stage login → `https://backstage.bndy.co.uk`.

## Hard rules (Jason rulings, spec §3.4)

1. No border-radius anywhere. Square corners are the identity.
2. No pills, no rounded chips.
3. No em dashes in any copy or UI text. The deploy workflow fails the build if one appears.
4. WCAG 2.1 AA on every text/background pair, both themes.
5. Never name partners, data sources or other platforms in public copy.
6. The logo uses the exact BndyLogo.tsx paths. The counter holes fill with `var(--bg)`.
7. The strap is LIVE cyan / ALIVE orange. The old CombinedAbout.tsx has it reversed. Do not "fix" it from old code.

## Copy

Copy is ported byte-exact from the vault files. Do not edit copy in this repo without updating the vault first. `/stage` copy ported verbatim 2026-08; rewrite scheduled, Jason owns it.

## Deploy

GitHub Actions → AWS Amplify Hosting, manual-deploy app. See `.github/workflows/deploy.yml` for the required secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) and variables (`AMPLIFY_APP_ID`, `AMPLIFY_BRANCH`, `AWS_REGION`).

⚠ Staging first. No DNS or CloudFront change without Jason's explicit go (spec §2.6, §7.11).

## Analytics

Decision pending. One documented hook point exists at the end of `<head>` in `src/layouts/Base.astro`. Load nothing anywhere else.
