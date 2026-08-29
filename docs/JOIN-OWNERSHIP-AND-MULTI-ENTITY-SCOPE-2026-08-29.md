# BNDY Add, Claim, Ownership and Multi-Entity Scope

**Status:** Product scope and implementation review  
**Date:** 29 August 2026  
**Owner:** Claim Journey Owner  
**Applies to:** `bndy-app`, `bndy-serverless-api`, `bndy-backstage`, `bndy-enrichment`, `bndy-website`

## 1. Decision summary

The current feature is called **Join bndy**, but it combines account registration, finding an entity, creating an entity, claiming an existing entity and adding further entities to an existing account.

That language stops making sense as soon as a signed-in person already manages an Artist or Venue.

The product model is now:

> **People join BNDY. Artists and Venues are found, added or claimed.**

The existing `/join` route may remain for compatibility, but its product language must become **Find or add an Artist or Venue**. A signed-in account can manage any number of Artists and Venues in different roles.

The account menu action must become **Add artist or venue**. It must not imply that an existing signed-in user is joining again.

## 2. Core product model

### 2.1 The person is the account

A BNDY user account represents a person. An Artist or Venue is an entity the person may own, administer or participate in.

Signing in proves the identity of the person. It does not, by itself, prove their authority over an Artist or Venue.

### 2.2 One account can manage multiple entities

The normal model must support examples such as:

- Owner of Artist A
- Member of Artist B
- Admin of Artist C
- Owner of Venue D
- Admin of Venue E

No flow may assume that a person can have only one Artist or Venue.

### 2.3 One accountable owner, multiple collaborators

The current canonical model has one accountable owner for an entity and permits additional relationships.

Artist roles:

- `owner`
- `admin`
- `member`

Venue roles:

- `owner`
- `admin`

Creating a genuinely new entity establishes the creator as its initial owner. Finding an existing entity starts a Claim for the appropriate relationship. It must never silently replace an existing owner.

Bandmates, managers and Venue staff use their own BNDY accounts. Password sharing is never part of the model.

## 3. User journeys

### 3.1 First-time person

1. The person opens BNDY and signs up or signs in.
2. They choose **Find or add an artist or venue**.
3. BNDY searches before offering creation.
4. If the entity exists, the person requests the correct relationship through a Claim.
5. If it is genuinely new, BNDY creates it and establishes the person as owner.

### 3.2 Existing account adding another entity

1. The signed-in person selects **Add artist or venue** from the account menu or Manage.
2. BNDY searches for the entity.
3. An existing entity enters the Claim journey.
4. A genuinely new entity enters the create journey.
5. The new relationship is added without disturbing any existing relationships.

### 3.3 Existing entity Claim

1. The person selects the matching Artist or Venue.
2. They state their relationship and requested role.
3. They provide evidence.
4. The Claim appears in Manage and Godmode.
5. Godmode may approve, reject or request more evidence.
6. Approval creates the relationship. Public ownership is untouched before approval.

### 3.4 Ownership conflict

If another person already owns the entity:

- the new request is marked as a conflict;
- BNDY shows that human review is required;
- approval cannot silently replace the established owner;
- transfer or dispute resolution is handled explicitly and audibly.

## 4. Route and copy requirements

### 4.1 Account menu

Current:

`Join as artist or venue`

Required:

`Add artist or venue`

`Manage artists & venues` remains the destination for existing relationships and pending Claims.

### 4.2 `/join`

The URL can remain `/join`, but the page must not tell an authenticated person they are joining again.

Required primary heading:

`Find an artist or venue`

Required supporting copy:

`Search for an artist or venue already on bndy, or add a genuinely new one.`

Required cards:

- `Find or add an artist`
- `Find or add a venue`

The page should explain the result, not the internal mechanism:

- Existing result: request access or a relationship
- No result: add a new entity

### 4.3 Context for authenticated users

When the person is signed in, `/join` should acknowledge the existing account:

`Add another artist or venue to your account.`

It does not need to enumerate current entities on this page. Manage remains the relationship overview.

### 4.4 Back navigation

`/join` currently has no back action. It must have a visible back control.

Behaviour:

- use browser history when a safe previous BNDY page exists;
- otherwise send an authenticated user to `/manage`;
- otherwise send a signed-out visitor to the normal BNDY home/discovery route.

Artist and Venue child flows already link back to `/join`; their label should become `Find artist or venue`, not `Join bndy`.

### 4.5 Manage empty and add states

Manage currently uses `Join as an artist` and `Join as a venue` in empty states. These must become:

- `Add an artist`
- `Add a venue`

Manage should always expose a clear **Add artist or venue** action, including when the person already manages several entities.

### 4.6 User-facing terminology sweep

The same language must be used anywhere the old phrase is exposed, including:

- the signed-in account menu
- the signed-out login-page call to action
- `/join` page headings, choices and browser metadata
- `/manage` empty states
- claimant and reviewer instructions

Internal route names, component names and analytics event identifiers may remain `join_*` where renaming them would add migration risk without changing the user experience.

## 5. Review of the six reported issues

### 5.1 “Join as an artist or venue” for an existing account

**Finding:** Confirmed product-language defect.

The account already represents the signed-in person. The menu action is adding another relationship, not joining BNDY again.

**Required change:** Rename the menu action and related Manage actions to **Add artist or venue**.

### 5.2 `/join` is not contextual

**Finding:** Confirmed.

The page currently uses `Join bndy`, `This is my artist` and `I run a venue`. This works only as a first-time onboarding story and obscures the search, Claim and create branches.

**Required change:** Reframe the page as **Find an artist or venue**, with signed-in supporting copy for adding another entity.

### 5.3 `/join` needs a back button

**Finding:** Confirmed.

The Artist and Venue child flows include back navigation, but the `/join` entry page does not.

**Required change:** Add the safe history/fallback behaviour defined in section 4.4.

### 5.4 Facebook Page verification message

**Finding:** The current user-facing message is unacceptable and the verification capability is not currently implemented.

BNDY currently has:

- a verified Meta business/app setup;
- Facebook Login through Cognito;
- Facebook Login data limited to `public_profile` and `email`.

That proves the person can sign in with Facebook. It does not prove that the person controls an official Artist or Venue Facebook Page.

The current Claim API deliberately rejects `facebook_page` verification, and no deployed flow retrieves Pages managed by the user or verifies Page control server-side.

**Required immediate change:** Remove the disabled Facebook Page panel and all references to `awaiting Meta Page access` from the public Claim journey. Manual evidence remains the honest route.

**Required later capability:** Only expose **Verify with Facebook** when BNDY can complete this server-side sequence:

1. request and receive the required reviewed Page permissions;
2. retrieve Pages the signed-in Facebook user manages;
3. let the person select a Page;
4. reconcile the stable Page identity to the selected BNDY entity;
5. create tamper-resistant verification evidence server-side;
6. prove the journey in production.

The eventual UI must say what the user can do. It must never expose internal permission, app-review or infrastructure status.

### 5.5 Transparent location dropdown

**Finding:** Confirmed code defect.

The Artist location suggestion menu uses `bg-[var(--bg)]`, but `--bg` is not defined by the active skin tokens. The unresolved CSS variable leaves the suggestion surface transparent, exactly as shown in the supplied screenshot.

**Required change:** Use an opaque theme token such as `--card` or introduce a dedicated opaque popover token. The suggestion list must cover content below it in every skin and retain visible borders, hover state and keyboard focus.

### 5.6 Same name in a different location cannot continue

**Finding:** Confirmed logic defect.

The current flow asks for a different location, but the resolver treats an exact normalised name as a confident match even when the selected location differs. The UI then shows the existing Artist again and calls the same resolution path when Continue is selected, creating a loop.

The backend already recognises `confirmNew`, but the Join UI does not provide or invoke the explicit distinct-Artist decision.

**Required flow:**

1. Show same-name Artists and their locations.
2. If the person selects an existing row, enter the Claim journey.
3. If the person selects **Different artist in [selected location]**, require an explicit confirmation.
4. Re-run the dry check using `confirmNew: true`.
5. Continue to the new Artist profile step when the location is resolvable and does not collide with the same name/region unique key.
6. Recheck immediately before creation to close the race window.

Exact Facebook identity, exact external identity or a same-region unique-key collision must still block creation. A different resolved region with no stronger identity collision must not be blocked merely because the display name is identical.

## 6. Claim and ownership lifecycle

| Situation | Result |
|---|---|
| New entity, signed-in person | Create entity and initial owner relationship |
| Existing unowned entity | Create evidence-led Claim |
| Existing entity already managed by this person | Return to Manage, do not create another Claim |
| Existing entity owned by somebody else | Conflict Claim, no automatic replacement |
| Claim needs more evidence | Reviewer note appears in Manage; claimant can append evidence |
| Claim approved | Create requested membership and update owner only when role is owner and safe |
| Claim rejected | Preserve review history; grant no relationship |
| Owner leaves | Explicit audited relinquish or transfer; public entity remains |

Claims are relationship requests. They are not edits to the public Artist or Venue record.

## 7. Current implementation status

### Live and implemented

- Artist and Venue search-first routes
- authenticated new Artist and Venue creation
- initial ownership on safe creation
- multi-entity relationship listing in `/manage`
- Artist owner/admin/member and Venue owner/admin relationships
- evidence-led Claim submission
- pending Claim visibility in Manage
- Godmode evidence review, approve, reject and request-more-evidence actions
- claimant evidence follow-up loop
- competing Claim and ownership-conflict protection
- Venue delegate invitation and ownership transfer foundation
- Artist and Venue ownership relinquish controls
- owner-protection boundary for lower-authority Backline projection

Evidence:

- [bndy-app Claim V2 PR #25](https://github.com/flowency-live/bndy-app/pull/25)
- [bndy-app evidence follow-up PR #27](https://github.com/flowency-live/bndy-app/pull/27)
- [bndy-serverless-api Claim backend PR #60](https://github.com/flowency-live/bndy-serverless-api/pull/60)
- [bndy-serverless-api lifecycle hardening PR #63](https://github.com/flowency-live/bndy-serverless-api/pull/63)
- [bndy-backstage evidence review PR #13](https://github.com/flowency-live/bndy-backstage/pull/13)
- [bndy-backstage review actions PR #14](https://github.com/flowency-live/bndy-backstage/pull/14)
- [Latest successful production API deployment](https://github.com/flowency-live/bndy-serverless-api/actions/runs/33271538629)

### Implemented but not accepted end to end

- complete authenticated production acceptance across Artist, Venue, Claim, more evidence, approval, delegation, transfer and relinquish
- privacy-safe Claim authority projection into Backline

The Backline stream and consumer are deployed and tested in code, but the synthetic production acceptance did not prove the final authority record. This is deliberately non-blocking for Claim success.

### Not implemented

- Facebook Page-control verification
- contextual Add language across the signed-in experience
- safe explicit same-name/different-location continuation
- opaque location suggestion surface
- `/join` back control
- final Venue profile polish

## 8. Delivery order

### Phase A: Correct the user-facing model

1. Rename menu, Manage and `/join` copy from Join to Add/Find.
2. Add `/join` back navigation.
3. Remove the unavailable Facebook Page panel from public UI.
4. Fix the opaque location popover.

### Phase B: Fix distinct same-name creation

1. Add the explicit **Different artist in [location]** decision.
2. Wire `confirmNew` through the UI and API preflight.
3. Retain exact identity and same-region collision protection.
4. Add unit and integration tests for same name/same location, same name/different location, variant name and exact Facebook collision.

### Phase C: Production acceptance

1. Add a second Artist to an account that already manages one.
2. Add or Claim a Venue from the same account.
3. Complete Claim, more-evidence and approval loops.
4. Verify Manage shows every relationship with the correct role.
5. Verify a competing owner Claim cannot replace the owner.
6. Verify transfer and relinquish preserve the public entity.

### Phase D: Facebook Page verification

Treat this as a separate capability. Do not re-expose it until permissions, server-side Page selection, reconciliation, tamper-resistant evidence and production acceptance all pass.

## 9. Acceptance criteria

- A signed-in owner sees **Add artist or venue**, never an instruction to join again.
- `/join` says **Find an artist or venue** and has a working back action.
- An account can manage multiple Artists and Venues concurrently.
- Manage shows each entity and the person's role clearly.
- The location dropdown is fully opaque in every visual skin.
- A genuinely different same-name Artist in a different resolved region can progress.
- A same-name Artist in the same identity region cannot be duplicated.
- Existing entity selection always enters Claim, not create.
- No public Facebook Page verification option appears until it works end to end.
- Claim approval grants only the reviewed role.
- An existing owner cannot be silently displaced.
- Backline transport failure cannot cause Claim creation or approval to fail.

## 10. Product naming rule

Use these terms consistently:

- **Join BNDY:** creating or signing into the person's account
- **Find:** searching for an Artist or Venue
- **Add:** creating a genuinely new Artist or Venue relationship
- **Claim:** requesting a relationship to an existing entity
- **Manage:** working with entities already related to the account
- **Owner:** the single accountable owner
- **Admin:** a delegated manager
- **Member:** an Artist participant without owner authority

This distinction is the foundation for a coherent multi-entity experience.
