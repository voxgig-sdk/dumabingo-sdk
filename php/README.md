# Dumabingo PHP SDK



The PHP SDK for the Dumabingo API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->DeputyProfile()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/dumabingo-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/dumabingo-sdk
composer config repositories.dumabingo-sdk path ./dumabingo-sdk/php
composer require voxgig-sdk/dumabingo-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'dumabingo_sdk.php';

$client = new DumabingoSDK();
```

### 3. Load a successrate

SuccessRate is nested under person, so provide the `person_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the SuccessRate record (throws on error).
    $successrate = $client->SuccessRate()->load(["person_id" => 1]);
    print_r($successrate->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $lawdraft = $client->LawDraft()->load(["id" => 1]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = DumabingoSDK::test([
    "entity" => ["senator_profile" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$senatorprofile = $client->SenatorProfile()->load(["id" => "test01"]);
print_r($senatorprofile->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new DumabingoSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
DUMABINGO_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### DumabingoSDK

```php
require_once 'dumabingo_sdk.php';
$client = new DumabingoSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = DumabingoSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### DumabingoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `DeputyProfile` | `($data): DeputyProfileEntity` | Create a DeputyProfile entity instance. |
| `LawDraft` | `($data): LawDraftEntity` | Create a LawDraft entity instance. |
| `LobbyGroup` | `($data): LobbyGroupEntity` | Create a LobbyGroup entity instance. |
| `Lobbyist` | `($data): LobbyistEntity` | Create a Lobbyist entity instance. |
| `Person` | `($data): PersonEntity` | Create a Person entity instance. |
| `SenatorProfile` | `($data): SenatorProfileEntity` | Create a SenatorProfile entity instance. |
| `SuccessRate` | `($data): SuccessRateEntity` | Create a SuccessRate entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$deputy_profile = $client->DeputyProfile();`

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
| `committees` | `array` |  |
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
| `groups` | `array` |  |
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
| `positions` | `array` |  |
| `raw_position` | `string` |  |
| `region` | `mixed` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `int` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float` |  |
| `vote_link` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DeputyProfile record (throws on error).
$deputy_profile = $client->DeputyProfile()->load(["id" => 1]);
```


### LawDraft

Create an instance: `$law_draft = $client->LawDraft();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyst_filled` | `bool` |  |
| `approved` | `bool` |  |
| `committees` | `array` | Committee ids. |
| `core` | `string` |  |
| `created_by` | `int` |  |
| `created_when` | `string` |  |
| `departments` | `array` | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | Null in every probe; type unverified. |
| `entry_date` | `string` |  |
| `fact_checked` | `bool` |  |
| `id` | `int` |  |
| `in_watch_list` | `bool` |  |
| `initiator_offices` | `array` | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `array` | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `bool` |  |
| `keywords` | `array` |  |
| `last_update` | `string` |  |
| `law_authors` | `array` | Declarator person ids of the authors. |
| `lawyer_checked` | `bool` |  |
| `link` | `string` |  |
| `markers` | `array` | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `int` |  |
| `modified_when` | `string` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `number` | `string` |  |
| `old_phase` | `string` | Null in every probe; type unverified. |
| `parties` | `array` | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` |  |
| `transcript_url` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LawDraft record (throws on error).
$law_draft = $client->LawDraft()->load(["id" => 1]);
```


### LobbyGroup

Create an instance: `$lobby_group = $client->LobbyGroup();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```php
// list() returns an array of LobbyGroup entities, one per record (throws on error).
$lobby_groups = $client->LobbyGroup()->list();
```


### Lobbyist

Create an instance: `$lobbyist = $client->Lobbyist();`

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
| `committees` | `array` |  |
| `convocation` | `int` |  |
| `convocations` | `array` |  |
| `draft` | `bool` |  |
| `election_method` | `string` |  |
| `end_date` | `string` | Free text in the sf dump (e.g. |
| `fraction` | `mixed` | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `string` |  |
| `fraction_group` | `string` |  |
| `fraction_old` | `string` |  |
| `fraction_start_date` | `string` |  |
| `fullname` | `string` |  |
| `gender` | `string` |  |
| `goverment_body` | `string` |  |
| `groups` | `array` | Lobby group ids (listLobbyGroups). |
| `hidden` | `bool` |  |
| `id` | `int` | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` |  |
| `law_draft_apis` | `array` |  |
| `law_draft_count` | `int` |  |
| `lobbist` | `int` |  |
| `modified_when` | `string` |  |
| `person` | `int` | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `array` |  |
| `region` | `mixed` |  |
| `rupep` | `string` |  |
| `site` | `string` | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `int` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float` |  |

#### Example: List

```php
// list() returns an array of Lobbyist entities, one per record (throws on error).
$lobbyists = $client->Lobbyist()->list(["chamber" => "example"]);
```


### Person

Create an instance: `$person = $client->Person();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `convocations` | `array` |  |
| `incomes` | `array` |  |
| `main` | `array` |  |
| `person_id` | `int` |  |
| `position_en` | `string` |  |
| `position_ru` | `string` |  |
| `real_estates` | `array` |  |
| `savings` | `array` | Empty in the probe; item shape unverified. |
| `spendings` | `array` | Empty in the probe; item shape unverified. |
| `stocks` | `array` | Empty in the probe; item shape unverified. |
| `vehicles` | `array` |  |

#### Example: List

```php
// list() returns an array of Person entities, one per record (throws on error).
$persons = $client->Person()->list(["convocation_id" => 1]);
```


### SenatorProfile

Create an instance: `$senator_profile = $client->SenatorProfile();`

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
| `committees` | `array` | Empty in the probe; item type unverified. |
| `conclusion` | `string` |  |
| `convocations` | `array` |  |
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
| `groups` | `array` |  |
| `hidden` | `bool` |  |
| `id` | `int` |  |
| `last_appointment` | `string` |  |
| `last_import` | `string` |  |
| `person` | `int` |  |
| `photo` | `string` |  |
| `position` | `string` |  |
| `region` | `mixed` |  |
| `relations` | `string` |  |
| `site` | `string` |  |
| `start_year` | `int` |  |
| `submitted` | `string` |  |
| `temp_commission` | `string` |  |
| `terms_number` | `int` |  |
| `total_years` | `float` |  |
| `verified` | `bool` |  |
| `vote_link` | `string` | Null in every probe; type unverified. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SenatorProfile record (throws on error).
$senator_profile = $client->SenatorProfile()->load(["id" => 1]);
```


### SuccessRate

Create an instance: `$success_rate = $client->SuccessRate();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_number` | `int` |  |
| `filtered_number` | `int` |  |
| `lobbyist_number` | `int` |  |
| `number` | `int` |  |
| `rate` | `float` | Percentage of proposed bills that passed; null when none were proposed. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SuccessRate record (throws on error).
$success_rate = $client->SuccessRate()->load(["person_id" => 1]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── dumabingo_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`dumabingo_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$lawdraft = $client->LawDraft();
$lawdraft->load(["id" => 1]);

// $lawdraft->data_get() now returns the lawdraft data from the last load
// $lawdraft->match_get() returns the last match criteria
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
