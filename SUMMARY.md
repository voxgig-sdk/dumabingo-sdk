# DumaBingo API (Declarator)

Unofficial: the Declarator (`api.deklarator.org`) endpoints behind dumabingo.org, an interactive map of the lobbying ties of Russian State Duma deputies and Federation Council senators: deputies, lobby groups, bills, bill success rates and officials&#39; asset declarations. Not documented. Endpoint list from the Swift client https://github.com/l0v3m0n3y/dumabingo (src/dumabingo.swift), plus GET /api/lobbist/&#123;id&#125;/ (senator profiles) and the d7/d8/sf dump names, both taken from the dumabingo.org front-end bundle. Every schema was taken from live GET probes on 2026-10-23 (no key). The client&#39;s two other calls live on another host (https://dumabingo.org/assets/data/rating.json and alias.json, both static JSON) and are not modelled. Text is Russian; bio/conclusion/relations/submitted are HTML. NOTE: searchSections returns officials&#39; published anti-corruption asset declarations, including the income, property and vehicles of spouses and children. Unverified: fields that were null or empty in every probe (marked in their descriptions), pagination parameters of searchSections, and whether format=json is required (it was always sent).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 8 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### DeputyProfile

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `appointing_date`: Null in every probe; type unverified.
- `end_date`: Free text in the sf dump (for example &#39;сентябрь 2022&#39;), YYYY-MM-DD in the Duma dumps.
- `end_date_old`: Null in every probe; type unverified.
- `fraction`: Faction id.
- `office`: Null in every probe; type unverified.

### LawDraft

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `committees`: Committee ids.
- `departments`: Empty in every probe; item type unverified (probably integer ids).
- `description`: Null in every probe; type unverified.
- `initiator_offices`: Empty in every probe; item type unverified (probably integer ids).
- `initiators`: Empty in every probe; item type unverified (probably integer ids).

### LobbyGroup

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `office`: Null in every probe; type unverified.
- `region`: Null in every probe; type unverified.

### Lobbyist

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `end_date`: Free text in the sf dump (for example &#39;сентябрь 2022&#39;), YYYY-MM-DD in the Duma dumps.
- `fraction`: Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown.
- `groups`: Lobby group ids (listLobbyGroups).
- `id`: Lobbyist record id: the &#123;id&#125; of getDeputyProfile (Duma) or getSenatorProfile (Federation Council).
- `person`: Declarator person id: use with searchSections and getSuccessRate.

### Person

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `savings`: Empty in the probe; item shape unverified.
- `spendings`: Empty in the probe; item shape unverified.
- `stocks`: Empty in the probe; item shape unverified.

### SenatorProfile

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `committees`: Empty in the probe; item type unverified.
- `duma_id`: State Duma id; null for senators in the probe (an integer in Duma profiles).
- `fraction`: Faction name.
- `vote_link`: Null in every probe; type unverified.

### SuccessRate

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `rate`: Percentage of proposed bills that passed; null when none were proposed.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| DeputyProfile | `load` | `GET /api/lobbist_detail/{id}/` | See reference |
| LawDraft | `load` | `GET /api/law_draft_api/{id}/` | See reference |
| LobbyGroup | `list` | `GET /api/lobby_group/` | See reference |
| Lobbyist | `list` | `GET /media/dumps/lobbist-small-{chamber}.json` | See reference |
| Person | `list` | `GET /api/convocations/{convocationId}/person_convocations` | See reference |
| Person | `list` | `GET /api/v1/search/sections/` | See reference |
| SenatorProfile | `load` | `GET /api/lobbist/{id}/` | See reference |
| SuccessRate | `load` | `GET /api/persons/{personId}/success_rate` | See reference |

## Connect to the API

- Declarator API: `https://api.deklarator.org`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `dumabingo_list`: List records for an entity. Supported entities: `lobby_group`, `lobbyist`, `person`.
- `dumabingo_load`: Load one record for an entity. Supported entities: `deputy_profile`, `law_draft`, `senator_profile`, `success_rate`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

