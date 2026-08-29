# Backline Trust Layer technical status

Status date: 29 August 2026

## Executive status

Backline is already a working shadow intelligence layer inside `flowency-live/bndy-enrichment`. It is not a proposed separate service and it is not a replacement canonical database.

The durable evidence, Observation, Claim, resolution, authority and projection foundations are built. The existing BNDY corpus has been baselined into that model, four source families are operating in shadow, Godmode exposes read-only operational state, and the projection engine preserves the canonical API boundary.

The current commissioning gate is safe entity enrichment. The system can search and reason, but facts may not enter Backline merely because Gemini states them or returns plausible URLs. Each admitted fact must be tied to authoritative provider citation metadata on the exact output segment that contains the fact.

The first evidence-first Interactions proof has now passed that transport boundary on one Venue case, Whittles Oldham. It is still not a provider qualification.

## Non-negotiable trust boundaries

- Canonical BNDY APIs remain the only product write authority.
- Backline stores evidence and claims; it does not silently overwrite canonical Artists, Venues, Events or Festivals.
- Source evidence is immutable.
- Claims are atomised subject-predicate-value assertions linked to their Observation and evidence.
- The graph is a read model, not a second authority.
- Owner-managed facts are protected.
- Ambiguity is parked rather than guessed.
- Absence from an incremental source is not cancellation or deletion evidence.
- Provider qualification, provider activation, scheduling and canonical projection are separate approval gates.
- Every qualification workflow is shadow-only and reports `canonicalWrites: 0`.

## Runtime architecture

| Layer | Implementation | Responsibility |
| --- | --- | --- |
| Source registry and runner | `bndy-enrichment` AWS runtime | Defines sources, schedules, shadow state, authority class, acquisition mode and projection policy. |
| Immutable evidence | Existing S3 EvidenceBucket | Retains raw source material and public provider responses. |
| Knowledge substrate | Existing DynamoDB StateTable | Stores Observations, atomised Claims, source state, resolutions, tombstones, control records and read indexes. |
| Reconciliation | Candidate and resolution services | Connects source-native identities to canonical candidates without collapsing uncertainty. |
| Authority policy | Predicate-specific claim authority | Decides which evidence can influence which fact while preserving owner-managed data. |
| Projection | Strategic projection worker | Produces bounded canonical API actions, applies tombstones and protection rules, then verifies product read-back. |
| Read models | Graph reader, qualification summaries and metrics | Provides bounded operational views without scanning the full evidence corpus. |
| Operator surface | Backstage Godmode Backline Explorer | Shows source, Trust Loop, qualification and evidence state read-only. |

## What is built

### Durable data model

Backline has durable schemas and stores for:

- Sources and source execution state
- immutable Observations
- atomised Claims
- evidence references
- candidate identities and Resolutions
- contradictions and supersession
- tombstones
- authority assertions
- enrichment work and budget controls
- projection outcomes
- daily source metrics and bounded graph reads

The canonical BNDY baseline is represented in shadow as 15,288 logical entities and Observations, 518,131 Claims, 15,288 Resolutions and 15,288 immutable evidence objects, with preserved identifiers and zero recorded baseline errors.

### Source ingestion

| Source | Current state | Important policy |
| --- | --- | --- |
| Lemonrock | National bootstrap complete; low-cost BAU shadow deployed | Hourly new-gig and cancellation sweeps, daily health, monthly reconciliation, gig-led profile hydration, no canonical writes. |
| On The Case | Healthy live shadow reconciliation | Gig-led venue and artist fanout with explicit lineage and bounded dedupe. |
| KLMA | Healthy daily live shadow | Controlled community calendar, additive projection candidate, canonical writes currently disabled. |
| GigsNews | Healthy weekly live shadow | Incremental and append-only; disappearance is not cancellation evidence. |
| Scenic Eye | Implemented shadow/manual | Unscheduled pending source-specific operating decision. |
| Insangel | Reconnaissance only | Fixture-gated until reliable acquisition is proven. |
| Norfolk Gig Guide | Reconnaissance only | Gated on safe AWS reachability and captured fixtures. |

### Trust Loop and operator controls

The Trust Loop provides:

1. unresolved Artist and Venue candidates from live source evidence;
2. bounded qualification cohorts;
3. provider evidence bundles with measured searches, calls, tokens, time and estimated cost;
4. strict fact admission and rejection reasons;
5. human adjudication artefacts;
6. read-only qualification summaries in Godmode;
7. zero-write gates before any activation or projection discussion.

Human review is a commissioning and exception-control mechanism. It is not intended to make the Product Owner a daily reviewer. BAU should automatically accept only hard-passing facts, automatically park uncertainty, and escalate genuine conflicts plus a small quality sample.

## Enrichment qualification history

| Attempt | Result | Lesson |
| --- | --- | --- |
| Early grounded JSON captures | Plausible facts, but citation admission failed | A model URL is not provider evidence. |
| Repaired Interactions JSON path | Search completed, but strict output shape was unreliable | Schema parsing must retain exact failures and usage. |
| Split Google Programmable Search plus Gemini reasoning | All 20 cases stopped with Google 403 | Custom Search JSON API is unavailable to this project and closed to new customers. |
| Explicit-contract Interactions cohort | 20 calls, 43 searches, 67 facts proposed, zero `url_citation` annotations, $0.66234 | JSON-shaped output suppressed the provider citation annotations needed by Backline. Every fact was correctly quarantined. |
| GenerateContent grounding | Model returned plausible facts but performed zero searches and returned no `groundingMetadata` | Prompt instructions cannot force GenerateContent to use Google Search. The adapter failed closed. |
| Hardened GenerateContent retry | Same no-search behaviour and exact closed failure | Further prompt-only retries are not a sound architecture. |
| Interactions evidence-first plain text | One Whittles call, two searches, six citations, five admitted facts, $0.02963275 | Deterministic factual lines cause Interactions to return provider citation metadata that can be bound to facts. |

## Evidence-first Interactions adapter

Merged PR 114 introduced a separate inactive provider, `gemini-interactions-evidence-first-v1`.

### Request contract

- Gemini model: `gemini-3.6-flash`
- endpoint: Gemini Interactions API
- tool: Google Search grounding
- storage: disabled with `store: false`
- requested search budget: one or two non-empty queries
- model-call budget: one call per case
- output: one tab-delimited `IDENTITY` line followed by zero or more tab-delimited `FACT` lines
- no response-format schema, because the Interactions search-plus-schema combination previously failed before model execution

### Plain-text format

```text
IDENTITY<TAB>confidence<TAB>"identity reason"
FACT<TAB>"predicate"<TAB>"value" or boolean<TAB>confidence<TAB>"evidence statement"
```

Quoted fields are JSON-encoded so tabs, quotes and newlines remain deterministic. Any prose, heading, Markdown, unknown line, malformed value, unrequested predicate or unsafe URL fails or is quarantined.

### Admission rule

The model does not supply admissible evidence URLs. The adapter reads only provider `url_citation` annotations from the exact Interactions model-output text block.

For each parsed FACT line, the adapter:

1. records its exact character range;
2. identifies provider citation annotations bound to that segment;
3. accepts only safe HTTPS provider URLs;
4. rejects facts outside the requested predicate allow-list;
5. returns zero identity confidence if no facts survive;
6. retains the full provider response, rejected facts, exact ranges, usage and cost.

Unit coverage proves that a citation on the identity line cannot authorise a fact, a no-search response fails closed, prose cannot enter the contract, and cumulative citations cannot leak backwards into earlier facts.

## Whittles Oldham validation

The authorised one-shot validation completed successfully.

| Measure | Result |
| --- | ---: |
| Cases | 1 Venue |
| Gemini calls | 1 |
| Google searches | 2 |
| Provider citations | 6 |
| Admitted facts | 5 |
| Identity confidence | 0.99 |
| Input tokens | 812 |
| Output tokens | 273 |
| Duration | 14,252 ms |
| Estimated cost | $0.02963275 |
| Reserved maximum | $0.05 |
| Canonical writes | 0 |
| Schedule created | No |
| Provider activated | No |

The five fact values were:

- `hasAddress`: `57 Roscoe St, Oldham OL1 1EA`
- `hasLocation`: `Oldham, United Kingdom`
- `hasWebsiteUrl`: `https://whittlesoldham.com/`
- `hasOfficialUrl`: `https://whittlesoldham.com/`
- `officialPresenceAttempted`: `true`

This is the first positive proof that the current Gemini Interactions transport can provide machine-readable citations for Backline fact admission.

## The current stuck point

The project is no longer stuck on obtaining any citations. It is now stuck at the boundary between a successful one-case transport proof and a defensible provider qualification.

The live response exposed cumulative citation annotations. Each citation started at character offset zero and ended on a successive FACT line. The original generic overlap rule admitted the correct five facts but also attached later evidence to earlier facts. PR 116 changes the inactive adapter to bind a citation to the FACT line containing its end offset, preventing backwards evidence leakage. The code and 328-test suite are green, but the merge control requires explicit approval for that post-validation hardening.

There are also three evidence-quality questions that a single Venue case cannot answer:

1. Citation destination stability. The provider URLs are Google grounding redirect URLs. Before activation, Backline should safely resolve and preserve the public destination alongside the immutable provider URL and response.
2. Identity evidence. Fact citations exist, but cohort review must prove they belong to the exact Artist or Venue, especially for same-name acts and generic venue names.
3. Coverage and semantics. One Venue does not prove Artist genres, Artist type, act type, acoustic status, official-presence absence, or balanced cohort cost.

## Remaining work, in order

### 1. Merge citation-range hardening

Merge green PR 116 after explicit approval. This makes future admission use citation endpoints rather than broad overlap. No provider call is required.

### 2. Preserve resolved citation destinations

Add bounded, safe redirect resolution with:

- HTTPS-only destinations;
- redirect hop and timeout limits;
- SSRF-safe URL validation;
- immutable retention of both provider redirect and destination;
- failure closed when a destination cannot be captured safely.

This can be implemented and unit-tested without a provider call. A later live proof requires separate approval.

### 3. Define the full qualification contract

Reuse the existing 10 Artist and 10 Venue cohort and record, per case:

- exact identity outcome and reason;
- requested predicates;
- admitted and rejected facts;
- exact fact-to-citation mapping;
- public citation destinations;
- searches, calls, tokens, duration and cost;
- abstention quality;
- false matches and wrong official links;
- explicit no-official-presence outcomes.

The current hard gate remains zero false matches and at least 80 per cent requested-predicate coverage where the answer is knowable.

### 4. Run one separately approved 20-case qualification

The next live cohort run is not currently authorised. It needs an explicit case count, call count, requested search budget, reserved cost and zero-write boundary. The one-case result suggests a nominal 20-case model-plus-search estimate near $0.60, but the reservation should include headroom based on observed search autonomy and the earlier $0.66234 run.

### 5. Human adjudication and read-only publication

Render a review artefact, adjudicate all 20 identities and every admitted fact, publish the exact status read-only to Godmode, and record the result on the workboard.

### 6. Qualification decision

Only after adjudication can the provider be labelled qualified or failed. A qualified result still does not authorise scheduling or canonical writes.

### 7. Shadow BAU commissioning

If separately approved, connect the provider to the existing enrichment planner in shadow, enforce per-run and daily budgets, add kill switches and metrics, and sample results. Continue to park ambiguity automatically.

### 8. Controlled projection

Canonical projection remains a later, separate HITL gate. Start with a complete would-write report and an additive-only known-answer pilot. No destructive change, owner-managed overwrite or writer transfer should be possible.

## Evidence index

- Adapter PR: https://github.com/flowency-live/bndy-enrichment/pull/114
- One-case public response: https://github.com/flowency-live/bndy-enrichment/blob/main/ops/enrichment/gemini-interactions-evidence-first-whittles-oldham-unreviewed.json
- Result commit: https://github.com/flowency-live/bndy-enrichment/commit/937db16e1da5231ab76755cd824eca18a6b209ab
- Citation-range hardening PR: https://github.com/flowency-live/bndy-enrichment/pull/116
- Previous 20-case response: https://github.com/flowency-live/bndy-enrichment/blob/main/ops/enrichment/gemini-grounded-explicit-contract-20-case-unreviewed.json
- Previous 20-case review: https://github.com/flowency-live/bndy-enrichment/blob/main/ops/enrichment/gemini-grounded-explicit-contract-20-case-review.md
- Provider qualification policy: https://github.com/flowency-live/bndy-enrichment/blob/main/docs/ENRICHMENT-PROVIDER-QUALIFICATION.md
- Source ingestion blueprint: https://github.com/flowency-live/bndy-enrichment/blob/main/docs/BACKLINE-SOURCE-INGESTION-BLUEPRINT.md
- Godmode Backline Explorer: https://backstage.bndy.co.uk/godmode/enrichment
