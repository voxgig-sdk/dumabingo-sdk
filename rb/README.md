# Dumabingo Ruby SDK



The Ruby SDK for the Dumabingo API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.DeputyProfile` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/dumabingo-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/dumabingo-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-dumabingo-sdk", path: "./dumabingo-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Dumabingo_sdk"

client = DumabingoSDK.new
```

### 3. Load a successrate

SuccessRate is nested under person, so provide the `person_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the SuccessRate record (raises on error).
  successrate = client.SuccessRate.load({ "person_id" => 1 })
  puts successrate.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  lawdraft = client.LawDraft.load({ "id" => 1 })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = DumabingoSDK.test({
  "entity" => { "law_draft" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
lawdraft = client.LawDraft.load({ "id" => "test01" })
puts lawdraft.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = DumabingoSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### DumabingoSDK

```ruby
require_relative "Dumabingo_sdk"
client = DumabingoSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = DumabingoSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DumabingoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`DumabingoError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `deputy_profile = client.DeputyProfile`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appointing_date` | `String` | Null in every probe; type unverified. |
| `bio` | `String` |  |
| `birth_date` | `String` |  |
| `comments` | `String` |  |
| `commission` | `String` |  |
| `committee` | `String` |  |
| `committees` | `Array` |  |
| `conclusion` | `String` |  |
| `convocation` | `Integer` |  |
| `draft` | `Boolean` |  |
| `duma_id` | `Integer` |  |
| `edited` | `Boolean` |  |
| `election_method` | `String` |  |
| `end_date` | `String` | Free text in the sf dump (e.g. |
| `end_date_old` | `String` | Null in every probe; type unverified. |
| `fact_checked` | `Boolean` |  |
| `family` | `String` |  |
| `fraction` | `Integer` | Faction id. |
| `fraction_end_date` | `String` |  |
| `fraction_group` | `String` |  |
| `fraction_old` | `String` |  |
| `fraction_start_date` | `String` |  |
| `fullname` | `String` |  |
| `gender` | `String` |  |
| `goverment_body` | `String` |  |
| `groups` | `Array` |  |
| `hidden` | `Boolean` |  |
| `id` | `Integer` |  |
| `last_appointment` | `String` |  |
| `last_import` | `String` |  |
| `law_draft_count` | `Integer` |  |
| `lawyer_checked` | `Boolean` |  |
| `lobbist` | `Integer` |  |
| `modified_when` | `String` |  |
| `office` | `String` | Null in every probe; type unverified. |
| `person` | `Integer` |  |
| `photo` | `String` |  |
| `positions` | `Array` |  |
| `raw_position` | `String` |  |
| `region` | `Object` |  |
| `relations` | `String` |  |
| `site` | `String` |  |
| `start_year` | `Integer` |  |
| `submitted` | `String` |  |
| `temp_commission` | `String` |  |
| `terms_number` | `Integer` |  |
| `total_years` | `Float` |  |
| `vote_link` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeputyProfile record (raises on error).
deputy_profile = client.DeputyProfile.load({ "id" => 1 })
```


### LawDraft

Create an instance: `law_draft = client.LawDraft`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyst_filled` | `Boolean` |  |
| `approved` | `Boolean` |  |
| `committees` | `Array` | Committee ids. |
| `core` | `String` |  |
| `created_by` | `Integer` |  |
| `created_when` | `String` |  |
| `departments` | `Array` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `String` | Null in every probe; type unverified. |
| `entry_date` | `String` |  |
| `fact_checked` | `Boolean` |  |
| `id` | `Integer` |  |
| `in_watch_list` | `Boolean` |  |
| `initiator_offices` | `Array` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `Array` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `Boolean` |  |
| `keywords` | `Array` |  |
| `last_update` | `String` |  |
| `law_authors` | `Array` | Declarator person ids of the authors. |
| `lawyer_checked` | `Boolean` |  |
| `link` | `String` |  |
| `markers` | `Array` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `Integer` |  |
| `modified_when` | `String` |  |
| `name` | `String` |  |
| `note` | `String` |  |
| `number` | `String` |  |
| `old_phase` | `String` | Null in every probe; type unverified. |
| `parties` | `Array` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `String` |  |
| `transcript_url` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LawDraft record (raises on error).
law_draft = client.LawDraft.load({ "id" => 1 })
```


### LobbyGroup

Create an instance: `lobby_group = client.LobbyGroup`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` |  |
| `level` | `Integer` |  |
| `lft` | `Integer` |  |
| `name` | `String` |  |
| `office` | `Integer` | Null in every probe; type unverified. |
| `order` | `Integer` |  |
| `parent` | `Integer` |  |
| `region` | `Integer` | Null in every probe; type unverified. |
| `rght` | `Integer` |  |
| `tree_id` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of LobbyGroup entities, one per record (raises on error).
lobby_groups = client.LobbyGroup.list
lobby_groups.each { |item| puts item.data_get }
```


### Lobbyist

Create an instance: `lobbyist = client.Lobbyist`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_date` | `String` |  |
| `commission` | `String` |  |
| `committee` | `String` |  |
| `committees` | `Array` |  |
| `convocation` | `Integer` |  |
| `convocations` | `Array` |  |
| `draft` | `Boolean` |  |
| `election_method` | `String` |  |
| `end_date` | `String` | Free text in the sf dump (e.g. |
| `fraction` | `Object` | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `String` |  |
| `fraction_group` | `String` |  |
| `fraction_old` | `String` |  |
| `fraction_start_date` | `String` |  |
| `fullname` | `String` |  |
| `gender` | `String` |  |
| `goverment_body` | `String` |  |
| `groups` | `Array` | Lobby group ids (listLobbyGroups). |
| `hidden` | `Boolean` |  |
| `id` | `Integer` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `String` |  |
| `law_draft_apis` | `Array` |  |
| `law_draft_count` | `Integer` |  |
| `lobbist` | `Integer` |  |
| `modified_when` | `String` |  |
| `person` | `Integer` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `Array` |  |
| `region` | `Object` |  |
| `rupep` | `String` |  |
| `site` | `String` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `Integer` |  |
| `temp_commission` | `String` |  |
| `terms_number` | `Integer` |  |
| `total_years` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of Lobbyist entities, one per record (raises on error).
lobbyists = client.Lobbyist.list({ "chamber" => "example" })
lobbyists.each { |item| puts item.data_get }
```


### Person

Create an instance: `person = client.Person`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `convocations` | `Array` |  |
| `incomes` | `Array` |  |
| `main` | `Hash` |  |
| `person_id` | `Integer` |  |
| `position_en` | `String` |  |
| `position_ru` | `String` |  |
| `real_estates` | `Array` |  |
| `savings` | `Array` | Empty in the probe; item shape unverified. |
| `spendings` | `Array` | Empty in the probe; item shape unverified. |
| `stocks` | `Array` | Empty in the probe; item shape unverified. |
| `vehicles` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Person entities, one per record (raises on error).
persons = client.Person.list({ "convocation_id" => 1 })
persons.each { |item| puts item.data_get }
```


### SenatorProfile

Create an instance: `senator_profile = client.SenatorProfile`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `String` |  |
| `birth_date` | `String` |  |
| `comments` | `String` |  |
| `commission` | `String` |  |
| `committee` | `String` |  |
| `committees` | `Array` | Empty in the probe; item type unverified. |
| `conclusion` | `String` |  |
| `convocations` | `Array` |  |
| `duma_id` | `Integer` | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `Boolean` |  |
| `election_method` | `String` |  |
| `end_date` | `String` |  |
| `family` | `String` |  |
| `fraction` | `String` | Faction name. |
| `fraction_group` | `String` |  |
| `fullname` | `String` |  |
| `gender` | `String` |  |
| `goverment_body` | `String` |  |
| `groups` | `Array` |  |
| `hidden` | `Boolean` |  |
| `id` | `Integer` |  |
| `last_appointment` | `String` |  |
| `last_import` | `String` |  |
| `person` | `Integer` |  |
| `photo` | `String` |  |
| `position` | `String` |  |
| `region` | `Object` |  |
| `relations` | `String` |  |
| `site` | `String` |  |
| `start_year` | `Integer` |  |
| `submitted` | `String` |  |
| `temp_commission` | `String` |  |
| `terms_number` | `Integer` |  |
| `total_years` | `Float` |  |
| `verified` | `Boolean` |  |
| `vote_link` | `String` | Null in every probe; type unverified. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SenatorProfile record (raises on error).
senator_profile = client.SenatorProfile.load({ "id" => 1 })
```


### SuccessRate

Create an instance: `success_rate = client.SuccessRate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_number` | `Integer` |  |
| `filtered_number` | `Integer` |  |
| `lobbyist_number` | `Integer` |  |
| `number` | `Integer` |  |
| `rate` | `Float` | Percentage of proposed bills that passed; null when none were proposed. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SuccessRate record (raises on error).
success_rate = client.SuccessRate.load({ "person_id" => 1 })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Dumabingo_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Dumabingo_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
lawdraft = client.LawDraft
lawdraft.load({ "id" => 1 })

# lawdraft.data_get now returns the lawdraft data from the last load
# lawdraft.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
