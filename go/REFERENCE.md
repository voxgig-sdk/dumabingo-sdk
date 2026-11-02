# Dumabingo Golang SDK Reference

Complete API reference for the Dumabingo Golang SDK.


## DumabingoSDK

### Constructor

```go
func NewDumabingoSDK(options map[string]any) *DumabingoSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *DumabingoSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *DumabingoSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `DeputyProfile(data map[string]any) DumabingoEntityBase`

Create a new `DeputyProfile` entity instance. Pass `nil` for no initial data.

#### `LawDraft(data map[string]any) DumabingoEntityBase`

Create a new `LawDraft` entity instance. Pass `nil` for no initial data.

#### `LobbyGroup(data map[string]any) DumabingoEntityBase`

Create a new `LobbyGroup` entity instance. Pass `nil` for no initial data.

#### `Lobbyist(data map[string]any) DumabingoEntityBase`

Create a new `Lobbyist` entity instance. Pass `nil` for no initial data.

#### `Person(data map[string]any) DumabingoEntityBase`

Create a new `Person` entity instance. Pass `nil` for no initial data.

#### `SenatorProfile(data map[string]any) DumabingoEntityBase`

Create a new `SenatorProfile` entity instance. Pass `nil` for no initial data.

#### `SuccessRate(data map[string]any) DumabingoEntityBase`

Create a new `SuccessRate` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DeputyProfileEntity

```go
deputyProfile := client.DeputyProfile(nil)
fmt.Println(deputyProfile.GetName()) // "deputy_profile"
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
| `committees` | `[]any` | No |  |
| `conclusion` | `string` | No |  |
| `convocation` | `int` | No |  |
| `draft` | `bool` | No |  |
| `duma_id` | `int` | No |  |
| `edited` | `bool` | No |  |
| `election_method` | `string` | No |  |
| `end_date` | `string` | No | Free text in the sf dump (e.g. |
| `end_date_old` | `string` | No | Null in every probe; type unverified. |
| `fact_checked` | `bool` | No |  |
| `family` | `string` | No |  |
| `fraction` | `int` | No | Faction id. |
| `fraction_end_date` | `string` | No |  |
| `fraction_group` | `string` | No |  |
| `fraction_old` | `string` | No |  |
| `fraction_start_date` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | No |  |
| `goverment_body` | `string` | No |  |
| `groups` | `[]any` | No |  |
| `hidden` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `last_appointment` | `string` | No |  |
| `last_import` | `string` | No |  |
| `law_draft_count` | `int` | No |  |
| `lawyer_checked` | `bool` | No |  |
| `lobbist` | `int` | No |  |
| `modified_when` | `string` | No |  |
| `office` | `string` | No | Null in every probe; type unverified. |
| `person` | `int` | Yes |  |
| `photo` | `string` | No |  |
| `positions` | `[]any` | No |  |
| `raw_position` | `string` | No |  |
| `region` | `any` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float64` | No |  |
| `vote_link` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DeputyProfile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeputyProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LawDraftEntity

```go
lawDraft := client.LawDraft(nil)
fmt.Println(lawDraft.GetName()) // "law_draft"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `bool` | No |  |
| `approved` | `bool` | No |  |
| `committees` | `[]any` | No | Committee ids. |
| `core` | `string` | No |  |
| `created_by` | `int` | No |  |
| `created_when` | `string` | No |  |
| `departments` | `[]any` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | No | Null in every probe; type unverified. |
| `entry_date` | `string` | No |  |
| `fact_checked` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `in_watch_list` | `bool` | No |  |
| `initiator_offices` | `[]any` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `[]any` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `bool` | No |  |
| `keywords` | `[]any` | No |  |
| `last_update` | `string` | No |  |
| `law_authors` | `[]any` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `bool` | No |  |
| `link` | `string` | Yes |  |
| `markers` | `[]any` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `int` | No |  |
| `modified_when` | `string` | No |  |
| `name` | `string` | Yes |  |
| `note` | `string` | No |  |
| `number` | `string` | Yes |  |
| `old_phase` | `string` | No | Null in every probe; type unverified. |
| `parties` | `[]any` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` | No |  |
| `transcript_url` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LawDraft(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LawDraftEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LobbyGroupEntity

```go
lobbyGroup := client.LobbyGroup(nil)
fmt.Println(lobbyGroup.GetName()) // "lobby_group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | Yes |  |
| `level` | `int` | Yes |  |
| `lft` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `office` | `int` | Yes | Null in every probe; type unverified. |
| `order` | `int` | Yes |  |
| `parent` | `int` | Yes |  |
| `region` | `int` | Yes | Null in every probe; type unverified. |
| `rght` | `int` | Yes |  |
| `tree_id` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LobbyGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LobbyGroupEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LobbyistEntity

```go
lobbyist := client.Lobbyist(nil)
fmt.Println(lobbyist.GetName()) // "lobbyist"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `string` | Yes |  |
| `commission` | `string` | Yes |  |
| `committee` | `string` | Yes |  |
| `committees` | `[]any` | Yes |  |
| `convocation` | `int` | No |  |
| `convocations` | `[]any` | Yes |  |
| `draft` | `bool` | No |  |
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
| `groups` | `[]any` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `bool` | Yes |  |
| `id` | `int` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` | Yes |  |
| `law_draft_apis` | `[]any` | No |  |
| `law_draft_count` | `int` | No |  |
| `lobbist` | `int` | No |  |
| `modified_when` | `string` | No |  |
| `person` | `int` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `[]any` | No |  |
| `region` | `any` | Yes |  |
| `rupep` | `string` | No |  |
| `site` | `string` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `int` | Yes |  |
| `temp_commission` | `string` | Yes |  |
| `terms_number` | `int` | Yes |  |
| `total_years` | `float64` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Lobbyist(nil).List(map[string]any{"chamber": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LobbyistEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PersonEntity

```go
person := client.Person(nil)
fmt.Println(person.GetName()) // "person"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `[]any` | Yes |  |
| `incomes` | `[]any` | Yes |  |
| `main` | `map[string]any` | Yes |  |
| `person_id` | `int` | Yes |  |
| `position_en` | `string` | Yes |  |
| `position_ru` | `string` | Yes |  |
| `real_estates` | `[]any` | Yes |  |
| `savings` | `[]any` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `[]any` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `[]any` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Person(nil).List(map[string]any{"convocation_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PersonEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SenatorProfileEntity

```go
senatorProfile := client.SenatorProfile(nil)
fmt.Println(senatorProfile.GetName()) // "senator_profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `birth_date` | `string` | No |  |
| `comments` | `string` | No |  |
| `commission` | `string` | No |  |
| `committee` | `string` | No |  |
| `committees` | `[]any` | No | Empty in the probe; item type unverified. |
| `conclusion` | `string` | No |  |
| `convocations` | `[]any` | No |  |
| `duma_id` | `int` | No | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `bool` | No |  |
| `election_method` | `string` | No |  |
| `end_date` | `string` | No |  |
| `family` | `string` | No |  |
| `fraction` | `string` | No | Faction name. |
| `fraction_group` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | No |  |
| `goverment_body` | `string` | No |  |
| `groups` | `[]any` | No |  |
| `hidden` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `last_appointment` | `string` | No |  |
| `last_import` | `string` | No |  |
| `person` | `int` | Yes |  |
| `photo` | `string` | No |  |
| `position` | `string` | No |  |
| `region` | `any` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float64` | No |  |
| `verified` | `bool` | No |  |
| `vote_link` | `string` | No | Null in every probe; type unverified. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.SenatorProfile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SenatorProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SuccessRateEntity

```go
successRate := client.SuccessRate(nil)
fmt.Println(successRate.GetName()) // "success_rate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_number` | `int` | Yes |  |
| `filtered_number` | `int` | Yes |  |
| `lobbyist_number` | `int` | Yes |  |
| `number` | `int` | Yes |  |
| `rate` | `float64` | Yes | Percentage of proposed bills that passed; null when none were proposed. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.SuccessRate(nil).Load(map[string]any{"person_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SuccessRateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewDumabingoSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

