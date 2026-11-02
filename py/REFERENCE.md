# Dumabingo Python SDK Reference

Complete API reference for the Dumabingo Python SDK.


## DumabingoSDK

### Constructor

```python
from dumabingo_sdk import DumabingoSDK

client = DumabingoSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DumabingoSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DumabingoSDK.test()
```


### Instance Methods

#### `DeputyProfile(data=None)`

Create a new `DeputyProfileEntity` instance. Pass `None` for no initial data.

#### `LawDraft(data=None)`

Create a new `LawDraftEntity` instance. Pass `None` for no initial data.

#### `LobbyGroup(data=None)`

Create a new `LobbyGroupEntity` instance. Pass `None` for no initial data.

#### `Lobbyist(data=None)`

Create a new `LobbyistEntity` instance. Pass `None` for no initial data.

#### `Person(data=None)`

Create a new `PersonEntity` instance. Pass `None` for no initial data.

#### `SenatorProfile(data=None)`

Create a new `SenatorProfileEntity` instance. Pass `None` for no initial data.

#### `SuccessRate(data=None)`

Create a new `SuccessRateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DeputyProfileEntity

```python
deputy_profile = client.DeputyProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appointing_date` | `str` | No | Null in every probe; type unverified. |
| `bio` | `str` | No |  |
| `birth_date` | `str` | No |  |
| `comments` | `str` | No |  |
| `commission` | `str` | No |  |
| `committee` | `str` | No |  |
| `committees` | `list` | No |  |
| `conclusion` | `str` | No |  |
| `convocation` | `int` | No |  |
| `draft` | `bool` | No |  |
| `duma_id` | `int` | No |  |
| `edited` | `bool` | No |  |
| `election_method` | `str` | No |  |
| `end_date` | `str` | No | Free text in the sf dump (e.g. |
| `end_date_old` | `str` | No | Null in every probe; type unverified. |
| `fact_checked` | `bool` | No |  |
| `family` | `str` | No |  |
| `fraction` | `int` | No | Faction id. |
| `fraction_end_date` | `str` | No |  |
| `fraction_group` | `str` | No |  |
| `fraction_old` | `str` | No |  |
| `fraction_start_date` | `str` | No |  |
| `fullname` | `str` | Yes |  |
| `gender` | `str` | No |  |
| `goverment_body` | `str` | No |  |
| `groups` | `list` | No |  |
| `hidden` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `last_appointment` | `str` | No |  |
| `last_import` | `str` | No |  |
| `law_draft_count` | `int` | No |  |
| `lawyer_checked` | `bool` | No |  |
| `lobbist` | `int` | No |  |
| `modified_when` | `str` | No |  |
| `office` | `str` | No | Null in every probe; type unverified. |
| `person` | `int` | Yes |  |
| `photo` | `str` | No |  |
| `positions` | `list` | No |  |
| `raw_position` | `str` | No |  |
| `region` | `Any` | No |  |
| `relations` | `str` | No |  |
| `site` | `str` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `str` | No |  |
| `temp_commission` | `str` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float` | No |  |
| `vote_link` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> DeputyProfileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DeputyProfile().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeputyProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LawDraftEntity

```python
law_draft = client.LawDraft()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `bool` | No |  |
| `approved` | `bool` | No |  |
| `committees` | `list` | No | Committee ids. |
| `core` | `str` | No |  |
| `created_by` | `int` | No |  |
| `created_when` | `str` | No |  |
| `departments` | `list` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `str` | No | Null in every probe; type unverified. |
| `entry_date` | `str` | No |  |
| `fact_checked` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `in_watch_list` | `bool` | No |  |
| `initiator_offices` | `list` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `list` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `bool` | No |  |
| `keywords` | `list` | No |  |
| `last_update` | `str` | No |  |
| `law_authors` | `list` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `bool` | No |  |
| `link` | `str` | Yes |  |
| `markers` | `list` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `int` | No |  |
| `modified_when` | `str` | No |  |
| `name` | `str` | Yes |  |
| `note` | `str` | No |  |
| `number` | `str` | Yes |  |
| `old_phase` | `str` | No | Null in every probe; type unverified. |
| `parties` | `list` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `str` | No |  |
| `transcript_url` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> LawDraftEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LawDraft().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LawDraftEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LobbyGroupEntity

```python
lobby_group = client.LobbyGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | Yes |  |
| `level` | `int` | Yes |  |
| `lft` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `office` | `int` | Yes | Null in every probe; type unverified. |
| `order` | `int` | Yes |  |
| `parent` | `int` | Yes |  |
| `region` | `int` | Yes | Null in every probe; type unverified. |
| `rght` | `int` | Yes |  |
| `tree_id` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LobbyGroupEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LobbyGroup().list()
for lobby_group in results:
    print(lobby_group.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LobbyGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LobbyistEntity

```python
lobbyist = client.Lobbyist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `str` | Yes |  |
| `commission` | `str` | Yes |  |
| `committee` | `str` | Yes |  |
| `committees` | `list` | Yes |  |
| `convocation` | `int` | No |  |
| `convocations` | `list` | Yes |  |
| `draft` | `bool` | No |  |
| `election_method` | `str` | Yes |  |
| `end_date` | `str` | Yes | Free text in the sf dump (e.g. |
| `fraction` | `Any` | No | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `str` | No |  |
| `fraction_group` | `str` | No |  |
| `fraction_old` | `str` | No |  |
| `fraction_start_date` | `str` | No |  |
| `fullname` | `str` | Yes |  |
| `gender` | `str` | Yes |  |
| `goverment_body` | `str` | Yes |  |
| `groups` | `list` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `bool` | Yes |  |
| `id` | `int` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `str` | Yes |  |
| `law_draft_apis` | `list` | No |  |
| `law_draft_count` | `int` | No |  |
| `lobbist` | `int` | No |  |
| `modified_when` | `str` | No |  |
| `person` | `int` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `list` | No |  |
| `region` | `Any` | Yes |  |
| `rupep` | `str` | No |  |
| `site` | `str` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `int` | Yes |  |
| `temp_commission` | `str` | Yes |  |
| `terms_number` | `int` | Yes |  |
| `total_years` | `float` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LobbyistEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Lobbyist().list({"chamber": "example"})
for lobbyist in results:
    print(lobbyist.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LobbyistEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PersonEntity

```python
person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `list` | Yes |  |
| `incomes` | `list` | Yes |  |
| `main` | `dict` | Yes |  |
| `person_id` | `int` | Yes |  |
| `position_en` | `str` | Yes |  |
| `position_ru` | `str` | Yes |  |
| `real_estates` | `list` | Yes |  |
| `savings` | `list` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `list` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `list` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PersonEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Person().list({"convocation_id": 1})
for person in results:
    print(person.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SenatorProfileEntity

```python
senator_profile = client.SenatorProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `str` | No |  |
| `birth_date` | `str` | No |  |
| `comments` | `str` | No |  |
| `commission` | `str` | No |  |
| `committee` | `str` | No |  |
| `committees` | `list` | No | Empty in the probe; item type unverified. |
| `conclusion` | `str` | No |  |
| `convocations` | `list` | No |  |
| `duma_id` | `int` | No | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `bool` | No |  |
| `election_method` | `str` | No |  |
| `end_date` | `str` | No |  |
| `family` | `str` | No |  |
| `fraction` | `str` | No | Faction name. |
| `fraction_group` | `str` | No |  |
| `fullname` | `str` | Yes |  |
| `gender` | `str` | No |  |
| `goverment_body` | `str` | No |  |
| `groups` | `list` | No |  |
| `hidden` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `last_appointment` | `str` | No |  |
| `last_import` | `str` | No |  |
| `person` | `int` | Yes |  |
| `photo` | `str` | No |  |
| `position` | `str` | No |  |
| `region` | `Any` | No |  |
| `relations` | `str` | No |  |
| `site` | `str` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `str` | No |  |
| `temp_commission` | `str` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float` | No |  |
| `verified` | `bool` | No |  |
| `vote_link` | `str` | No | Null in every probe; type unverified. |

### Operations

#### `load(reqmatch, ctrl=None) -> SenatorProfileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SenatorProfile().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SenatorProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SuccessRateEntity

```python
success_rate = client.SuccessRate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_number` | `int` | Yes |  |
| `filtered_number` | `int` | Yes |  |
| `lobbyist_number` | `int` | Yes |  |
| `number` | `int` | Yes |  |
| `rate` | `float` | Yes | Percentage of proposed bills that passed; null when none were proposed. |

### Operations

#### `load(reqmatch, ctrl=None) -> SuccessRateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SuccessRate().load({"person_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuccessRateEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = DumabingoSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

