# Dumabingo TypeScript SDK



The TypeScript SDK for the Dumabingo API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.DeputyProfile()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/dumabingo-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/dumabingo-sdk
npm install ./dumabingo-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DumabingoSDK } from '@voxgig-sdk/dumabingo-sdk'

const client = new DumabingoSDK()
```

### 3. Load a successrate

SuccessRate is nested under person, so provide the `person_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const successrate = await client.SuccessRate().load({
    person_id: 1,
  })
  console.log(successrate.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const lawdraft = await client.LawDraft().load({ id: 1 })
  console.log(lawdraft.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DumabingoSDK.test()

const lawdraft = await client.LawDraft().load({ id: 1 })
// lawdraft is the LawDraft entity; .data() reads its mock record
console.log(lawdraft.data())
```

You can also use the instance method:

```ts
const client = new DumabingoSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.LawDraft()

// First call runs the operation and stores its result
await entity.load({ id: 1 })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DumabingoSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DUMABINGO_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### DumabingoSDK

#### Constructor

```ts
new DumabingoSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `DeputyProfile(data?)` | `DeputyProfileEntity` | Create a DeputyProfile entity instance. |
| `LawDraft(data?)` | `LawDraftEntity` | Create a LawDraft entity instance. |
| `LobbyGroup(data?)` | `LobbyGroupEntity` | Create a LobbyGroup entity instance. |
| `Lobbyist(data?)` | `LobbyistEntity` | Create a Lobbyist entity instance. |
| `Person(data?)` | `PersonEntity` | Create a Person entity instance. |
| `SenatorProfile(data?)` | `SenatorProfileEntity` | Create a SenatorProfile entity instance. |
| `SuccessRate(data?)` | `SuccessRateEntity` | Create a SuccessRate entity instance. |
| `tester(testopts?, sdkopts?)` | `DumabingoSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DumabingoSDK.test(testopts?, sdkopts?)` | `DumabingoSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DumabingoSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### DeputyProfile

| Field | Description |
| --- | --- |
| `appointing_date` | Null in every probe; type unverified. |
| `bio` |  |
| `birth_date` |  |
| `comments` |  |
| `commission` |  |
| `committee` |  |
| `committees` |  |
| `conclusion` |  |
| `convocation` |  |
| `draft` |  |
| `duma_id` |  |
| `edited` |  |
| `election_method` |  |
| `end_date` | Free text in the sf dump (e.g. |
| `end_date_old` | Null in every probe; type unverified. |
| `fact_checked` |  |
| `family` |  |
| `fraction` | Faction id. |
| `fraction_end_date` |  |
| `fraction_group` |  |
| `fraction_old` |  |
| `fraction_start_date` |  |
| `fullname` |  |
| `gender` |  |
| `goverment_body` |  |
| `groups` |  |
| `hidden` |  |
| `id` |  |
| `last_appointment` |  |
| `last_import` |  |
| `law_draft_count` |  |
| `lawyer_checked` |  |
| `lobbist` |  |
| `modified_when` |  |
| `office` | Null in every probe; type unverified. |
| `person` |  |
| `photo` |  |
| `positions` |  |
| `raw_position` |  |
| `region` |  |
| `relations` |  |
| `site` |  |
| `start_year` |  |
| `submitted` |  |
| `temp_commission` |  |
| `terms_number` |  |
| `total_years` |  |
| `vote_link` |  |

Operations: load.

API path: `/api/lobbist_detail/{id}/`

#### LawDraft

| Field | Description |
| --- | --- |
| `analyst_filled` |  |
| `approved` |  |
| `committees` | Committee ids. |
| `core` |  |
| `created_by` |  |
| `created_when` |  |
| `departments` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | Null in every probe; type unverified. |
| `entry_date` |  |
| `fact_checked` |  |
| `id` |  |
| `in_watch_list` |  |
| `initiator_offices` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` |  |
| `keywords` |  |
| `last_update` |  |
| `law_authors` | Declarator person ids of the authors. |
| `lawyer_checked` |  |
| `link` |  |
| `markers` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` |  |
| `modified_when` |  |
| `name` |  |
| `note` |  |
| `number` |  |
| `old_phase` | Null in every probe; type unverified. |
| `parties` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` |  |
| `transcript_url` |  |
| `type` |  |

Operations: load.

API path: `/api/law_draft_api/{id}/`

#### LobbyGroup

| Field | Description |
| --- | --- |
| `id` |  |
| `level` |  |
| `lft` |  |
| `name` |  |
| `office` | Null in every probe; type unverified. |
| `order` |  |
| `parent` |  |
| `region` | Null in every probe; type unverified. |
| `rght` |  |
| `tree_id` |  |

Operations: list.

API path: `/api/lobby_group/`

#### Lobbyist

| Field | Description |
| --- | --- |
| `birth_date` |  |
| `commission` |  |
| `committee` |  |
| `committees` |  |
| `convocation` |  |
| `convocations` |  |
| `draft` |  |
| `election_method` |  |
| `end_date` | Free text in the sf dump (e.g. |
| `fraction` | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` |  |
| `fraction_group` |  |
| `fraction_old` |  |
| `fraction_start_date` |  |
| `fullname` |  |
| `gender` |  |
| `goverment_body` |  |
| `groups` | Lobby group ids (listLobbyGroups). |
| `hidden` |  |
| `id` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` |  |
| `law_draft_apis` |  |
| `law_draft_count` |  |
| `lobbist` |  |
| `modified_when` |  |
| `person` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` |  |
| `region` |  |
| `rupep` |  |
| `site` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` |  |
| `temp_commission` |  |
| `terms_number` |  |
| `total_years` |  |

Operations: list.

API path: `/media/dumps/lobbist-small-{chamber}.json`

#### Person

| Field | Description |
| --- | --- |
| `convocations` |  |
| `incomes` |  |
| `main` |  |
| `person_id` |  |
| `position_en` |  |
| `position_ru` |  |
| `real_estates` |  |
| `savings` | Empty in the probe; item shape unverified. |
| `spendings` | Empty in the probe; item shape unverified. |
| `stocks` | Empty in the probe; item shape unverified. |
| `vehicles` |  |

Operations: list.

API path: `/api/convocations/{convocationId}/person_convocations`

#### SenatorProfile

| Field | Description |
| --- | --- |
| `bio` |  |
| `birth_date` |  |
| `comments` |  |
| `commission` |  |
| `committee` |  |
| `committees` | Empty in the probe; item type unverified. |
| `conclusion` |  |
| `convocations` |  |
| `duma_id` | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` |  |
| `election_method` |  |
| `end_date` |  |
| `family` |  |
| `fraction` | Faction name. |
| `fraction_group` |  |
| `fullname` |  |
| `gender` |  |
| `goverment_body` |  |
| `groups` |  |
| `hidden` |  |
| `id` |  |
| `last_appointment` |  |
| `last_import` |  |
| `person` |  |
| `photo` |  |
| `position` |  |
| `region` |  |
| `relations` |  |
| `site` |  |
| `start_year` |  |
| `submitted` |  |
| `temp_commission` |  |
| `terms_number` |  |
| `total_years` |  |
| `verified` |  |
| `vote_link` | Null in every probe; type unverified. |

Operations: load.

API path: `/api/lobbist/{id}/`

#### SuccessRate

| Field | Description |
| --- | --- |
| `approved_number` |  |
| `filtered_number` |  |
| `lobbyist_number` |  |
| `number` |  |
| `rate` | Percentage of proposed bills that passed; null when none were proposed. |

Operations: load.

API path: `/api/persons/{personId}/success_rate`



## Entities


### DeputyProfile

Create an instance: `const deputy_profile = client.DeputyProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appointing_date` | `string` | Null in every probe; type unverified. |
| `bio` | `string` |  |
| `birth_date` | `string` |  |
| `comments` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `any[]` |  |
| `conclusion` | `string` |  |
| `convocation` | `number` |  |
| `draft` | `boolean` |  |
| `duma_id` | `number` |  |
| `edited` | `boolean` |  |
| `election_method` | `string` |  |
| `end_date` | `string` | Free text in the sf dump (e.g. |
| `end_date_old` | `string` | Null in every probe; type unverified. |
| `fact_checked` | `boolean` |  |
| `family` | `string` |  |
| `fraction` | `number` | Faction id. |
| `fraction_end_date` | `string` |  |
| `fraction_group` | `string` |  |
| `fraction_old` | `string` |  |
| `fraction_start_date` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `any[]` |  |
| `hidden` | `boolean` |  |
| `id` | `number` |  |
| `last_appointment` | `string` |  |
| `last_import` | `string` |  |
| `law_draft_count` | `number` |  |
| `lawyer_checked` | `boolean` |  |
| `lobbist` | `number` |  |
| `modified_when` | `string` |  |
| `office` | `string` | Null in every probe; type unverified. |
| `person` | `number` |  |
| `photo` | `string` |  |
| `positions` | `any[]` |  |
| `raw_position` | `string` |  |
| `region` | `any` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `number` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `number` |  |
| `total_years` | `number` |  |
| `vote_link` | `string` |  |

#### Example: Load

```ts
const deputy_profile = await client.DeputyProfile().load({ id: 1 })
```


### LawDraft

Create an instance: `const law_draft = client.LawDraft()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyst_filled` | `boolean` |  |
| `approved` | `boolean` |  |
| `committees` | `any[]` | Committee ids. |
| `core` | `string` |  |
| `created_by` | `number` |  |
| `created_when` | `string` |  |
| `departments` | `any[]` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | Null in every probe; type unverified. |
| `entry_date` | `string` |  |
| `fact_checked` | `boolean` |  |
| `id` | `number` |  |
| `in_watch_list` | `boolean` |  |
| `initiator_offices` | `any[]` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `any[]` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `boolean` |  |
| `keywords` | `any[]` |  |
| `last_update` | `string` |  |
| `law_authors` | `any[]` | Declarator person ids of the authors. |
| `lawyer_checked` | `boolean` |  |
| `link` | `string` |  |
| `markers` | `any[]` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `number` |  |
| `modified_when` | `string` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `number` | `string` |  |
| `old_phase` | `string` | Null in every probe; type unverified. |
| `parties` | `any[]` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` |  |
| `transcript_url` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const law_draft = await client.LawDraft().load({ id: 1 })
```


### LobbyGroup

Create an instance: `const lobby_group = client.LobbyGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `level` | `number` |  |
| `lft` | `number` |  |
| `name` | `string` |  |
| `office` | `number` | Null in every probe; type unverified. |
| `order` | `number` |  |
| `parent` | `number` |  |
| `region` | `number` | Null in every probe; type unverified. |
| `rght` | `number` |  |
| `tree_id` | `number` |  |

#### Example: List

```ts
const lobby_groups = await client.LobbyGroup().list()
```


### Lobbyist

Create an instance: `const lobbyist = client.Lobbyist()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_date` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `any[]` |  |
| `convocation` | `number` |  |
| `convocations` | `any[]` |  |
| `draft` | `boolean` |  |
| `election_method` | `string` |  |
| `end_date` | `string` | Free text in the sf dump (e.g. |
| `fraction` | `any` | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `string` |  |
| `fraction_group` | `string` |  |
| `fraction_old` | `string` |  |
| `fraction_start_date` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `any[]` | Lobby group ids (listLobbyGroups). |
| `hidden` | `boolean` |  |
| `id` | `number` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` |  |
| `law_draft_apis` | `any[]` |  |
| `law_draft_count` | `number` |  |
| `lobbist` | `number` |  |
| `modified_when` | `string` |  |
| `person` | `number` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `any[]` |  |
| `region` | `any` |  |
| `rupep` | `string` |  |
| `site` | `string` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `number` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `number` |  |
| `total_years` | `number` |  |

#### Example: List

```ts
const lobbyists = await client.Lobbyist().list({ chamber: "example" })
```


### Person

Create an instance: `const person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `convocations` | `any[]` |  |
| `incomes` | `any[]` |  |
| `main` | `Record<string, any>` |  |
| `person_id` | `number` |  |
| `position_en` | `string` |  |
| `position_ru` | `string` |  |
| `real_estates` | `any[]` |  |
| `savings` | `any[]` | Empty in the probe; item shape unverified. |
| `spendings` | `any[]` | Empty in the probe; item shape unverified. |
| `stocks` | `any[]` | Empty in the probe; item shape unverified. |
| `vehicles` | `any[]` |  |

#### Example: List

```ts
const persons = await client.Person().list({ convocation_id: 1 })
```


### SenatorProfile

Create an instance: `const senator_profile = client.SenatorProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` |  |
| `birth_date` | `string` |  |
| `comments` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `any[]` | Empty in the probe; item type unverified. |
| `conclusion` | `string` |  |
| `convocations` | `any[]` |  |
| `duma_id` | `number` | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `boolean` |  |
| `election_method` | `string` |  |
| `end_date` | `string` |  |
| `family` | `string` |  |
| `fraction` | `string` | Faction name. |
| `fraction_group` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `any[]` |  |
| `hidden` | `boolean` |  |
| `id` | `number` |  |
| `last_appointment` | `string` |  |
| `last_import` | `string` |  |
| `person` | `number` |  |
| `photo` | `string` |  |
| `position` | `string` |  |
| `region` | `any` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `number` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `number` |  |
| `total_years` | `number` |  |
| `verified` | `boolean` |  |
| `vote_link` | `string` | Null in every probe; type unverified. |

#### Example: Load

```ts
const senator_profile = await client.SenatorProfile().load({ id: 1 })
```


### SuccessRate

Create an instance: `const success_rate = client.SuccessRate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_number` | `number` |  |
| `filtered_number` | `number` |  |
| `lobbyist_number` | `number` |  |
| `number` | `number` |  |
| `rate` | `number` | Percentage of proposed bills that passed; null when none were proposed. |

#### Example: Load

```ts
const success_rate = await client.SuccessRate().load({ person_id: 1 })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dumabingo/
├── src/
│   ├── DumabingoSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DumabingoSDK } from '@voxgig-sdk/dumabingo-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const lawdraft = client.LawDraft()
await lawdraft.load({ id: 1 })

// lawdraft.data() now returns the lawdraft data from the last `load`
// lawdraft.match() returns { id: 1 }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
