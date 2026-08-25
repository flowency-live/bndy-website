# BNDY Rhythm: Curator Rewards, Trust and Community Value

**Status:** Product initiative / detailed PRD  
**Date:** 25 August 2026  
**Working name:** BNDY Rhythm  
**Primary unit:** Beats  
**Primary users:** Curators, contributors, artists, venue operators  
**Related capabilities:** BNDY Backline, Join bndy, Curators & Godmode, canonical BNDY APIs

## 1. Executive summary

BNDY Rhythm is a contribution, trust and reputation system designed to recognise the people who help keep BNDY's live-music graph accurate while creating a durable human-verification layer for BNDY Backline.

The central idea is deliberately simple: useful contributions earn **Beats**. Music notation and musical structures provide the language for progression, so small contributions can earn fractions of a Beat, larger contributions can earn Beats or Bars, and substantial milestones can accumulate into Songs.

Rhythm must not launch as a cryptocurrency, cash-equivalent loyalty scheme or ownership promise. At launch, Beats are non-transferable, cannot be purchased, cannot be redeemed for cash and have no monetary value. They are an auditable record of accepted contribution. Separately, BNDY maintains a **Trust** model representing the reliability, locality and authority of contributors. Beats recognise contribution; Trust controls influence.

This separation is fundamental. It makes the system understandable and enjoyable without allowing users to acquire authority simply by farming points. It also preserves strategic optionality. A durable contribution ledger could later support benefits, commercial credits, community governance or eligibility for a separately constituted community ownership pool without retrospectively pretending that Beats were shares, money or regulated tokens.

The strategic value is larger than gamification. BNDY Backline can discover and interpret evidence at national scale, but trusted humans can resolve ambiguity that automation cannot. Rhythm turns that human judgement into structured provenance. Over time BNDY can know not only that a claim exists, but who asserted it, where their expertise lies, how often their previous claims were corroborated, what evidence supported the assertion and how much authority the claim should carry.

## 2. Product vision

**Backline discovers the live-music world. The community teaches it what is true. Beats recognise the humans who make that possible.**

Rhythm should make contributing to BNDY feel like participating in a local music scene rather than performing unpaid database administration.

The system should:

1. reward genuinely useful contribution;
2. increase the quality and freshness of BNDY data;
3. provide Backline with a human-in-the-loop truth and conflict-resolution layer;
4. recognise local expertise rather than treating all contributors as globally authoritative;
5. create visible progression and community identity;
6. resist farming, collusion and repetitive low-value edits;
7. preserve an immutable history of contribution and validation;
8. create future commercial and community-ownership options without making present-day financial promises.

## 3. Problem statement

BNDY historically expected Curators to verify gigs, enrich artist and venue records, add missing gigs, correct information and mark cancellations. BNDY Backline now automates a growing proportion of discovery and enrichment, but automation does not remove the need for community stewardship.

Backline creates a different problem: as evidence volume increases, BNDY needs a reliable way to decide which claims deserve greater weight, which conflicts need human intervention, which local people have demonstrated expertise and how human verification should affect projection into canonical BNDY.

The existing curator permission model answers **what a curator is allowed to do**. Rhythm answers:

- what they contributed;
- whether the contribution proved correct;
- how much value it added;
- where they have demonstrated expertise;
- how much their future claims should influence Backline;
- how BNDY recognises that contribution.

## 4. Product principles

### 4.1 Beats are contribution, not authority

A high Beat balance must never automatically confer high authority. A prolific but inaccurate contributor can have many lifetime Beats and low Trust. A highly accurate specialist may have fewer Beats but substantially greater influence in their local scene.

### 4.2 Reward accepted value, not raw activity

Submitting an edit is not sufficient to earn the full reward. Rewards should normally settle when a contribution is accepted, corroborated, independently verified or otherwise reaches the required confidence threshold.

### 4.3 Trust is earned and reversible

Trust reflects demonstrated reliability and can rise or fall. Rejected contributions, reversals, suspicious behaviour and repeated low-quality assertions can reduce Trust even though historical Beats remain in the contribution ledger.

### 4.4 Local expertise matters

Trust should have both global and contextual components. A curator with exceptional accuracy around Stockport venues should carry more authority for Stockport venue claims than for an unfamiliar scene elsewhere in the country.

### 4.5 Backline remains evidence-first

A curator assertion is evidence/claim input to Backline, not an uncontrolled direct database mutation. Trusted roles may permit immediate projection for specific predicates, but the assertion and resulting projection decision must remain auditable.

### 4.6 Owner authority remains protected

Existing owner-management and authority protections continue to apply. Rhythm must not create a route for high-scoring contributors to overwrite artist or venue owners indiscriminately.

### 4.7 Financial optionality without financial promises

At MVP launch Beats have no monetary value, cannot be bought, sold or transferred and are not redeemable for equity. Future commercial Credits, benefits or ownership programmes must be designed as separate mechanisms.

## 5. Terminology

### Beat
The base contribution unit. Stored internally as integer subunits so fractions never require floating-point arithmetic.

### Bar
A larger display unit composed of Beats.

### Song
A substantial progression/milestone unit composed of Bars.

### Trust
A dynamic reliability/authority score derived from accepted, rejected, corroborated and reversed contributions plus contextual signals.

### Scene Trust
Contextual Trust associated with a geographic area and potentially an entity/predicate family.

### Contribution
A user action intended to improve BNDY knowledge, such as adding a gig, correcting a venue URL or confirming a cancellation.

### Validation
Evidence or decision establishing whether a contribution should be accepted, rejected, superseded or remain unresolved.

### Bounty
A Backline-generated question or data-quality task offered to suitable contributors because BNDY has identified uncertainty or missing information.

### Credits
A possible future commercial unit purchased and spent for BNDY services. Credits are explicitly separate from Beats.

## 6. Musical reward language

The UI should use a simple musical hierarchy while the backend stores only integer reward subunits.

Recommended initial display model:

- 1/8 Beat: tiny but useful accepted contribution;
- 1/4 Beat: minor enrichment;
- 1/2 Beat: useful verification or correction;
- 1 Beat: meaningful accepted contribution;
- 1 Bar: significant contribution or resolved uncertainty;
- 16 Bars: 1 Song.

The exact arithmetic is a product configuration, not hard-coded domain logic. The system should be able to change display thresholds without rewriting historical ledger entries.

Example feedback:

- `+1/4 Beat - Facebook page confirmed`
- `+1 Beat - Gig confirmed`
- `+1 Bar - New live-music venue discovered`
- `Song completed - 16 Bars of accepted contribution`

## 7. Contribution catalogue

Rewards must be configurable and may vary according to information gain, confidence, scarcity and verification difficulty.

### 7.1 Event contributions

Candidate actions include:

- add a previously unknown gig;
- confirm an uncertain Backline-discovered gig;
- correct date/time;
- identify missing artist;
- identify missing venue;
- add ticket URL or event URL;
- confirm free/ticketed status;
- mark cancellation with evidence;
- resolve duplicate events;
- confirm an event has moved venue/date;
- resolve an ambiguous artist/venue match.

### 7.2 Artist contributions

Candidate actions include:

- create a genuinely new artist identity;
- add/verify canonical social URLs;
- add/verify website;
- correct artist type;
- add/verify act type;
- add/verify genre information;
- resolve duplicate artist identities;
- identify a renamed/disbanded/inactive act;
- connect source-native identity to canonical artist;
- resolve a Backline identity conflict.

### 7.3 Venue contributions

Candidate actions include:

- identify a new live-music venue;
- verify that a venue currently hosts live music;
- correct address/location;
- add/verify website/social URLs;
- identify regular live-music nights;
- confirm venue closure;
- confirm cessation/resumption of live music;
- resolve duplicate venue identities;
- connect source-native identity to canonical venue.

### 7.4 Artist and venue owner participation

Artists and venues can also earn Beats for community-positive onboarding and data-quality actions, for example joining BNDY, completing a useful profile, connecting authoritative identity sources and contributing confirmed public gig information.

Routine self-serving operational actions should not become an unlimited Beat generator. Availability management, booking administration and repetitive changes to one's own profile should either earn no Beats or be subject to strict one-time/milestone rules.

## 8. Dynamic reward calculation

A fixed action table alone will be gameable. Rhythm should start with configured base values but evolve toward **information-value rewards**.

Suggested reward calculation inputs:

- action base value;
- whether the information was previously unknown;
- whether Backline already held the same high-confidence claim;
- number and authority of corroborating sources;
- difficulty/ambiguity of the task;
- whether the action resolves a conflict;
- freshness value;
- geographic/source scarcity;
- repetitive-action diminishing returns;
- contributor relationship to the entity;
- anti-abuse risk score.

A user who supplies a URL Backline already knows should receive little or nothing. A curator who resolves two conflicting venue identities and prevents duplicate projection may receive substantially more.

## 9. Reward lifecycle

Every reward follows a state machine rather than directly incrementing a balance.

1. **Submitted** - contribution captured with actor, target, assertion and evidence.
2. **Pending** - awaiting corroboration/policy evaluation.
3. **Accepted** - contribution accepted as useful evidence or canonical correction.
4. **Rewarded** - ledger reward posted.
5. **Reversed/Superseded** - later evidence invalidates or supersedes the assertion.

Historical ledger entries must not be silently deleted. If an awarded contribution is later found to be wrong, create an adjustment/reversal event and update Trust. This preserves provenance.

Optional UX can grant a small provisional acknowledgement at submission, but the economically/reputationally meaningful reward should settle only after validation.

## 10. Trust model

### 10.1 Trust dimensions

Trust should be multidimensional rather than one naive score:

- global reliability;
- geographic/scene reliability;
- entity-type reliability: Artist, Venue, Event, Festival;
- predicate reliability where useful: cancellations, identity resolution, social links, etc.;
- recency/activity;
- evidence quality;
- independence/collusion risk.

### 10.2 Trust inputs

Positive signals:

- contribution independently corroborated;
- artist/venue owner confirms contribution;
- trusted source subsequently agrees;
- other independent trusted curators agree;
- Backline later observes confirming evidence;
- long-term low reversal rate.

Negative signals:

- contribution rejected;
- canonical projection later reversed because contribution was incorrect;
- repeated unverifiable claims;
- suspicious reciprocal validation;
- duplicate/repetitive low-information edits;
- contributions outside demonstrated expertise with poor accuracy;
- deliberate abuse.

### 10.3 Trust output

Backline should consume a bounded authority value, not a raw public gamification score. Example conceptual authority inputs:

`actorTrust x sceneAffinity x predicateReliability x evidenceQuality x independenceFactor`

The exact formula should be configurable, versioned and observable in Godmode.

## 11. Backline integration

Rhythm should integrate directly with the existing Backline evidence -> claims -> policy -> projection architecture.

A curator contribution should produce:

1. a durable contribution record;
2. evidence references where supplied;
3. one or more atomised claims;
4. actor provenance;
5. geographic/context metadata;
6. authority inputs derived from Trust;
7. a projection/validation decision;
8. a reward decision;
9. subsequent Trust observations when corroborated/rejected.

Human assertions therefore become another evidence family inside Backline rather than a parallel truth system.

### 11.1 Example: uncertain gig

Backline finds a venue Facebook post suggesting a Friday gig but cannot confidently resolve the artist.

- Backline stores the source observation and claims.
- Confidence remains below projection threshold.
- Backline creates a Bounty for local curators.
- A trusted local curator resolves the artist and provides the relevant source.
- Human claim is linked to the original uncertainty.
- Combined evidence crosses projection threshold.
- Canonical event is created/updated through canonical BNDY API.
- Curator receives accepted reward.
- Later independent source corroboration improves their relevant Trust.

### 11.2 Example: cancellation

A curator marks a gig cancelled.

A new contributor's cancellation may remain pending until corroborated. A Trusted Curator with strong local cancellation accuracy may trigger immediate safe projection while Backline continues to audit the assertion. Owner confirmation can carry still greater predicate-specific authority.

## 12. Bounties: human-in-the-loop Backline

Bounties are a core feature, not an optional gamification extra. Backline knows where its graph is uncertain and should actively ask suitable humans for help.

Examples:

- Is The King's Arms still running Thursday Open Mic?
- Which artist is playing The Swan on Saturday?
- Does The Railway still host live music?
- Are these two venue records the same place?
- Is this Lemonrock artist the same artist as this BNDY record?
- This venue page disappeared. Is the venue closed or is the URL stale?

Bounty selection should consider:

- curator geography;
- demonstrated scene expertise;
- Trust;
- recent activity;
- conflict of interest;
- task difficulty;
- number of independent responses already received.

Bounties can carry explicit Beat/Bar rewards and expiry dates.

## 13. Progression and ranks

Recommended initial rank model:

1. Listener
2. Contributor
3. Curator
4. Trusted Curator
5. Scene Keeper

Rank advancement must require a combination of accepted contribution, Trust, diversity, account age and/or local participation. It must never be determined solely by Beat balance.

Illustrative gates only:

### Contributor

- first accepted contribution.

### Curator

- meaningful accepted contribution threshold;
- minimum acceptance/reliability threshold;
- contribution across multiple records/entities.

### Trusted Curator

- substantial contribution history;
- very high accepted/corroborated rate;
- minimum account age;
- low reversal rate;
- no unresolved abuse indicators;
- demonstrated local or domain expertise.

### Scene Keeper

- sustained high-quality contribution over a long period;
- broad positive impact on a local scene;
- exceptional Trust;
- manual/community recognition may be part of the gate.

Exact thresholds must be configuration rather than hard-coded product rules.

## 14. Capability unlocks

Ranks should matter because they unlock useful capabilities, not because they merely decorate profiles.

Possible capability progression:

- suggest corrections;
- respond to Backline Bounties;
- validate low-risk claims;
- resolve duplicate candidates;
- immediately project selected low-risk predicates;
- immediately mark a cancellation where authority threshold is met;
- access richer local quality dashboards;
- create local collections/guides;
- nominate new watched sources;
- participate in future community governance mechanisms.

All elevated capabilities remain predicate-specific and bounded by canonical API/Backline policy.

## 15. Profiles and community UX

Contributor profile should be simple and legible, for example:

`Jane`  
`Trusted Curator`  
`12 Songs · 7 Bars`  
`99.2% accepted/corroborated`  
`Macclesfield · Bollington · Poynton`  
`Member since 2026`

Avoid exposing internal anti-fraud scores or exact authority formulas.

Profile can include:

- rank;
- musical contribution total;
- accepted contributions;
- scene(s);
- recent meaningful contributions;
- milestone Songs;
- optional local leaderboard position;
- public recognition badges where genuinely meaningful.

## 16. Leaderboards

Do not create a permanent global lifetime leaderboard as the primary competitive mechanic. It rewards early obsessive volume and discourages later entrants.

Prefer:

- local scene leaderboards;
- monthly/seasonal windows;
- category-specific recognition;
- quality gates before eligibility;
- minimum Trust threshold;
- contribution diversity requirements.

Examples:

- Manchester Scene Keepers - August
- Most useful venue discoveries this month
- Gig verification contributors this week

Leaderboards must exclude suspicious/pending/reversed contributions.

## 17. Anti-gaming and abuse controls

Rhythm is explicitly designed on the assumption that any reward with visible status will eventually be gamed.

Required controls:

1. no full reward for unverified submission;
2. duplicate information earns zero or near-zero reward;
3. repeated edits to the same field do not create repeated rewards;
4. diminishing returns for repetitive low-value action classes;
5. related/reciprocal accounts cannot repeatedly validate one another without independence discounting;
6. owner/self contributions are treated differently from independent verification;
7. velocity and anomaly detection;
8. device/account/network abuse signals where legally and technically appropriate;
9. minimum account age/Trust for high-impact validations;
10. random audit of high-value contributions;
11. reversible Trust;
12. reward adjustments rather than destructive ledger editing;
13. rate limits and per-action settlement limits;
14. no direct Beat transfer between users;
15. no purchasing Beats;
16. no cash redemption;
17. configurable manual hold/review in Godmode;
18. transparent user-facing explanation when a contribution remains pending or earns no reward.

## 18. Provenance and auditability

Never implement Rhythm as `user.beats = 1234` alone.

The source of truth is an append-oriented contribution/reward ledger.

Minimum logical record:

`actor -> action -> subject/entity -> claim/predicate -> evidence -> timestamp -> validation -> reward decision -> trust impact -> projection decision`

Balances and profile totals are projections derived from the ledger and can be cached for performance.

This is strategically important because future BNDY decisions may need to answer who genuinely contributed, what they contributed, whether it proved reliable and over what period.

## 19. Suggested data model

Exact physical storage should follow the established BNDY/Backline DynamoDB patterns and avoid unnecessary new infrastructure. Logical entities are:

### Contribution

- contributionId
- actorId
- actorRole
- entityType
- entityId/sourceIdentity
- actionType
- predicate(s)
- submittedValue
- previousValue where applicable
- evidenceRefs
- geography/context
- submittedAt
- status
- validationState
- validationRefs
- backlineObservationId/claimIds
- projectionDecisionId
- risk flags

### RewardLedgerEntry

- ledgerEntryId
- contributionId
- actorId
- rewardSubunits
- rewardReason
- rewardRuleVersion
- state: provisional/settled/adjustment/reversed
- createdAt
- settlesAt
- relatedLedgerEntryId where adjustment

### TrustObservation

- trustObservationId
- actorId
- contributionId
- dimension
- geography
- entityType/predicate
- outcome
- weight
- source of validation
- model/rule version
- createdAt

### TrustProjection

Derived/cacheable:

- actorId
- globalTrustBand/value
- scene trust projections
- entity/predicate trust projections
- accepted count
- reversal count
- lastCalculatedAt
- policyVersion

### Bounty

- bountyId
- originatingObservation/claim/conflict
- question/task type
- target entity/geography
- eligibility policy
- reward offer
- status
- expiry
- response count
- resolution state

### ProgressionProjection

- actorId
- total settled reward subunits
- displayed Beats/Bars/Songs
- rank
- milestone IDs
- current local leaderboard eligibility

## 20. API and service design

### Canonical API responsibilities

The canonical backend remains the authority for public BNDY entity mutation and authentication/authorisation.

Potential endpoints/capabilities:

- submit contribution;
- list own contributions;
- get Rhythm profile/progression;
- list eligible Bounties;
- respond to Bounty;
- list public curator profile;
- retrieve reward history;
- retrieve local leaderboard;
- Godmode review/hold/reject/accept contribution;
- Godmode inspect Trust explanation;
- Godmode configure reward/action policies.

### Backline responsibilities

- convert contributions to evidence/claims;
- calculate contextual authority inputs;
- seek corroboration;
- identify uncertainty suitable for Bounties;
- make/record projection decisions;
- emit validation outcomes;
- trigger reward settlement and Trust observations;
- maintain explainable provenance.

### App responsibilities

- lightweight contribution UX;
- reward feedback;
- profile/progression display;
- Bounty inbox;
- local scene recognition;
- no exposure of sensitive anti-abuse internals.

### Backstage/Godmode responsibilities

- inspect contributions and evidence;
- review held contributions;
- inspect reward ledger;
- inspect Trust dimensions and explanations;
- manage rank/capability policies;
- manage reward rules;
- investigate abuse/collusion;
- inspect Bounty lifecycle;
- make auditable manual adjustments.

## 21. Event-driven workflow

Recommended logical event flow:

1. user submits contribution;
2. canonical API authenticates and performs basic validation;
3. contribution record is durably written;
4. Backline receives contribution event;
5. Backline creates/links Observation and Claims;
6. policy calculates contributor authority and evidence confidence;
7. contribution is accepted, held or rejected;
8. safe canonical projection occurs where threshold permits;
9. validation event is emitted;
10. Reward service settles configured reward;
11. Trust service records outcome;
12. profile/progression projections update;
13. user receives in-product result.

The design should be idempotent at every stage. Replayed events must not duplicate rewards or Trust observations.

## 22. Reward rule configuration

Reward values and gates must be versioned configuration.

A rule should be able to specify:

- action type;
- base reward;
- maximum reward;
- settlement criteria;
- whether provisional reward is shown;
- minimum evidence quality;
- diminishing-return policy;
- self/owner multiplier;
- duplicate/no-information behaviour;
- geography scarcity multiplier bounds;
- conflict-resolution multiplier bounds;
- daily/weekly settlement caps where required;
- active dates;
- rule version.

Historical ledger entries retain the rule version that produced them.

## 23. Commercial evolution

### 23.1 Phase one: Beats have no monetary value

Launch language should explicitly state:

**Beats recognise contribution to BNDY. They cannot be purchased, transferred or exchanged for cash and currently have no monetary value.**

Possible non-cash benefits can include:

- feature access;
- curator tools;
- profile recognition;
- early-access programmes;
- local community events;
- BNDY merchandise;
- selected Pro features;
- limited promotional benefits.

### 23.2 Future BNDY Credits

If BNDY needs a commercial stored-value/usage mechanism for venues, brewery groups or other businesses, create **Credits** as a separate product concept.

Potential uses:

- booking/service fees;
- promotional campaigns;
- enhanced discovery tools;
- artist outreach;
- Backline-powered commercial services;
- other BNDY paid features.

Do not make ordinary Beats directly purchasable or transferable. This prevents money from purchasing Trust and reduces incentives to farm the community ledger.

BNDY may choose to grant promotional Credits as a benefit to high-quality contributors, but this should be an explicit benefit programme rather than a permanent exchange rate such as `1 Beat = 1p`.

### 23.3 Venue and brewery booking economy

A future BNDY booking platform could allow venue groups or breweries to pre-fund a BNDY account/credit balance and use BNDY to book and pay artists. That commercial settlement system should use conventional regulated payment rails and a separate accounting model. Rhythm can influence eligibility, reputation or benefits but should not itself become the payment rail.

## 24. Community ownership option

BNDY may later decide that people who materially helped build and maintain the network should participate in its long-term success.

The safest product architecture is to preserve evidence now without promising conversion.

A future **Community Ownership Pool** could be separately constituted and use criteria such as:

- verified contribution history;
- Trust;
- longevity;
- scene-building impact;
- governance participation;
- diversity of contribution;
- other eligibility criteria defined at that future date.

Beats could be one input into eligibility because the ledger demonstrates contribution, but there should be no present promise that a Beat converts into a share, token, cash amount or ownership percentage.

Any ownership programme requires dedicated UK legal, tax, securities and corporate-structure advice before launch.

## 25. Crypto/tokenisation assessment

Blockchain is not required to achieve any MVP objective. BNDY already controls authenticated identities, evidence, claims, canonical projection and an auditable AWS data layer. An internal append-oriented ledger provides the required provenance with dramatically less complexity.

Potential future reasons to revisit tokenisation might include genuinely decentralised governance, independently transferable economic rights, external ecosystem interoperability or a deliberate community-owned protocol model.

Reasons not to tokenise now:

- no current decentralisation requirement;
- additional regulatory analysis;
- wallet/key-management UX;
- fraud and speculative behaviour;
- exchange-rate expectations;
- accounting/tax complexity;
- creates financial incentive to attack the contribution system;
- undermines the simple community meaning of Beats;
- risks confusing Trust with wealth.

Decision: **do not implement Beats on-chain for MVP. Preserve an auditable internal ledger and revisit only against a concrete future business requirement.**

## 26. Privacy, safety and moderation

- Public profiles should not reveal precise home location.
- Scene expertise should use broad areas/towns/postcode areas rather than private coordinates.
- Internal fraud signals are not public.
- Users need an appeal route for material moderation/reward decisions.
- Manual reward/Trust adjustments require actor, reason and timestamp.
- Deleting a user account must follow BNDY privacy policy while retaining only provenance that BNDY is legally entitled/required to retain, with appropriate pseudonymisation where necessary.

## 27. Metrics

### North-star quality metrics

- percentage of human contributions accepted/corroborated;
- reduction in unresolved Backline conflicts;
- time from uncertainty to resolution;
- percentage of target geography with recent human/source verification;
- cancellation correction latency;
- duplicate resolution rate.

### Engagement metrics

- weekly active contributors;
- Bounty response rate;
- contributors reaching Curator/Trusted Curator;
- 30/90-day contributor retention;
- contributions per active scene;
- distribution of contribution across users to detect over-concentration.

### Abuse metrics

- rejected contribution rate;
- reward reversal rate;
- suspected reciprocal validation clusters;
- duplicate/no-information submission rate;
- manual review volume;
- false-positive abuse holds.

## 28. MVP scope

### In scope

- durable Contribution records;
- append-oriented Reward Ledger;
- Beat/Bar/Song display projection;
- initial configurable action/reward catalogue;
- accepted/pending/rejected lifecycle;
- basic Trust projection;
- geographic Scene Trust foundation;
- rank model;
- contribution history;
- curator profile progression;
- Backline human claims integration;
- initial Backline Bounties;
- Godmode contribution/reward inspection;
- basic anti-farming controls;
- local/monthly recognition;
- explicit non-monetary terms.

### Out of scope for MVP

- cryptocurrency;
- blockchain;
- NFTs;
- transferable Beats;
- buying Beats;
- cash redemption;
- guaranteed exchange rate;
- equity conversion;
- brewery/venue stored-value booking system;
- automated community share allocation;
- complex global leaderboards.

## 29. Delivery architecture and repository ownership

Use existing live repositories rather than creating a new Rhythm repository.

### `flowency-live/bndy-serverless-api`

Primary ownership of authenticated contribution APIs, curator-facing reads, authorisation and canonical write boundaries.

### `flowency-live/bndy-enrichment`

Primary ownership of Backline contribution interpretation, human claims, contextual authority, validation/corroboration, Bounty generation and projection decisions.

### `flowency-live/bndy-app`

Primary ownership of contributor/curator UX, reward feedback, profiles, Bounty inbox and scene recognition.

### `flowency-live/bndy-backstage`

Primary ownership of Godmode review, Trust/reward inspection, abuse investigation and policy administration.

### `flowency-live/bndy-website`

Product documentation, public explanation/terms and workboard initiative tracking.

No separate crypto, ledger or gamification service should be created for MVP unless scale/ownership boundaries later justify it.

## 30. Implementation plan

### Phase RHY-00: architecture and policy contract

**Goal:** freeze semantics before UI work.

- define contribution action taxonomy;
- define reward subunit and Beat/Bar/Song display conversion;
- define reward lifecycle;
- define Trust dimensions and initial bands;
- define local Scene Trust geography model;
- define relationship to existing curator permissions;
- define owner/self-contribution policy;
- define contribution -> Backline Claim mapping;
- define MVP abuse rules;
- define user-facing Beats terms;
- write ADR confirming Beats are internal/non-transferable/non-monetary.

**Exit criteria:** schemas, lifecycle and authority boundaries reviewed across API, Enrichment, App and Backstage.

### Phase RHY-01: contribution ledger foundation

**Goal:** every eligible human action becomes durable provenance.

- implement Contribution persistence using established AWS/DynamoDB patterns;
- implement idempotency keys;
- implement append-oriented RewardLedgerEntry;
- implement reward projection/balance calculation;
- add API to retrieve own contribution/reward history;
- instrument existing curator actions to emit contributions;
- backfill only where historical provenance is sufficiently reliable; do not fabricate legacy rewards.

**Exit criteria:** a curator edit can be traced from authenticated actor to contribution to reward decision without a mutable counter being the authority.

### Phase RHY-02: Backline human claims

**Goal:** curator assertions participate in Backline truth decisions.

- map contributions into Backline Observations/Claims;
- attach actor provenance and scene context;
- introduce human-source authority adapter;
- apply existing owner protection and predicate-specific projection policy;
- record projection decision against contribution;
- emit accepted/rejected/pending validation outcome;
- expose human claims in Backline Explorer.

**Exit criteria:** a curator confirmation can change Backline confidence explainably and can be inspected end-to-end in Godmode.

### Phase RHY-03: reward settlement

**Goal:** reward value rather than clicks.

- implement versioned reward rules;
- settle rewards only from accepted validation events;
- support provisional UI state without prematurely settling balance;
- implement duplicate/no-information zero reward;
- implement adjustment/reversal ledger entries;
- implement repetitive-action diminishing returns;
- expose reward explanation to user and Godmode.

**Exit criteria:** replaying a contribution/validation event cannot duplicate rewards and every displayed total reconciles to ledger entries.

### Phase RHY-04: Trust v1

**Goal:** contribution quality controls authority.

- implement TrustObservation records;
- calculate global Trust projection;
- calculate initial geographic Scene Trust;
- track accepted/rejected/reversed outcomes;
- implement minimum Trust gates for elevated actions;
- add policy versioning;
- expose explainable Trust summary in Godmode;
- keep fraud internals private.

**Exit criteria:** two contributors making the same claim can carry different contextual Backline authority for explainable reasons.

### Phase RHY-05: ranks and contributor UX

**Goal:** make contribution rewarding and understandable.

- implement Listener/Contributor/Curator/Trusted Curator/Scene Keeper projection;
- build Rhythm profile card;
- show Beats/Bars/Songs;
- show contribution history and pending state;
- implement reward toast/result feedback;
- show local scene expertise at safe granularity;
- create milestone UX;
- add local/monthly recognition view.

**Exit criteria:** users understand what they earned, why it is pending/settled and what their rank means without needing documentation.

### Phase RHY-06: Backline Bounties

**Goal:** direct human effort to Backline's highest-value uncertainty.

- define Bounty task types;
- create Bounties from unresolved/conflicted claims;
- implement eligibility matching by geography/Trust/task type;
- expose Bounty inbox in App;
- allow evidence-backed response;
- resolve Bounty through normal contribution/claim path;
- settle configured Bounty reward;
- prevent repeated/collusive validation;
- expose lifecycle in Explorer/Godmode.

**Exit criteria:** Backline can identify a real uncertainty, ask appropriate local humans and resolve it into an auditable canonical decision.

### Phase RHY-07: anti-abuse hardening

**Goal:** prove the system cannot be trivially farmed.

- velocity limits;
- duplicate contribution fingerprinting;
- reciprocal-validation detection;
- repetitive-action diminishing returns;
- self/owner relationship rules;
- suspicious cluster review queue;
- manual holds;
- random audit sampling;
- reward settlement caps where needed;
- abuse dashboards and alerts;
- red-team farming scenarios.

**Exit criteria:** documented farming scenarios either fail to earn settled rewards or trigger appropriate review/Trust impact.

### Phase RHY-08: production pilot

**Goal:** test behaviour before broad launch.

- recruit a small number of existing trusted curators across several scenes;
- shadow-calculate rewards before exposing them;
- compare Trust weighting against known outcomes;
- test Bounties against genuine Backline conflicts;
- tune reward catalogue;
- tune rank thresholds;
- measure contributor comprehension;
- confirm no unexpected owner-authority regressions;
- production smoke and rollback plan.

**Exit criteria:** pilot demonstrates improved data resolution and healthy behaviour without significant farming or curator confusion.

### Phase RHY-09: public launch

- enable Rhythm profiles;
- publish plain-English Beats terms;
- enable local recognition;
- enable Bounties to eligible cohorts;
- monitor abuse and reward economics weekly;
- retain feature flags for reward classes/ranks/Bounties.

## 31. Future implementation phases

### RHY-10: richer information-value rewards

Use Backline graph state to calculate bounded reward modifiers based on genuine information gain and conflict resolution rather than only action type.

### RHY-11: benefits programme

Introduce non-cash benefits for trusted contributors without making Beats transferable currency.

### RHY-12: commercial Credits

Only when BNDY has a concrete commercial use case, design Credits, payment/accounting treatment and venue/group funding separately from Beats.

### RHY-13: community ownership discovery

If BNDY chooses community ownership, commission legal/tax/corporate design for a separate Community Ownership Pool. Use the historical contribution ledger as evidence, not as a pre-promised conversion contract.

### RHY-14: tokenisation decision gate

Revisit blockchain only if a future requirement genuinely needs decentralised ownership, external transferability or protocol interoperability. Default decision remains off-chain.

## 32. Acceptance criteria for the initiative

Rhythm is successful when:

1. every rewarded action has durable actor/action/evidence/validation provenance;
2. users cannot buy or transfer Trust;
3. Beat totals reconcile exactly to ledger events;
4. duplicate/replayed events do not duplicate rewards;
5. Backline can weight human claims using contextual Trust;
6. local trusted humans can resolve uncertainty more effectively than undifferentiated crowdsourcing;
7. owner authority remains protected;
8. common farming strategies are ineffective;
9. contributors can understand their progress in musical language;
10. BNDY retains the option to recognise early contributors commercially later without having promised money, crypto or equity today.

## 33. Key product decisions

**Decision 1:** Keep the name **Beats** for contribution units.  
**Decision 2:** Use Bars and Songs as larger progression language.  
**Decision 3:** Separate **Beats** from **Trust**.  
**Decision 4:** Trust affects Backline authority; Beat volume alone does not.  
**Decision 5:** Human curator assertions enter the Backline evidence/claims architecture.  
**Decision 6:** Backline Bounties are a first-class part of the product.  
**Decision 7:** Store an immutable/append-oriented contribution and reward ledger.  
**Decision 8:** Do not launch Beats as crypto, money or transferable value.  
**Decision 9:** If commercial stored value is needed later, introduce separate **Credits**.  
**Decision 10:** Do not promise Beat-to-equity conversion. Preserve contribution evidence so a future Community Ownership Pool can recognise genuine contributors if BNDY chooses that path.  
**Decision 11:** Do not create a new Rhythm repository for MVP. Implement through the existing App, canonical API, Backline Enrichment and Backstage architecture.

## 34. Immediate next actions

1. Add BNDY Rhythm as a dedicated workboard initiative/swimlane.
2. Treat this PRD as the initiative baseline.
3. Complete RHY-00 architecture/policy contract before implementing visible points UI.
4. Instrument existing curator mutations into the Contribution ledger before awarding public Beats.
5. Integrate human contributions with Backline Claims and authority before implementing high-impact capability unlocks.
6. Pilot Bounties against real Backline uncertainty as soon as Trust v1 is available.
7. Keep all monetary, crypto and ownership mechanisms behind explicit future decision gates.