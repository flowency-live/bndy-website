# BNDY Backline website explainer

## Public messaging architecture

Backline has three public lenses. They should reinforce each other without trying to say everything on one page.

### 1. Community / why it matters

Primary page: `/backline`

The emotional and strategic story.

Core articulation:

> **Backline is the living memory behind bndy. It keeps the evidence, connects what the scene tells us and gets smarter over time.**

The page should explain that a gig listing normally disappears, while the relationships and history underneath it can become part of a durable picture of grassroots live music.

This is where we talk about:

- the scene leaving a trace rather than listings disappearing;
- artists, venues, places and relationships accumulating over time;
- local knowledge becoming useful evidence;
- the community flywheel;
- future questions Backline is being built to answer;
- technology serving the scene rather than owning it.

Do not lead with graph terminology here.

### 2. Simple / how BNDY knows

Primary page: `/how-bndy-thinks`, simple section.

Most gig platforms store listings. BNDY is building a continuously learning model of grassroots live music.

A local gig might appear on a venue website, Facebook, Lemonrock, a poster or an artist's own page. Those sources can disagree, change or disappear.

Instead of simply copying the latest thing we find into a database, **BNDY Backline keeps the evidence**.

Backline breaks what we observe into small claims:

- this artist has this name;
- this venue is at this address;
- this gig is on this date;
- this source says it starts at 9pm;
- the venue now says it starts at 9:30pm;
- this event has been cancelled.

It also remembers where every claim came from.

That allows BNDY to compare sources, recognise when different pages refer to the same artist or venue, preserve disagreements and change its view when better evidence appears.

The result shown on BNDY is therefore not just the last thing a scraper copied. It is the **best-supported current view** produced from the evidence Backline holds.

AI helps BNDY interpret messy information, discover relationships and investigate uncertainty. But the AI itself is not treated as truth. The original evidence remains underneath every decision.

### 3. Technical / how Backline works

Primary page: `/how-bndy-thinks`, geek section.

Technical articulation:

> **BNDY Backline is an AI-native evidence and resolution layer for grassroots live music. It preserves source evidence, creates attributable claims, resolves identities and conflicts, and projects the best-supported current view into canonical BNDY.**

This is where evidence graphs, provenance, claims, authority, resolution, projection, serverless architecture and future graph retrieval belong.

## One-sentence options

Community:

> **Backline is the living memory behind bndy: a community-powered picture of grassroots live music that can become richer and more useful over time.**

Simple:

> **Backline keeps the evidence behind what BNDY finds, compares different sources and helps BNDY build the best-supported current view.**

Technical:

> **BNDY Backline is an AI-native evidence and resolution layer for grassroots live music, preserving source evidence and attributable claims before controlled projection into canonical BNDY.**

## Guardrail

The ambition should be visible without pretending unfinished intelligence is already live.

For identity resolution, scene intelligence, recommendations, automated corroboration, historical analysis and community reward, use language such as `is being built to`, `can`, `will allow` and `over time` until those capabilities are proven in production.

Current live claims can confidently describe the evidence foundation, observations, claims, source identities and shadow ingestion architecture.

## Strategic source

The fuller internal intent, product implications, intelligence doctrine, community flywheel and north star live in `docs/BNDY-BACKLINE-STRATEGY.md`.
