# Dumabingo Ruby SDK Reference

Complete API reference for the Dumabingo Ruby SDK.


## DumabingoSDK

### Constructor

```ruby
require_relative 'Dumabingo_sdk'

client = DumabingoSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DumabingoSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = DumabingoSDK.test
```


### Instance Methods

#### `DeputyProfile(data = nil)`

Create a new `DeputyProfile` entity instance. Pass `nil` for no initial data.

#### `LawDraft(data = nil)`

Create a new `LawDraft` entity instance. Pass `nil` for no initial data.

#### `LobbyGroup(data = nil)`

Create a new `LobbyGroup` entity instance. Pass `nil` for no initial data.

#### `Lobbyist(data = nil)`

Create a new `Lobbyist` entity instance. Pass `nil` for no initial data.

#### `Person(data = nil)`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `SenatorProfile(data = nil)`

Create a new `SenatorProfile` entity instance. Pass `nil` for no initial data.

#### `SuccessRate(data = nil)`

Create a new `SuccessRate` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DeputyProfileEntity

```ruby
deputy_profile = client.DeputyProfile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appointing_date` | `String` | No | Null in every probe; type unverified. |
| `bio` | `String` | No |  |
| `birth_date` | `String` | No |  |
| `comments` | `String` | No |  |
| `commission` | `String` | No |  |
| `committee` | `String` | No |  |
| `committees` | `Array` | No |  |
| `conclusion` | `String` | No |  |
| `convocation` | `Integer` | No |  |
| `draft` | `Boolean` | No |  |
| `duma_id` | `Integer` | No |  |
| `edited` | `Boolean` | No |  |
| `election_method` | `String` | No |  |
| `end_date` | `String` | No | Free text in the sf dump (e.g. |
| `end_date_old` | `String` | No | Null in every probe; type unverified. |
| `fact_checked` | `Boolean` | No |  |
| `family` | `String` | No |  |
| `fraction` | `Integer` | No | Faction id. |
| `fraction_end_date` | `String` | No |  |
| `fraction_group` | `String` | No |  |
| `fraction_old` | `String` | No |  |
| `fraction_start_date` | `String` | No |  |
| `fullname` | `String` | Yes |  |
| `gender` | `String` | No |  |
| `goverment_body` | `String` | No |  |
| `groups` | `Array` | No |  |
| `hidden` | `Boolean` | No |  |
| `id` | `Integer` | Yes |  |
| `last_appointment` | `String` | No |  |
| `last_import` | `String` | No |  |
| `law_draft_count` | `Integer` | No |  |
| `lawyer_checked` | `Boolean` | No |  |
| `lobbist` | `Integer` | No |  |
| `modified_when` | `String` | No |  |
| `office` | `String` | No | Null in every probe; type unverified. |
| `person` | `Integer` | Yes |  |
| `photo` | `String` | No |  |
| `positions` | `Array` | No |  |
| `raw_position` | `String` | No |  |
| `region` | `Object` | No |  |
| `relations` | `String` | No |  |
| `site` | `String` | No |  |
| `start_year` | `Integer` | No |  |
| `submitted` | `String` | No |  |
| `temp_commission` | `String` | No |  |
| `terms_number` | `Integer` | No |  |
| `total_years` | `Float` | No |  |
| `vote_link` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DeputyProfile.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeputyProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LawDraftEntity

```ruby
law_draft = client.LawDraft
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `Boolean` | No |  |
| `approved` | `Boolean` | No |  |
| `committees` | `Array` | No | Committee ids. |
| `core` | `String` | No |  |
| `created_by` | `Integer` | No |  |
| `created_when` | `String` | No |  |
| `departments` | `Array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `String` | No | Null in every probe; type unverified. |
| `entry_date` | `String` | No |  |
| `fact_checked` | `Boolean` | No |  |
| `id` | `Integer` | Yes |  |
| `in_watch_list` | `Boolean` | No |  |
| `initiator_offices` | `Array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `Array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `Boolean` | No |  |
| `keywords` | `Array` | No |  |
| `last_update` | `String` | No |  |
| `law_authors` | `Array` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `Boolean` | No |  |
| `link` | `String` | Yes |  |
| `markers` | `Array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `Integer` | No |  |
| `modified_when` | `String` | No |  |
| `name` | `String` | Yes |  |
| `note` | `String` | No |  |
| `number` | `String` | Yes |  |
| `old_phase` | `String` | No | Null in every probe; type unverified. |
| `parties` | `Array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `String` | No |  |
| `transcript_url` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LawDraft.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LawDraftEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LobbyGroupEntity

```ruby
lobby_group = client.LobbyGroup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | Yes |  |
| `level` | `Integer` | Yes |  |
| `lft` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `office` | `Integer` | Yes | Null in every probe; type unverified. |
| `order` | `Integer` | Yes |  |
| `parent` | `Integer` | Yes |  |
| `region` | `Integer` | Yes | Null in every probe; type unverified. |
| `rght` | `Integer` | Yes |  |
| `tree_id` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LobbyGroup.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LobbyGroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LobbyistEntity

```ruby
lobbyist = client.Lobbyist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `String` | Yes |  |
| `commission` | `String` | Yes |  |
| `committee` | `String` | Yes |  |
| `committees` | `Array` | Yes |  |
| `convocation` | `Integer` | No |  |
| `convocations` | `Array` | Yes |  |
| `draft` | `Boolean` | No |  |
| `election_method` | `String` | Yes |  |
| `end_date` | `String` | Yes | Free text in the sf dump (e.g. |
| `fraction` | `Object` | No | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `String` | No |  |
| `fraction_group` | `String` | No |  |
| `fraction_old` | `String` | No |  |
| `fraction_start_date` | `String` | No |  |
| `fullname` | `String` | Yes |  |
| `gender` | `String` | Yes |  |
| `goverment_body` | `String` | Yes |  |
| `groups` | `Array` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `Boolean` | Yes |  |
| `id` | `Integer` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `String` | Yes |  |
| `law_draft_apis` | `Array` | No |  |
| `law_draft_count` | `Integer` | No |  |
| `lobbist` | `Integer` | No |  |
| `modified_when` | `String` | No |  |
| `person` | `Integer` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `Array` | No |  |
| `region` | `Object` | Yes |  |
| `rupep` | `String` | No |  |
| `site` | `String` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `Integer` | Yes |  |
| `temp_commission` | `String` | Yes |  |
| `terms_number` | `Integer` | Yes |  |
| `total_years` | `Float` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Lobbyist.list({ "chamber" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LobbyistEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PersonEntity

```ruby
person = client.Person
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `Array` | Yes |  |
| `incomes` | `Array` | Yes |  |
| `main` | `Hash` | Yes |  |
| `person_id` | `Integer` | Yes |  |
| `position_en` | `String` | Yes |  |
| `position_ru` | `String` | Yes |  |
| `real_estates` | `Array` | Yes |  |
| `savings` | `Array` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `Array` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `Array` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Person.list({ "convocation_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SenatorProfileEntity

```ruby
senator_profile = client.SenatorProfile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `String` | No |  |
| `birth_date` | `String` | No |  |
| `comments` | `String` | No |  |
| `commission` | `String` | No |  |
| `committee` | `String` | No |  |
| `committees` | `Array` | No | Empty in the probe; item type unverified. |
| `conclusion` | `String` | No |  |
| `convocations` | `Array` | No |  |
| `duma_id` | `Integer` | No | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `Boolean` | No |  |
| `election_method` | `String` | No |  |
| `end_date` | `String` | No |  |
| `family` | `String` | No |  |
| `fraction` | `String` | No | Faction name. |
| `fraction_group` | `String` | No |  |
| `fullname` | `String` | Yes |  |
| `gender` | `String` | No |  |
| `goverment_body` | `String` | No |  |
| `groups` | `Array` | No |  |
| `hidden` | `Boolean` | No |  |
| `id` | `Integer` | Yes |  |
| `last_appointment` | `String` | No |  |
| `last_import` | `String` | No |  |
| `person` | `Integer` | Yes |  |
| `photo` | `String` | No |  |
| `position` | `String` | No |  |
| `region` | `Object` | No |  |
| `relations` | `String` | No |  |
| `site` | `String` | No |  |
| `start_year` | `Integer` | No |  |
| `submitted` | `String` | No |  |
| `temp_commission` | `String` | No |  |
| `terms_number` | `Integer` | No |  |
| `total_years` | `Float` | No |  |
| `verified` | `Boolean` | No |  |
| `vote_link` | `String` | No | Null in every probe; type unverified. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SenatorProfile.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SenatorProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SuccessRateEntity

```ruby
success_rate = client.SuccessRate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_number` | `Integer` | Yes |  |
| `filtered_number` | `Integer` | Yes |  |
| `lobbyist_number` | `Integer` | Yes |  |
| `number` | `Integer` | Yes |  |
| `rate` | `Float` | Yes | Percentage of proposed bills that passed; null when none were proposed. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SuccessRate.load({ "person_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SuccessRateEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = DumabingoSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

