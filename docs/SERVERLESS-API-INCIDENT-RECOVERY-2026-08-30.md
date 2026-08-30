# BNDY serverless API incident and recovery

## Executive summary

On 29 August 2026, a direct `sam deploy` to the production `bndy-serverless-api` CloudFormation stack submitted a template that omitted recently added Claim and ownership resources. CloudFormation consequently deleted five Lambda functions, their related permissions and routes, and detached four retained DynamoDB tables from stack ownership.

The tables were retained by policy and no table data loss was reported. The stack was recovered in controlled phases:

1. Import the four retained DynamoDB tables back into CloudFormation.
2. Restore the five deleted functions, 22 routes and permissions, and the Claim stream SSM parameter with a bounded surgical change set.
3. Separately merge and deploy the five `/api/users/*` and `/api/uploads/*` aliases required by the current frontend.
4. Harden the deployment workflow so a merge to `master` cannot deploy automatically.

The final stack status is `UPDATE_COMPLETE`. All four imported tables are `IN_SYNC`. The API exposes 270 routes. The five authentication aliases invoke the intended Lambdas and return the expected unauthenticated `401`, with no `404`, `500` or CloudWatch runtime errors.

The production incident is closed. Authenticated product acceptance remains separate application work.

## Incident record

| Item | Value |
|---|---|
| AWS account | `771551874768` |
| Region | `eu-west-2` |
| Stack | `bndy-serverless-api` |
| Canonical recovery source | `d42352f3c83edf671f4e7ca08f3b141f17d80dd8` |
| Incident deployment observed | 29 August 2026, approximately 21:21 UTC |
| Core restoration completed | 30 August 2026, 00:02:41 UTC |
| Authentication alias deployment completed | 30 August 2026, 13:51:28 UTC |
| Final stack state | `UPDATE_COMPLETE` |
| Final API route count | 270 |

## What happened

A backend authentication repair was being prepared after two application-facing problems had been identified:

- several stale frontend modules lost cross-origin authentication cookies and returned `401`;
- the deployed API did not expose the `/api/users/*` and `/api/uploads/*` aliases used by the current frontend, producing `404` responses.

During that work, the local repository was fast-forwarded across 95 upstream commits containing the Claim and ownership infrastructure. A direct `sam deploy` was then run from the local environment. The submitted transformed template omitted resources that were present in the canonical source template and already existed in the production stack.

CloudFormation treated those omissions as intentional removals.

### Deleted functions

- `ClaimsFunction`
- `EntityMembershipsFunction`
- `EntityInvitesFunction`
- `JoinAnalyticsFunction`
- `OwnershipFunction`

Their generated Lambda permissions, API integrations and routes were also removed.

### Retained but detached tables

- `EntityClaimsTable` -> `bndy-entity-claims`
- `EntityMembershipsTable` -> `bndy-entity-memberships`
- `EntityInvitesTable` -> `bndy-entity-invites`
- `JoinAnalyticsTable` -> `bndy-join-analytics`

CloudFormation emitted `DELETE_SKIPPED` for the tables because they had retention policies. The physical tables and their data remained, but CloudFormation no longer owned them. Subsequent normal updates were blocked by `AWS::EarlyValidation::ResourceExistenceCheck` because the desired template attempted to create physical tables that already existed.

## Root cause

### Confirmed technical cause

The production update was created from a transformed template that did not contain all resources present in the deployed stack. CloudFormation therefore performed valid deletion actions against an invalid deployment input.

The local audit attributes the incomplete transformed template to stale `.aws-sam/build` state. The available CloudFormation evidence proves the omission and resulting deletions, but does not by itself prove the internal SAM cache mechanism.

### Confirmed control failure

The deployment was executed without first creating and reviewing a bounded CloudFormation change set. A change-set review would have exposed the function, permission and route removals before execution.

### Contributing factors

- A large upstream merge introduced substantial infrastructure changes immediately before deployment.
- The source template, transformed build template and deployed template were not compared.
- The deployment command allowed CloudFormation to execute the generated change set automatically.
- The same repository contained one-off deployment workflows and overlapping infrastructure responsibilities.
- Runtime drift existed between the repository and production.
- The original authentication fix and the infrastructure recovery became coupled.

## Production impact

Read-only checks confirmed that Claim and ownership API routes returned API Gateway `404 Not Found` after the accidental deployment. Affected capabilities included:

- Claim creation and Claimant status
- managed-entity membership
- entity invitations
- Join analytics
- ownership transfer and relinquishment routes

The four retained DynamoDB tables remained available and no data loss was reported.

Capture, Enrichment, Backline, Meta, Chatzone, Amplify, CDK and unrelated AWS stacks were not changed by the recovery work.

## Recovery

### Phase 1: import retained tables

An intermediate template was constructed from the deployed CloudFormation template and added exactly the four retained DynamoDB resources. An `IMPORT` change set was reviewed before execution.

The import completed at `2026-08-29T23:05:49.773Z`.

| Logical ID | Physical table | Result |
|---|---|---|
| `EntityClaimsTable` | `bndy-entity-claims` | `IN_SYNC` |
| `EntityMembershipsTable` | `bndy-entity-memberships` | `IN_SYNC` |
| `EntityInvitesTable` | `bndy-entity-invites` | `IN_SYNC` |
| `JoinAnalyticsTable` | `bndy-join-analytics` | `IN_SYNC` |

All drift checks returned zero property differences.

Import change set:

`arn:aws:cloudformation:eu-west-2:771551874768:changeSet/recovery-import-tables-d42352f-20260829-225318/3fb4021f-c510-4cbc-a80e-1dcf9e96984e`

### Phase 2: surgical Claim and ownership restoration

A recovery template was prepared from canonical commit `d42352f` while preserving the deployed definitions and S3 code references for unrelated functions.

The reviewed change set added:

- five deleted Lambda functions;
- one SSM parameter, `/bndy/claims/stream-arn`;
- 22 Lambda permissions and corresponding routes.

It modified only:

- `ArtistsFunction`
- `AuthFunction`
- `EventsFunction`
- `VenuesFunction`
- `BndyHttpApi`

There were no DynamoDB, IAM or output changes, no replacements and no removals.

Change set:

`arn:aws:cloudformation:eu-west-2:771551874768:changeSet/recovery-surgical-d42352f-20260829t234929z/fca7ee7c-f00e-4a83-af31-ac5190a9ec9d`

The change set was executed exactly once. It completed with zero failure or rollback events and restored the stack to `UPDATE_COMPLETE` at `2026-08-30T00:02:41.219Z`.

Post-execution verification confirmed:

- all five functions restored;
- all 22 routes and integrations restored;
- nine affected functions running on `nodejs22.x`;
- the 18 protected Lambda definitions and code references unchanged;
- 265 routes and 265 integrations;
- correct Claim stream ARN in SSM;
- all four tables still `IN_SYNC`;
- IAM resources and seven stack outputs unchanged.

### Phase 3: authentication aliases

The frontend-compatible aliases and path normalisation were prepared separately and published through [bndy-serverless-api PR #68](https://github.com/flowency-live/bndy-serverless-api/pull/68).

Merge commit:

`ca641b99ea0c2941daacccc9172c6a0cfc14df3b`

The change added:

- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/favourites`
- `POST /api/users/favourites/toggle`
- `POST /api/uploads/presigned-url`

Both legacy and `/api` prefixes enter identical handler logic.

CI passed:

- 67 Users tests;
- 10 Uploads tests;
- clean, non-cached SAM build of all 27 functions;
- deployment validation under Node.js 22.

A separate surgical CloudFormation change set updated only `UsersFunction`, `UploadsFunction`, `BndyHttpApi` and five generated Lambda permissions. It had no removals or replacements.

Change set:

`arn:aws:cloudformation:eu-west-2:771551874768:changeSet/surgical-auth-fix-20260830-144534/10cb335d-c9c3-4b63-8f90-3c1de9f420d6`

Execution completed at `2026-08-30T13:51:28Z`.

## Final verification

| Check | Result |
|---|---|
| Stack status | `UPDATE_COMPLETE` |
| API routes | 270 |
| UsersFunction | `nodejs22.x`, physical ID unchanged |
| UploadsFunction | `nodejs22.x`, physical ID unchanged |
| Other 25 functions | unchanged |
| Imported tables | intact and CloudFormation-owned |
| Stack outputs | seven values unchanged |
| CloudWatch | no initialisation or runtime errors |

### Unauthenticated smoke tests

| Route | Result |
|---|---|
| `GET /api/users/profile` | `401 {"error":"Not authenticated"}` |
| `PUT /api/users/profile` | `401 {"error":"Not authenticated"}` |
| `GET /api/users/favourites` | `401 {"error":"Not authenticated"}` |
| `POST /api/users/favourites/toggle` | `401 {"error":"Not authenticated"}` |
| `POST /api/uploads/presigned-url` | `401 {"error":"Not authenticated"}` |

These responses prove that API Gateway reached the intended Lambdas and that the aliases no longer fail as `404` or `500`. They do not replace authenticated product acceptance.

## Deployment safeguards now in place

The serverless deployment workflow no longer deploys on merge or normal push.

Deployment requires all three conditions:

1. a manual `workflow_dispatch`;
2. `confirm_deploy` set exactly to `deploy`;
3. repository variable `BNDY_SERVERLESS_DEPLOY_ENABLED` set to `true`.

The cross-repository Capture acceptance deployment is explicitly disabled pending redesign. Merging application or validation work cannot trigger it.

## Remaining actions

### Product acceptance

- Run a signed-in profile read/update check.
- Test favourites read/toggle.
- Test authenticated presigned upload.
- Complete the Claim and multi-entity acceptance matrix.

### Infrastructure hardening

- Move GitHub AWS authentication from long-lived access keys to OIDC.
- Define one authoritative infrastructure owner for each SAM and CDK resource.
- Remove or archive obsolete one-off deployment workflows.
- Add a required deployment gate that compares proposed removals, replacements, IAM, tables, routes and outputs.
- Require `sam build --no-cached` for deployment artefacts.
- Keep automatic deployment disabled until those controls are proven.
- Resolve the `festivals-lambda` package-lock mismatch.
- Plan the remaining Node.js 20 and AWS SDK v2 migrations separately.

### Paused workstreams

Until infrastructure ownership is reconciled:

- do not merge or deploy `bndy-enrichment` PR #122;
- keep Capture, Enrichment and Backline broad SAM/CDK deployment work paused;
- keep the frozen Capture acceptance job disabled.

## Closure decision

The infrastructure incident and authentication alias repair are closed because:

- the stack is stable;
- all detached tables are owned and in sync;
- deleted functions and routes are restored;
- aliases invoke successfully;
- protected resources and outputs are unchanged;
- no runtime errors were observed.

Closure does not assert that every authenticated Claim, ownership or upload journey has passed human acceptance. Those checks remain on the product workboard.

## Evidence sources

This report consolidates the following local audit artefacts produced during the incident:

- `IMPORT_CHANGE_SET_REVIEW.md`
- `bndy-serverless-api-restoration-audit.md`
- `surgical-restoration-report.md`
- `final-execution-report.md`
- the final authentication alias execution and smoke-test report

GitHub evidence:

- [bndy-serverless-api PR #68](https://github.com/flowency-live/bndy-serverless-api/pull/68)
- [merge commit ca641b9](https://github.com/flowency-live/bndy-serverless-api/commit/ca641b99ea0c2941daacccc9172c6a0cfc14df3b)
