# BNDY Workboard

`public/workboard.json` is the shared, machine-readable source for `www.bndy.co.uk/workboard`.

## Agent update contract

1. Reuse an existing lane ID whenever work belongs to an existing stream. Do not create a parallel lane just because a new agent/session starts.
2. Move cards between `done`, `now` and `next` rather than duplicating them.
3. Update `updatedAt` and `updatedBy` on every meaningful change.
4. Add a repository to `activityRepos` only when live GitHub commit activity is useful on the board.
5. Keep repository status explicit: `production`, `active`, `support`, `legacy`, `decommissioned` or `audit`.
6. Add `evidence` URLs to cards when a PR, commit, test result or deployment proves a claim.
7. Never mark something `done` purely because code exists. Production/deployment claims need production evidence.
8. The architectural source of truth is: transport -> Capture -> Enrichment/evidence/claims -> projection -> canonical BNDY APIs.
9. `bndy-frontstage` is decommissioned. Do not add new work there.
10. `bndy-signals` is legacy. New intelligence work belongs in `bndy-enrichment`; migrate useful concepts rather than extending the old runtime.

The JSON schema is published at `/workboard.schema.json`.
