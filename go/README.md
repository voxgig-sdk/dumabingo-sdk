# Dumabingo Golang SDK



The Golang SDK for the Dumabingo API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.DeputyProfile(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/dumabingo-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/dumabingo-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/dumabingo-sdk/go=../dumabingo-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/dumabingo-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single deputyProfile — the value is the entity; Data() reads its record.
    deputyProfile, err := client.DeputyProfile(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(deputyProfile.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
lawdraft, err := client.LawDraft(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    // handle err
    return
}
_ = lawdraft
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

lawDraft, err := client.LawDraft(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(lawDraft.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewDumabingoSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewDumabingoSDK

```go
func NewDumabingoSDK(options map[string]any) *DumabingoSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *DumabingoSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DumabingoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `DeputyProfile` | `(data map[string]any) DumabingoEntityBase` | Create a DeputyProfile entity instance. |
| `LawDraft` | `(data map[string]any) DumabingoEntityBase` | Create a LawDraft entity instance. |
| `LobbyGroup` | `(data map[string]any) DumabingoEntityBase` | Create a LobbyGroup entity instance. |
| `Lobbyist` | `(data map[string]any) DumabingoEntityBase` | Create a Lobbyist entity instance. |
| `Person` | `(data map[string]any) DumabingoEntityBase` | Create a Person entity instance. |
| `SenatorProfile` | `(data map[string]any) DumabingoEntityBase` | Create a SenatorProfile entity instance. |
| `SuccessRate` | `(data map[string]any) DumabingoEntityBase` | Create a SuccessRate entity instance. |

### Entity interface (DumabingoEntityBase)

All entities implement the `DumabingoEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    deputyProfile, err := client.DeputyProfile(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // deputyProfile is the entity; deputyProfile.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### DeputyProfile

| Field | Description |
| --- | --- |
| `"appointing_date"` | Null in every probe; type unverified. |
| `"bio"` |  |
| `"birth_date"` |  |
| `"comments"` |  |
| `"commission"` |  |
| `"committee"` |  |
| `"committees"` |  |
| `"conclusion"` |  |
| `"convocation"` |  |
| `"draft"` |  |
| `"duma_id"` |  |
| `"edited"` |  |
| `"election_method"` |  |
| `"end_date"` | Free text in the sf dump (e.g. |
| `"end_date_old"` | Null in every probe; type unverified. |
| `"fact_checked"` |  |
| `"family"` |  |
| `"fraction"` | Faction id. |
| `"fraction_end_date"` |  |
| `"fraction_group"` |  |
| `"fraction_old"` |  |
| `"fraction_start_date"` |  |
| `"fullname"` |  |
| `"gender"` |  |
| `"goverment_body"` |  |
| `"groups"` |  |
| `"hidden"` |  |
| `"id"` |  |
| `"last_appointment"` |  |
| `"last_import"` |  |
| `"law_draft_count"` |  |
| `"lawyer_checked"` |  |
| `"lobbist"` |  |
| `"modified_when"` |  |
| `"office"` | Null in every probe; type unverified. |
| `"person"` |  |
| `"photo"` |  |
| `"positions"` |  |
| `"raw_position"` |  |
| `"region"` |  |
| `"relations"` |  |
| `"site"` |  |
| `"start_year"` |  |
| `"submitted"` |  |
| `"temp_commission"` |  |
| `"terms_number"` |  |
| `"total_years"` |  |
| `"vote_link"` |  |

Operations: Load.

API path: `/api/lobbist_detail/{id}/`

#### LawDraft

| Field | Description |
| --- | --- |
| `"analyst_filled"` |  |
| `"approved"` |  |
| `"committees"` | Committee ids. |
| `"core"` |  |
| `"created_by"` |  |
| `"created_when"` |  |
| `"departments"` | Empty in every probe; item type unverified (probably integer ids). |
| `"description"` | Null in every probe; type unverified. |
| `"entry_date"` |  |
| `"fact_checked"` |  |
| `"id"` |  |
| `"in_watch_list"` |  |
| `"initiator_offices"` | Empty in every probe; item type unverified (probably integer ids). |
| `"initiators"` | Empty in every probe; item type unverified (probably integer ids). |
| `"is_lobbyist"` |  |
| `"keywords"` |  |
| `"last_update"` |  |
| `"law_authors"` | Declarator person ids of the authors. |
| `"lawyer_checked"` |  |
| `"link"` |  |
| `"markers"` | Empty in every probe; item type unverified (probably integer ids). |
| `"modified_by"` |  |
| `"modified_when"` |  |
| `"name"` |  |
| `"note"` |  |
| `"number"` |  |
| `"old_phase"` | Null in every probe; type unverified. |
| `"parties"` | Empty in every probe; item type unverified (probably integer ids). |
| `"possible_interested_persons"` |  |
| `"transcript_url"` |  |
| `"type"` |  |

Operations: Load.

API path: `/api/law_draft_api/{id}/`

#### LobbyGroup

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"level"` |  |
| `"lft"` |  |
| `"name"` |  |
| `"office"` | Null in every probe; type unverified. |
| `"order"` |  |
| `"parent"` |  |
| `"region"` | Null in every probe; type unverified. |
| `"rght"` |  |
| `"tree_id"` |  |

Operations: List.

API path: `/api/lobby_group/`

#### Lobbyist

| Field | Description |
| --- | --- |
| `"birth_date"` |  |
| `"commission"` |  |
| `"committee"` |  |
| `"committees"` |  |
| `"convocation"` |  |
| `"convocations"` |  |
| `"draft"` |  |
| `"election_method"` |  |
| `"end_date"` | Free text in the sf dump (e.g. |
| `"fraction"` | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `"fraction_end_date"` |  |
| `"fraction_group"` |  |
| `"fraction_old"` |  |
| `"fraction_start_date"` |  |
| `"fullname"` |  |
| `"gender"` |  |
| `"goverment_body"` |  |
| `"groups"` | Lobby group ids (listLobbyGroups). |
| `"hidden"` |  |
| `"id"` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `"last_appointment"` |  |
| `"law_draft_apis"` |  |
| `"law_draft_count"` |  |
| `"lobbist"` |  |
| `"modified_when"` |  |
| `"person"` | Declarator person id: use with searchSections and getSuccessRate. |
| `"positions"` |  |
| `"region"` |  |
| `"rupep"` |  |
| `"site"` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `"start_year"` |  |
| `"temp_commission"` |  |
| `"terms_number"` |  |
| `"total_years"` |  |

Operations: List.

API path: `/media/dumps/lobbist-small-{chamber}.json`

#### Person

| Field | Description |
| --- | --- |
| `"convocations"` |  |
| `"incomes"` |  |
| `"main"` |  |
| `"person_id"` |  |
| `"position_en"` |  |
| `"position_ru"` |  |
| `"real_estates"` |  |
| `"savings"` | Empty in the probe; item shape unverified. |
| `"spendings"` | Empty in the probe; item shape unverified. |
| `"stocks"` | Empty in the probe; item shape unverified. |
| `"vehicles"` |  |

Operations: List.

API path: `/api/convocations/{convocationId}/person_convocations`

#### SenatorProfile

| Field | Description |
| --- | --- |
| `"bio"` |  |
| `"birth_date"` |  |
| `"comments"` |  |
| `"commission"` |  |
| `"committee"` |  |
| `"committees"` | Empty in the probe; item type unverified. |
| `"conclusion"` |  |
| `"convocations"` |  |
| `"duma_id"` | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `"edited"` |  |
| `"election_method"` |  |
| `"end_date"` |  |
| `"family"` |  |
| `"fraction"` | Faction name. |
| `"fraction_group"` |  |
| `"fullname"` |  |
| `"gender"` |  |
| `"goverment_body"` |  |
| `"groups"` |  |
| `"hidden"` |  |
| `"id"` |  |
| `"last_appointment"` |  |
| `"last_import"` |  |
| `"person"` |  |
| `"photo"` |  |
| `"position"` |  |
| `"region"` |  |
| `"relations"` |  |
| `"site"` |  |
| `"start_year"` |  |
| `"submitted"` |  |
| `"temp_commission"` |  |
| `"terms_number"` |  |
| `"total_years"` |  |
| `"verified"` |  |
| `"vote_link"` | Null in every probe; type unverified. |

Operations: Load.

API path: `/api/lobbist/{id}/`

#### SuccessRate

| Field | Description |
| --- | --- |
| `"approved_number"` |  |
| `"filtered_number"` |  |
| `"lobbyist_number"` |  |
| `"number"` |  |
| `"rate"` | Percentage of proposed bills that passed; null when none were proposed. |

Operations: Load.

API path: `/api/persons/{personId}/success_rate`



## Entities


### DeputyProfile

Create an instance: `deputyProfile := client.DeputyProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appointing_date` | `string` | Null in every probe; type unverified. |
| `bio` | `string` |  |
| `birth_date` | `string` |  |
| `comments` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `[]any` |  |
| `conclusion` | `string` |  |
| `convocation` | `int` |  |
| `draft` | `bool` |  |
| `duma_id` | `int` |  |
| `edited` | `bool` |  |
| `election_method` | `string` |  |
| `end_date` | `string` | Free text in the sf dump (e.g. |
| `end_date_old` | `string` | Null in every probe; type unverified. |
| `fact_checked` | `bool` |  |
| `family` | `string` |  |
| `fraction` | `int` | Faction id. |
| `fraction_end_date` | `string` |  |
| `fraction_group` | `string` |  |
| `fraction_old` | `string` |  |
| `fraction_start_date` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `[]any` |  |
| `hidden` | `bool` |  |
| `id` | `int` |  |
| `last_appointment` | `string` |  |
| `last_import` | `string` |  |
| `law_draft_count` | `int` |  |
| `lawyer_checked` | `bool` |  |
| `lobbist` | `int` |  |
| `modified_when` | `string` |  |
| `office` | `string` | Null in every probe; type unverified. |
| `person` | `int` |  |
| `photo` | `string` |  |
| `positions` | `[]any` |  |
| `raw_position` | `string` |  |
| `region` | `any` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `int` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float64` |  |
| `vote_link` | `string` |  |

#### Example: Load

```go
deputyProfile, err := client.DeputyProfile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deputyProfile.(sdk.Entity).Data()) // the loaded entity's record
```


### LawDraft

Create an instance: `lawDraft := client.LawDraft(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyst_filled` | `bool` |  |
| `approved` | `bool` |  |
| `committees` | `[]any` | Committee ids. |
| `core` | `string` |  |
| `created_by` | `int` |  |
| `created_when` | `string` |  |
| `departments` | `[]any` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | Null in every probe; type unverified. |
| `entry_date` | `string` |  |
| `fact_checked` | `bool` |  |
| `id` | `int` |  |
| `in_watch_list` | `bool` |  |
| `initiator_offices` | `[]any` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `[]any` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `bool` |  |
| `keywords` | `[]any` |  |
| `last_update` | `string` |  |
| `law_authors` | `[]any` | Declarator person ids of the authors. |
| `lawyer_checked` | `bool` |  |
| `link` | `string` |  |
| `markers` | `[]any` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `int` |  |
| `modified_when` | `string` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `number` | `string` |  |
| `old_phase` | `string` | Null in every probe; type unverified. |
| `parties` | `[]any` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` |  |
| `transcript_url` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
lawDraft, err := client.LawDraft(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(lawDraft.(sdk.Entity).Data()) // the loaded entity's record
```


### LobbyGroup

Create an instance: `lobbyGroup := client.LobbyGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `level` | `int` |  |
| `lft` | `int` |  |
| `name` | `string` |  |
| `office` | `int` | Null in every probe; type unverified. |
| `order` | `int` |  |
| `parent` | `int` |  |
| `region` | `int` | Null in every probe; type unverified. |
| `rght` | `int` |  |
| `tree_id` | `int` |  |

#### Example: List

```go
lobbyGroups, err := client.LobbyGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range lobbyGroups.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Lobbyist

Create an instance: `lobbyist := client.Lobbyist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birth_date` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `[]any` |  |
| `convocation` | `int` |  |
| `convocations` | `[]any` |  |
| `draft` | `bool` |  |
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
| `groups` | `[]any` | Lobby group ids (listLobbyGroups). |
| `hidden` | `bool` |  |
| `id` | `int` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` |  |
| `law_draft_apis` | `[]any` |  |
| `law_draft_count` | `int` |  |
| `lobbist` | `int` |  |
| `modified_when` | `string` |  |
| `person` | `int` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `[]any` |  |
| `region` | `any` |  |
| `rupep` | `string` |  |
| `site` | `string` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `int` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float64` |  |

#### Example: List

```go
lobbyists, err := client.Lobbyist(nil).List(map[string]any{"chamber": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range lobbyists.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Person

Create an instance: `person := client.Person(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `convocations` | `[]any` |  |
| `incomes` | `[]any` |  |
| `main` | `map[string]any` |  |
| `person_id` | `int` |  |
| `position_en` | `string` |  |
| `position_ru` | `string` |  |
| `real_estates` | `[]any` |  |
| `savings` | `[]any` | Empty in the probe; item shape unverified. |
| `spendings` | `[]any` | Empty in the probe; item shape unverified. |
| `stocks` | `[]any` | Empty in the probe; item shape unverified. |
| `vehicles` | `[]any` |  |

#### Example: List

```go
persons, err := client.Person(nil).List(map[string]any{"convocation_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range persons.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SenatorProfile

Create an instance: `senatorProfile := client.SenatorProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` |  |
| `birth_date` | `string` |  |
| `comments` | `string` |  |
| `commission` | `string` |  |
| `committee` | `string` |  |
| `committees` | `[]any` | Empty in the probe; item type unverified. |
| `conclusion` | `string` |  |
| `convocations` | `[]any` |  |
| `duma_id` | `int` | State Duma id; null for senators in the probe (an integer in Duma profiles). |
| `edited` | `bool` |  |
| `election_method` | `string` |  |
| `end_date` | `string` |  |
| `family` | `string` |  |
| `fraction` | `string` | Faction name. |
| `fraction_group` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `[]any` |  |
| `hidden` | `bool` |  |
| `id` | `int` |  |
| `last_appointment` | `string` |  |
| `last_import` | `string` |  |
| `person` | `int` |  |
| `photo` | `string` |  |
| `position` | `string` |  |
| `region` | `any` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `int` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float64` |  |
| `verified` | `bool` |  |
| `vote_link` | `string` | Null in every probe; type unverified. |

#### Example: Load

```go
senatorProfile, err := client.SenatorProfile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(senatorProfile.(sdk.Entity).Data()) // the loaded entity's record
```


### SuccessRate

Create an instance: `successRate := client.SuccessRate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_number` | `int` |  |
| `filtered_number` | `int` |  |
| `lobbyist_number` | `int` |  |
| `number` | `int` |  |
| `rate` | `float64` | Percentage of proposed bills that passed; null when none were proposed. |

#### Example: Load

```go
successRate, err := client.SuccessRate(nil).Load(map[string]any{"person_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(successRate.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/dumabingo-sdk/go/
├── dumabingo.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/dumabingo-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
lawdraft := client.LawDraft(nil)
lawdraft.Load(map[string]any{"id": 1}, nil)

// lawdraft.Data() now returns the lawdraft data from the last load
// lawdraft.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
