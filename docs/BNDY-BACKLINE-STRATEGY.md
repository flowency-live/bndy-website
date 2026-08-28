# BNDY Backline strategy

## Purpose

BNDY Backline is the durable intelligence layer underneath bndy.

Its job is not simply to collect more listings. Its job is to build, preserve and continuously improve the most useful picture of grassroots live music we can create, while keeping the evidence behind that picture visible, attributable and challengeable.

The public product can stay simple: open the map, find a gig, discover an artist or venue.

Backline is what makes that simplicity possible at scale.

## The strategic idea

Most event products optimise for a transaction, a ticket, a promoter feed or a single current listing.

Grassroots live music is different. Much of it is fragmented, local, free or low-cost, badly structured, duplicated, contradictory and short-lived online. A gig can be announced on a poster, corrected on Facebook, listed differently by a venue and disappear from every public source the day after it happens.

BNDY should not treat that mess as a temporary ingestion problem.

It is the knowledge problem at the heart of the product.

Backline therefore treats every useful source as evidence, turns what it sees into small attributable claims, resolves identities and conflicts over time, and projects only the best-supported current view into canonical BNDY.

The durable evidence underneath the product is more important than any single database row.

## The bigger ambition

Backline should become the living memory and intelligence layer of grassroots live music.

Not only:

- what is on tonight;
- who is playing where;
- which venue is open.

But over time:

- who played where;
- which venues consistently supported live music;
- which artists moved between towns and scenes;
- which promoters created opportunities;
- which rooms became important before anybody else noticed;
- where live music activity is growing;
- where it is disappearing;
- which local scenes overlap and connect;
- which parts of grassroots music are invisible to conventional commercial datasets;
- what the people inside those scenes knew and contributed.

A normal gig listing expires.

A Backline observation becomes part of the historical record.

That compounding value is a major strategic advantage. Every gig, venue, artist, curator contribution and source observation can make the system more useful tomorrow than it was today.

## Community, not extraction

The scene is not raw material for BNDY to own.

Backline exists to make the scene easier to see, understand and support.

Artists, venues, promoters, gig-goers and BNDY Curators are not merely users around the edge of an automated data platform. They are potential sources of high-value local knowledge.

The community should be able to:

- add evidence that automated discovery missed;
- confirm or challenge claims;
- explain local identity and naming ambiguity;
- identify cancellations, venue changes and one-off situations;
- establish ownership and first-party authority;
- contribute knowledge that would otherwise disappear;
- help Backline learn what is true in a particular local scene.

Technology gives BNDY reach. People give it context.

The long-term product should reward useful contribution, not raw activity. BNDY Rhythm, Curator Trust and local authority should eventually provide the human layer of Backline without turning contribution into a gameable points race.

## The Backline flywheel

The strategic flywheel is:

**People and sources -> evidence -> claims -> resolution -> understanding -> better discovery and support -> stronger participation -> better evidence.**

This matters because Backline should get smarter when the community participates, while the community should become more powerful as Backline gets smarter.

That is a stronger model than either pure scraping or pure crowdsourcing.

## What Backline should eventually make possible

Backline should support product experiences that are impossible with a flat events table.

Examples include:

### Better discovery

- Find the most reliable current version of a gig even when sources disagree.
- Surface gigs that commercial ticketing platforms miss.
- Understand aliases, old names and duplicate venue or artist identities.
- Prefer first-party and high-trust local evidence when appropriate.

### Better scene intelligence

- Identify venues becoming more active.
- Identify towns or neighbourhoods where live music activity is increasing.
- Detect areas where recurring live music is disappearing.
- See how artists, venues and towns form real circuits rather than administrative boundaries.
- Discover artists beginning to appear across multiple local scenes.

### Better opportunities for artists and venues

- Suggest plausible venues for an artist based on real historical relationships and comparable acts.
- Help venues discover artists already active in similar rooms or nearby scenes.
- Show meaningful venue and artist history without reducing everything to follower counts.
- Make grassroots contribution and consistency visible.

### Better community recognition

- Recognise the people and organisations that actually sustain a scene.
- Give Curators influence where their contribution has proven trustworthy.
- Preserve local knowledge with provenance rather than losing it inside social feeds.

### Better historical understanding

- Retain the record after a listing disappears.
- Reconstruct how a local scene changed over months and years.
- Understand the relationship history between artists, venues, promoters and places.
- Build a longitudinal grassroots dataset that conventional ticket-led platforms have little incentive to create.

## Time is a first-class dimension

Backline is not only a truth engine for the present.

It is a memory system.

A future resolved fact should never require us to erase the evidence that led to an earlier belief. Better evidence can change the resolution while the underlying observations remain.

This allows BNDY to distinguish:

- what a source said then;
- what another source said later;
- what BNDY believed at each point;
- why that belief changed.

That is essential for trustworthy AI, historical analysis and community accountability.

## Intelligence doctrine

Backline intelligence should follow these rules.

### Evidence before conclusion

Keep the source material or a durable representation of it before deriving a claim.

### Claims before entities

Break observations into atomic assertions rather than copying source-shaped blobs into canonical records.

### Identity can remain unresolved

Do not invent certainty when two artists, venues or events might be the same thing.

### Authority is contextual

No source is globally "trusted" for everything. A venue may be highly authoritative for its own address and event cancellation, while a local curator may be more useful for an alias or scene relationship.

### Corroboration matters

Independent agreement should strengthen confidence. Repeated copies of the same upstream source should not be mistaken for independent corroboration.

### AI investigates, it does not become truth

AI can parse, classify, compare, search and reason over evidence. Its output remains a claim or resolution decision with provenance, confidence and policy around it.

### Human knowledge is first-class evidence

Owners, artists, venues, curators and community submissions can all contribute evidence with explicit provenance and authority.

### Projection is a policy decision

Backline may know more than the public product should show. Projection into canonical BNDY must be deliberate, reversible and policy-controlled.

## Current architecture direction

The target flow remains:

**Acquire -> Evidence -> Observations -> Claims -> Identity resolution -> Authority and conflict resolution -> Projection -> Canonical BNDY**

The evidence and claims layer is the durable substrate.

The graph is a derived view over that substrate, useful for investigation, visualisation and retrieval, but it should not become the sole authority simply because graph technology is attractive.

The current low-cost serverless approach is strategically correct. Source bootstrap may be temporarily expensive. Business-as-usual acquisition should remain proportionate to the value and change rate of each source.

## Source strategy

More sources are useful only if they improve coverage, corroboration, identity resolution or freshness.

Backline should prefer:

- independent primary or near-primary sources;
- local grassroots sources with information absent from national platforms;
- artist and venue first-party sources;
- community evidence;
- sources with stable native identities or strong historical value.

It should avoid collecting ten copies of the same upstream feed and calling that ten-source confidence.

Source independence is therefore part of the evidence model, not just an ingestion concern.

## First intelligence cohort

The first useful resolution cohort should deliberately combine different kinds of provenance:

- Lemonrock, with broad national scale;
- On The Case, with bounded gig-led venue and band relationships;
- KLMA / Stoke, with historical significance inside BNDY and existing canonical overlap;
- existing canonical BNDY entities and owner or curator knowledge where available.

KLMA is particularly valuable because it was an early BNDY source. It gives us a partial known-answer environment in which legacy BNDY records, modern Backline source identities and other independent sources can be compared.

The goal of the cohort is not simply a high match percentage.

The goal is to prove that Backline can explain why two identities are believed to represent the same real-world entity, preserve uncertainty where they do not, and improve with corroborating evidence.

## Measures that matter

Backline should eventually be measured on more than ingestion volume.

Useful strategic measures include:

- proportion of active gigs with multiple independent evidence sources;
- identity resolution precision and reviewed false-merge rate;
- unresolved identity backlog and ageing;
- claim conflict rate and resolution latency;
- percentage of projected facts with explainable provenance;
- venue and artist coverage by geography;
- source freshness and source independence;
- first-party or curator-confirmed facts;
- historical continuity of artists, venues and scenes;
- useful community contributions accepted or corroborated;
- downstream discovery outcomes, where measurable.

"Claims collected" is an operational metric, not the end goal.

## Public positioning

The public language should not lead with "epistemic graph", "GraphRAG" or ingestion architecture.

The simplest public articulation is:

> **Backline is the living memory behind bndy. It keeps the evidence, connects what the scene tells us and gets smarter over time.**

A stronger expanded articulation is:

> **A gig listing normally disappears when the night is over. Backline remembers what happened, who played, where they played, what the sources said and how the scene connects. Over time that becomes a living, community-powered picture of grassroots live music.**

The technical articulation remains useful for developers, partners and technically curious users:

> **BNDY Backline is an AI-native evidence and resolution layer for grassroots live music. It preserves source evidence, creates attributable claims, resolves identities and conflicts, and projects the best-supported current view into canonical BNDY.**

These are different lenses on the same system, not different products.

## What we should not claim yet

The ambition can be explicit without pretending unfinished intelligence is already live.

Until proven, the website should not imply that Backline already:

- autonomously resolves all source identities;
- measures scene growth reliably;
- recommends venues or artists intelligently;
- understands promoter influence;
- has a complete historical graph;
- rewards Curators through Rhythm;
- projects resolved claims automatically into canonical BNDY.

Use language such as "can", "will allow", "is being built to" and "over time" for those capabilities.

Current live claims should remain grounded in what exists: evidence capture, observations, claims, source identities, shadow ingestion and the architecture needed for resolution.

## Strategic boundary

Backline is not the public app, not Backstage, not Capture and not a separate data product.

It is the intelligence substrate that can make all of them better.

Frontstage should remain easy to use.

Backstage should increasingly expose ownership, contribution, evidence and useful intelligence to artists and venues.

Capture should remain durable intake.

Godmode should expose the evidence and resolution machinery to trusted operators.

Rhythm should eventually connect human contribution and Trust into the same evidence system.

All of those surfaces should converge on Backline rather than inventing their own versions of truth.

## North star

If Backline succeeds, BNDY should be able to answer not only:

**"What gigs are near me tonight?"**

but increasingly:

**"What is actually happening in grassroots live music here, how do we know, how did it get here, and what can help it stay alive?"**

That is the strategic value of Backline.
