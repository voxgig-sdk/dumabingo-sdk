# Dumabingo Lua SDK



The Lua SDK for the Dumabingo API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:DeputyProfile()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/dumabingo-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("dumabingo_sdk")

local client = sdk.new()
```

### 3. Load a successrate

SuccessRate is nested under person, so provide the `person_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local successrate, err = client:SuccessRate():load({ person_id = 1 })
if err then error(err) end
for k, val in pairs(successrate:data_get()) do print(k, val) end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local lawdraft, err = client:LawDraft():load({ id = 1 })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:LawDraft():load({ id = "test01" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DUMABINGO_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### DumabingoSDK

```lua
local sdk = require("dumabingo_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DumabingoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `DeputyProfile` | `(data) -> DeputyProfileEntity` | Create a DeputyProfile entity instance. |
| `LawDraft` | `(data) -> LawDraftEntity` | Create a LawDraft entity instance. |
| `LobbyGroup` | `(data) -> LobbyGroupEntity` | Create a LobbyGroup entity instance. |
| `Lobbyist` | `(data) -> LobbyistEntity` | Create a Lobbyist entity instance. |
| `Person` | `(data) -> PersonEntity` | Create a Person entity instance. |
| `SenatorProfile` | `(data) -> SenatorProfileEntity` | Create a SenatorProfile entity instance. |
| `SuccessRate` | `(data) -> SuccessRateEntity` | Create a SuccessRate entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local deputy_profile, err = client:DeputyProfile():load({ id = "example_id" })
    if err then error(err) end
    -- deputy_profile is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Operations: Load.

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

Operations: Load.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: Load.

API path: `/api/lobbist/{id}/`

#### SuccessRate

| Field | Description |
| --- | --- |
| `approved_number` |  |
| `filtered_number` |  |
| `lobbyist_number` |  |
| `number` |  |
| `rate` | Percentage of proposed bills that passed; null when none were proposed. |

Operations: Load.

API path: `/api/persons/{personId}/success_rate`



## Entities


### DeputyProfile

Create an instance: `local deputy_profile = client:DeputyProfile(nil)`

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
| `committees` | `table` |  |
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
| `groups` | `table` |  |
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
| `positions` | `table` |  |
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

```lua
local deputy_profile, err = client:DeputyProfile():load({ id = 1 })
```


### LawDraft

Create an instance: `local law_draft = client:LawDraft(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyst_filled` | `boolean` |  |
| `approved` | `boolean` |  |
| `committees` | `table` | Committee ids. |
| `core` | `string` |  |
| `created_by` | `number` |  |
| `created_when` | `string` |  |
| `departments` | `table` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | Null in every probe; type unverified. |
| `entry_date` | `string` |  |
| `fact_checked` | `boolean` |  |
| `id` | `number` |  |
| `in_watch_list` | `boolean` |  |
| `initiator_offices` | `table` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `table` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `boolean` |  |
| `keywords` | `table` |  |
| `last_update` | `string` |  |
| `law_authors` | `table` | Declarator person ids of the authors. |
| `lawyer_checked` | `boolean` |  |
| `link` | `string` |  |
| `markers` | `table` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `number` |  |
| `modified_when` | `string` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `number` | `string` |  |
| `old_phase` | `string` | Null in every probe; type unverified. |
| `parties` | `table` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` |  |
| `transcript_url` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```lua
local law_draft, err = client:LawDraft():load({ id = 1 })
```


### LobbyGroup

Create an instance: `local lobby_group = client:LobbyGroup(nil)`

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

```lua
local lobby_groups, err = client:LobbyGroup():list()
```


### Lobbyist

Create an instance: `local lobbyist = client:Lobbyist(nil)`

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
| `committees` | `table` |  |
| `convocation` | `number` |  |
| `convocations` | `table` |  |
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
| `groups` | `table` | Lobby group ids (listLobbyGroups). |
| `hidden` | `boolean` |  |
| `id` | `number` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` |  |
| `law_draft_apis` | `table` |  |
| `law_draft_count` | `number` |  |
| `lobbist` | `number` |  |
| `modified_when` | `string` |  |
| `person` | `number` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `table` |  |
| `region` | `any` |  |
| `rupep` | `string` |  |
| `site` | `string` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `number` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `number` |  |
| `total_years` | `number` |  |

#### Example: List

```lua
local lobbyists, err = client:Lobbyist():list({ chamber = "example" })
```


### Person

Create an instance: `local person = client:Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `convocations` | `table` |  |
| `incomes` | `table` |  |
| `main` | `table` |  |
| `person_id` | `number` |  |
| `position_en` | `string` |  |
| `position_ru` | `string` |  |
| `real_estates` | `table` |  |
| `savings` | `table` | Empty in the probe; item shape unverified. |
| `spendings` | `table` | Empty in the probe; item shape unverified. |
| `stocks` | `table` | Empty in the probe; item shape unverified. |
| `vehicles` | `table` |  |

#### Example: List

```lua
local persons, err = client:Person():list({ convocation_id = 1 })
```


### SenatorProfile

Create an instance: `local senator_profile = client:SenatorProfile(nil)`

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
| `committees` | `table` | Empty in the probe; item type unverified. |
| `conclusion` | `string` |  |
| `convocations` | `table` |  |
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
| `groups` | `table` |  |
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

```lua
local senator_profile, err = client:SenatorProfile():load({ id = 1 })
```


### SuccessRate

Create an instance: `local success_rate = client:SuccessRate(nil)`

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

```lua
local success_rate, err = client:SuccessRate():load({ person_id = 1 })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── dumabingo_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`dumabingo_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local lawdraft = client:LawDraft()
lawdraft:load({ id = 1 })

-- lawdraft:data_get() now returns the lawdraft data from the last load
-- lawdraft:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
