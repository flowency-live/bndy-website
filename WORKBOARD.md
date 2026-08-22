# BNDY Workboard

`public/workboard.json` is the shared, machine-readable source for `www.bndy.co.uk/workboard`.

## Agent update contract

1. Reuse an existing lane ID whenever work belongs to an existing stream. Do not create a parallel lane just because a new agent/session starts.
2. Move cards between `done`, `now` and `next` rather than duplicating them.
3. Update `updatedAt` and `updatedBy` on every meaningful change.
4. Every lane must declare `deliveryState`: `live`, `building`, `planned`, `legacy` or `decommissioned`.
5. Set `targetState: true` when the lane describes a strategic future capability or architecture that is not yet fully the production path. This is independent of `deliveryState`, so a target-state capability can be actively `building`.
6. Add a repository to `activityRepos` only when live GitHub commit activity is useful on the board.
7. Keep repository status explicit: `production`, `active`, `support`, `legacy`, `decommissioned` or `audit`.
8. Add `evidence` URLs to cards when a PR, commit, test result or deployment proves a claim.
9. Never mark something `done` purely because code exists. Production/deployment claims need production evidence.
10. The architectural source of truth is: transport -> Capture -> Enrichment/evidence/claims -> projection -> canonical BNDY APIs.
11. Known reliable venue listing websites belong in the Source Registry as scheduled venue sources. Do not build a parallel venue-worker database or direct writer.
12. `bndy-frontstage` is decommissioned. Do not add new work there.
13. `bndy-signals` is legacy. New intelligence work belongs in `bndy-enrichment`; migrate useful concepts rather than extending the old runtime.

The JSON schema is published at `/workboard.schema.json`.
