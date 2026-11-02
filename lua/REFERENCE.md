# Dumabingo Lua SDK Reference

Complete API reference for the Dumabingo Lua SDK.


## DumabingoSDK

### Constructor

```lua
local sdk = require("dumabingo_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `DeputyProfile(data)`

Create a new `DeputyProfile` entity instance. Pass `nil` for no initial data.

#### `LawDraft(data)`

Create a new `LawDraft` entity instance. Pass `nil` for no initial data.

#### `LobbyGroup(data)`

Create a new `LobbyGroup` entity instance. Pass `nil` for no initial data.

#### `Lobbyist(data)`

Create a new `Lobbyist` entity instance. Pass `nil` for no initial data.

#### `Person(data)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `SenatorProfile(data)`

Create a new `SenatorProfile` entity instance. Pass `nil` for no initial data.

#### `SuccessRate(data)`

Create a new `SuccessRate` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DeputyProfileEntity

```lua
local deputy_profile = client:DeputyProfile(nil)
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
| `committees` | `table` | No |  |
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
| `groups` | `table` | No |  |
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
| `positions` | `table` | No |  |
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DeputyProfile():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeputyProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LawDraftEntity

```lua
local law_draft = client:LawDraft(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `boolean` | No |  |
| `approved` | `boolean` | No |  |
| `committees` | `table` | No | Committee ids. |
| `core` | `string` | No |  |
| `created_by` | `number` | No |  |
| `created_when` | `string` | No |  |
| `departments` | `table` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | No | Null in every probe; type unverified. |
| `entry_date` | `string` | No |  |
| `fact_checked` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `in_watch_list` | `boolean` | No |  |
| `initiator_offices` | `table` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `table` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `boolean` | No |  |
| `keywords` | `table` | No |  |
| `last_update` | `string` | No |  |
| `law_authors` | `table` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `boolean` | No |  |
| `link` | `string` | Yes |  |
| `markers` | `table` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `number` | No |  |
| `modified_when` | `string` | No |  |
| `name` | `string` | Yes |  |
| `note` | `string` | No |  |
| `number` | `string` | Yes |  |
| `old_phase` | `string` | No | Null in every probe; type unverified. |
| `parties` | `table` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` | No |  |
| `transcript_url` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LawDraft():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LawDraftEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LobbyGroupEntity

```lua
local lobby_group = client:LobbyGroup(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LobbyGroup():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LobbyGroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LobbyistEntity

```lua
local lobbyist = client:Lobbyist(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `string` | Yes |  |
| `commission` | `string` | Yes |  |
| `committee` | `string` | Yes |  |
| `committees` | `table` | Yes |  |
| `convocation` | `number` | No |  |
| `convocations` | `table` | Yes |  |
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
| `groups` | `table` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `boolean` | Yes |  |
| `id` | `number` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` | Yes |  |
| `law_draft_apis` | `table` | No |  |
| `law_draft_count` | `number` | No |  |
| `lobbist` | `number` | No |  |
| `modified_when` | `string` | No |  |
| `person` | `number` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `table` | No |  |
| `region` | `any` | Yes |  |
| `rupep` | `string` | No |  |
| `site` | `string` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `number` | Yes |  |
| `temp_commission` | `string` | Yes |  |
| `terms_number` | `number` | Yes |  |
| `total_years` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Lobbyist():list({ chamber = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LobbyistEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PersonEntity

```lua
local person = client:Person(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `table` | Yes |  |
| `incomes` | `table` | Yes |  |
| `main` | `table` | Yes |  |
| `person_id` | `number` | Yes |  |
| `position_en` | `string` | Yes |  |
| `position_ru` | `string` | Yes |  |
| `real_estates` | `table` | Yes |  |
| `savings` | `table` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `table` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `table` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Person():list({ convocation_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SenatorProfileEntity

```lua
local senator_profile = client:SenatorProfile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `birth_date` | `string` | No |  |
| `comments` | `string` | No |  |
| `commission` | `string` | No |  |
| `committee` | `string` | No |  |
| `committees` | `table` | No | Empty in the probe; item type unverified. |
| `conclusion` | `string` | No |  |
| `convocations` | `table` | No |  |
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
| `groups` | `table` | No |  |
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SenatorProfile():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SenatorProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SuccessRateEntity

```lua
local success_rate = client:SuccessRate(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SuccessRate():load({ person_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuccessRateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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

