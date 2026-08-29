# BNDY Workboard

`public/workboard.json` is the shared, machine-readable source for `www.bndy.co.uk/workboard`.

## Agent update contract

1. Reuse an existing lane ID whenever work belongs to an existing stream. Do not create a parallel lane just because a new agent/session starts.
2. `now` is active work. `next` is committed upcoming work. The top-level `backlog` is approved but unscheduled TODO work.
3. Rank the backlog globally. Rank `1` is the highest priority within the unscheduled backlog, not a commitment to build it next.
4. Keep backlog item IDs stable and ranks unique, contiguous and ordered from `1`.
5. Promote work by removing it from `backlog` and adding it to a lane's `next` or `now` array. Move cards between states rather than duplicating them.
6. Update `updatedAt` and `updatedBy` on every meaningful change.
7. Every lane must declare `deliveryState`: `live`, `building`, `planned`, `legacy` or `decommissioned`.
8. Set `targetState: true` when the lane describes a strategic future capability or architecture that is not yet fully the production path. This is independent of `deliveryState`, so a target-state capability can be actively `building`.
9. Add a repository to `activityRepos` only when live GitHub commit activity is useful on the board.
10. Keep repository status explicit: `production`, `active`, `support`, `legacy`, `decommissioned` or `audit`.
11. Add `evidence` URLs to cards when a PR, commit, test result or deployment proves a claim.
12. Never mark something `done` purely because code exists. Production/deployment claims need production evidence.
13. The architectural source of truth is: transport -> Capture -> Enrichment/evidence/claims -> projection -> canonical BNDY APIs.
14. Known reliable venue listing websites belong in the Source Registry as scheduled venue sources. Do not build a parallel venue-worker database or direct writer.
15. `bndy-frontstage` is decommissioned. Do not add new work there.
16. `bndy-signals` is legacy. New intelligence work belongs in `bndy-enrichment`; migrate useful concepts rather than extending the old runtime.

The JSON schema is published at `/workboard.schema.json`.
