# Dumabingo PHP SDK Reference

Complete API reference for the Dumabingo PHP SDK.


## DumabingoSDK

### Constructor

```php
require_once __DIR__ . '/dumabingo_sdk.php';

$client = new DumabingoSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DumabingoSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = DumabingoSDK::test();
```


### Instance Methods

#### `DeputyProfile($data = null)`

Create a new `DeputyProfileEntity` instance. Pass `null` for no initial data.

#### `LawDraft($data = null)`

Create a new `LawDraftEntity` instance. Pass `null` for no initial data.

#### `LobbyGroup($data = null)`

Create a new `LobbyGroupEntity` instance. Pass `null` for no initial data.

#### `Lobbyist($data = null)`

Create a new `LobbyistEntity` instance. Pass `null` for no initial data.

#### `Person($data = null)`

Create a new `PersonEntity` instance. Pass `null` for no initial data.

#### `SenatorProfile($data = null)`

Create a new `SenatorProfileEntity` instance. Pass `null` for no initial data.

#### `SuccessRate($data = null)`

Create a new `SuccessRateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): DumabingoUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DeputyProfileEntity

```php
$deputy_profile = $client->DeputyProfile();
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
| `committees` | `array` | No |  |
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
| `groups` | `array` | No |  |
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
| `positions` | `array` | No |  |
| `raw_position` | `string` | No |  |
| `region` | `mixed` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float` | No |  |
| `vote_link` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DeputyProfile()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeputyProfileEntity`

Create a new `DeputyProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LawDraftEntity

```php
$law_draft = $client->LawDraft();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyst_filled` | `bool` | No |  |
| `approved` | `bool` | No |  |
| `committees` | `array` | No | Committee ids. |
| `core` | `string` | No |  |
| `created_by` | `int` | No |  |
| `created_when` | `string` | No |  |
| `departments` | `array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `description` | `string` | No | Null in every probe; type unverified. |
| `entry_date` | `string` | No |  |
| `fact_checked` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `in_watch_list` | `bool` | No |  |
| `initiator_offices` | `array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `initiators` | `array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `is_lobbyist` | `bool` | No |  |
| `keywords` | `array` | No |  |
| `last_update` | `string` | No |  |
| `law_authors` | `array` | No | Declarator person ids of the authors. |
| `lawyer_checked` | `bool` | No |  |
| `link` | `string` | Yes |  |
| `markers` | `array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `modified_by` | `int` | No |  |
| `modified_when` | `string` | No |  |
| `name` | `string` | Yes |  |
| `note` | `string` | No |  |
| `number` | `string` | Yes |  |
| `old_phase` | `string` | No | Null in every probe; type unverified. |
| `parties` | `array` | No | Empty in every probe; item type unverified (probably integer ids). |
| `possible_interested_persons` | `string` | No |  |
| `transcript_url` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LawDraft()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LawDraftEntity`

Create a new `LawDraftEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LobbyGroupEntity

```php
$lobby_group = $client->LobbyGroup();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LobbyGroup()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LobbyGroupEntity`

Create a new `LobbyGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LobbyistEntity

```php
$lobbyist = $client->Lobbyist();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birth_date` | `string` | Yes |  |
| `commission` | `string` | Yes |  |
| `committee` | `string` | Yes |  |
| `committees` | `array` | Yes |  |
| `convocation` | `int` | No |  |
| `convocations` | `array` | Yes |  |
| `draft` | `bool` | No |  |
| `election_method` | `string` | Yes |  |
| `end_date` | `string` | Yes | Free text in the sf dump (e.g. |
| `fraction` | `mixed` | No | Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown. |
| `fraction_end_date` | `string` | No |  |
| `fraction_group` | `string` | No |  |
| `fraction_old` | `string` | No |  |
| `fraction_start_date` | `string` | No |  |
| `fullname` | `string` | Yes |  |
| `gender` | `string` | Yes |  |
| `goverment_body` | `string` | Yes |  |
| `groups` | `array` | Yes | Lobby group ids (listLobbyGroups). |
| `hidden` | `bool` | Yes |  |
| `id` | `int` | Yes | Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council). |
| `last_appointment` | `string` | Yes |  |
| `law_draft_apis` | `array` | No |  |
| `law_draft_count` | `int` | No |  |
| `lobbist` | `int` | No |  |
| `modified_when` | `string` | No |  |
| `person` | `int` | Yes | Declarator person id: use with searchSections and getSuccessRate. |
| `positions` | `array` | No |  |
| `region` | `mixed` | Yes |  |
| `rupep` | `string` | No |  |
| `site` | `string` | Yes | Chamber: 'D' (State Duma) or 'S' (Federation Council). |
| `start_year` | `int` | Yes |  |
| `temp_commission` | `string` | Yes |  |
| `terms_number` | `int` | Yes |  |
| `total_years` | `float` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Lobbyist()->list(["chamber" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LobbyistEntity`

Create a new `LobbyistEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PersonEntity

```php
$person = $client->Person();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `convocations` | `array` | Yes |  |
| `incomes` | `array` | Yes |  |
| `main` | `array` | Yes |  |
| `person_id` | `int` | Yes |  |
| `position_en` | `string` | Yes |  |
| `position_ru` | `string` | Yes |  |
| `real_estates` | `array` | Yes |  |
| `savings` | `array` | Yes | Empty in the probe; item shape unverified. |
| `spendings` | `array` | Yes | Empty in the probe; item shape unverified. |
| `stocks` | `array` | Yes | Empty in the probe; item shape unverified. |
| `vehicles` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Person()->list(["convocation_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PersonEntity`

Create a new `PersonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SenatorProfileEntity

```php
$senator_profile = $client->SenatorProfile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `birth_date` | `string` | No |  |
| `comments` | `string` | No |  |
| `commission` | `string` | No |  |
| `committee` | `string` | No |  |
| `committees` | `array` | No | Empty in the probe; item type unverified. |
| `conclusion` | `string` | No |  |
| `convocations` | `array` | No |  |
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
| `groups` | `array` | No |  |
| `hidden` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `last_appointment` | `string` | No |  |
| `last_import` | `string` | No |  |
| `person` | `int` | Yes |  |
| `photo` | `string` | No |  |
| `position` | `string` | No |  |
| `region` | `mixed` | No |  |
| `relations` | `string` | No |  |
| `site` | `string` | No |  |
| `start_year` | `int` | No |  |
| `submitted` | `string` | No |  |
| `temp_commission` | `string` | No |  |
| `terms_number` | `int` | No |  |
| `total_years` | `float` | No |  |
| `verified` | `bool` | No |  |
| `vote_link` | `string` | No | Null in every probe; type unverified. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SenatorProfile()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SenatorProfileEntity`

Create a new `SenatorProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SuccessRateEntity

```php
$success_rate = $client->SuccessRate();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SuccessRate()->load(["person_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SuccessRateEntity`

Create a new `SuccessRateEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new DumabingoSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

