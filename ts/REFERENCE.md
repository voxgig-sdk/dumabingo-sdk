# Dumabingo TypeScript SDK Reference

Complete API reference for the Dumabingo TypeScript SDK.


## DumabingoSDK

### Constructor

```ts
new DumabingoSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DumabingoSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DumabingoSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DumabingoSDK` instance in test mode.


### Instance Methods

#### `DeputyProfile(data?: object)`

Create a new `DeputyProfile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeputyProfileEntity` instance.

#### `LawDraft(data?: object)`

Create a new `LawDraft` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LawDraftEntity` instance.

#### `LobbyGroup(data?: object)`

Create a new `LobbyGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LobbyGroupEntity` instance.

#### `Lobbyist(data?: object)`

Create a new `Lobbyist` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LobbyistEntity` instance.

#### `Person(data?: object)`

Create a new `Person` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PersonEntity` instance.

#### `SenatorProfile(data?: object)`

Create a new `SenatorProfile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SenatorProfileEntity` instance.

#### `SuccessRate(data?: object)`

Create a new `SuccessRate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SuccessRateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DumabingoSDK.test()`.

**Returns:** `DumabingoSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## DeputyProfileEntity

```ts
const deputy_profile = client.DeputyProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appointing_date` | `string` | No | Null in every probe; type unverified. |
| `bio` | `string` | No |  |
| `birth_date` | `string` | No |  |
| `comments` | `string` | No |  |
| `commission` | `string` | No |  |
| `committee` | `string` | No |  |
| `committees` | `any[]` | No |  |
| `conclusion` | `string` | No |  |
| `convocation` | `number` | No |  |
| `draft` | `boolean` | No |  |
| `duma_id` | `number` | No |  |
| `edited` | `boolean` | No |  |
| `election_method` | `string` | No |  |
| `end_date` | `string` | No | Free text in the sf dump (e.g. |
| `end_date_old` | `string` | No | Null in every probe; type unverified. |
| `fact_checked` | `boolean` | No |  |
| `family` | `string` | No |  |
| `fraction` | `number` | No | Faction id. |
| `fraction_end_date` | `string` | No |  |
| `fraction_group` | `string` | No |  |
| `fraction_old` | `string` | No |  |
| `fraction_start_date` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | No |  |
| `goverment_body` | `string` | No |  |
| `groups` | `any[]` | No |  |
| `hidden` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `last_appointment` | `string` | No |  |
| `last_import` | `string` | No |  |
| `law_draft_count` | `number` | No |  |
| `lawyer_checked` | `boolean` | No |  |
| `lobbist` | `number` | No |  |
| `modified_when` | `string` | No |  |
| `office` | `string` | No | Null in every probe; type unverified. |
| `person` | `number` | Yes |  |
| `photo` | `string` | No |  |
| `positions` | `any[]` | No |  |
| `raw_position` | `string` | No |  |
| `region` | `any` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `number` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `number` | No |  |
| `total_years` | `number` | No |  |
| `vote_link` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DeputyProfile().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeputyProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LawDraftEntity

```ts
const law_draft = client.LawDraft()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `boolean` | No |  |
| `approved` | `boolean` | No |  |
| `committees` | `any[]` | No | Committee ids. |
| `core` | `string` | No |  |
| `created_by` | `number` | No |  |
| `created_when` | `string` | No |  |
| `departments` | `any[]` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | No | Null in every probe; type unverified. |
| `entry_date` | `string` | No |  |
| `fact_checked` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `in_watch_list` | `boolean` | No |  |
| `initiator_offices` | `any[]` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `any[]` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `boolean` | No |  |
| `keywords` | `any[]` | No |  |
| `last_update` | `string` | No |  |
| `law_authors` | `any[]` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `boolean` | No |  |
| `link` | `string` | Yes |  |
| `markers` | `any[]` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `number` | No |  |
| `modified_when` | `string` | No |  |
| `name` | `string` | Yes |  |
| `note` | `string` | No |  |
| `number` | `string` | Yes |  |
| `old_phase` | `string` | No | Null in every probe; type unverified. |
| `parties` | `any[]` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` | No |  |
| `transcript_url` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LawDraft().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LawDraftEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LobbyGroupEntity

```ts
const lobby_group = client.LobbyGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | Yes |  |
| `level` | `number` | Yes |  |
| `lft` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `office` | `number` | Yes | Null in every probe; type unverified. |
| `order` | `number` | Yes |  |
| `parent` | `number` | Yes |  |
| `region` | `number` | Yes | Null in every probe; type unverified. |
| `rght` | `number` | Yes |  |
| `tree_id` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LobbyGroup().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LobbyGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LobbyistEntity

```ts
const lobbyist = client.Lobbyist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `string` | Yes |  |
| `commission` | `string` | Yes |  |
| `committee` | `string` | Yes |  |
| `committees` | `any[]` | Yes |  |
| `convocation` | `number` | No |  |
| `convocations` | `any[]` | Yes |  |
| `draft` | `boolean` | No |  |
| `election_method` | `string` | Yes |  |
| `end_date` | `string` | Yes | Free text in the sf dump (e.g. |
| `fraction` | `any` | No | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `string` | No |  |
| `fraction_group` | `string` | No |  |
| `fraction_old` | `string` | No |  |
| `fraction_start_date` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | Yes |  |
| `goverment_body` | `string` | Yes |  |
| `groups` | `any[]` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `boolean` | Yes |  |
| `id` | `number` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` | Yes |  |
| `law_draft_apis` | `any[]` | No |  |
| `law_draft_count` | `number` | No |  |
| `lobbist` | `number` | No |  |
| `modified_when` | `string` | No |  |
| `person` | `number` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `any[]` | No |  |
| `region` | `any` | Yes |  |
| `rupep` | `string` | No |  |
| `site` | `string` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `number` | Yes |  |
| `temp_commission` | `string` | Yes |  |
| `terms_number` | `number` | Yes |  |
| `total_years` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Lobbyist().list({ chamber: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LobbyistEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PersonEntity

```ts
const person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `any[]` | Yes |  |
| `incomes` | `any[]` | Yes |  |
| `main` | `Record<string, any>` | Yes |  |
| `person_id` | `number` | Yes |  |
| `position_en` | `string` | Yes |  |
| `position_ru` | `string` | Yes |  |
| `real_estates` | `any[]` | Yes |  |
| `savings` | `any[]` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `any[]` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `any[]` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Person().list({ convocation_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PersonEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SenatorProfileEntity

```ts
const senator_profile = client.SenatorProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `birth_date` | `string` | No |  |
| `comments` | `string` | No |  |
| `commission` | `string` | No |  |
| `committee` | `string` | No |  |
| `committees` | `any[]` | No | Empty in the probe; item type unverified. |
| `conclusion` | `string` | No |  |
| `convocations` | `any[]` | No |  |
| `duma_id` | `number` | No | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `boolean` | No |  |
| `election_method` | `string` | No |  |
| `end_date` | `string` | No |  |
| `family` | `string` | No |  |
| `fraction` | `string` | No | Faction name. |
| `fraction_group` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | No |  |
| `goverment_body` | `string` | No |  |
| `groups` | `any[]` | No |  |
| `hidden` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `last_appointment` | `string` | No |  |
| `last_import` | `string` | No |  |
| `person` | `number` | Yes |  |
| `photo` | `string` | No |  |
| `position` | `string` | No |  |
| `region` | `any` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `number` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `number` | No |  |
| `total_years` | `number` | No |  |
| `verified` | `boolean` | No |  |
| `vote_link` | `string` | No | Null in every probe; type unverified. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SenatorProfile().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SenatorProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SuccessRateEntity

```ts
const success_rate = client.SuccessRate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_number` | `number` | Yes |  |
| `filtered_number` | `number` | Yes |  |
| `lobbyist_number` | `number` | Yes |  |
| `number` | `number` | Yes |  |
| `rate` | `number` | Yes | Percentage of proposed bills that passed; null when none were proposed. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SuccessRate().load({ person_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SuccessRateEntity` instance with the same client and
options.

#### `client()`

Return the parent `DumabingoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new DumabingoSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

