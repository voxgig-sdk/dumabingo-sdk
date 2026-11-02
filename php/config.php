<?php
declare(strict_types=1);

// Dumabingo SDK configuration

class DumabingoConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Dumabingo",
                "slug" => "dumabingo",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.deklarator.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "deputy_profile" => [],
                    "law_draft" => [],
                    "lobby_group" => [],
                    "lobbyist" => [],
                    "person" => [],
                    "senator_profile" => [],
                    "success_rate" => [],
                ],
            ],
            "entity" => [
        'deputy_profile' => [
          'fields' => [
            [
              'name' => 'appointing_date',
              'title' => 'Appointing Date',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'bio',
              'title' => 'Bio',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'birth_date',
              'title' => 'Birth Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'comments',
              'title' => 'Comments',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'commission',
              'title' => 'Commission',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'committee',
              'title' => 'Committee',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'committees',
              'title' => 'Committees',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'conclusion',
              'title' => 'Conclusion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'convocation',
              'title' => 'Convocation',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'draft',
              'title' => 'Draft',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'duma_id',
              'title' => 'Duma Id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'edited',
              'title' => 'Edited',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'election_method',
              'title' => 'Election Method',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'end_date',
              'title' => 'End Date',
              'type' => '`$STRING`',
              'short' => 'Free text in the sf dump (e.g.',
            ],
            [
              'name' => 'end_date_old',
              'title' => 'End Date Old',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'fact_checked',
              'title' => 'Fact Checked',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'family',
              'title' => 'Family',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction',
              'title' => 'Fraction',
              'type' => '`$INTEGER`',
              'short' => 'Faction id.',
            ],
            [
              'name' => 'fraction_end_date',
              'title' => 'Fraction End Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_group',
              'title' => 'Fraction Group',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_old',
              'title' => 'Fraction Old',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_start_date',
              'title' => 'Fraction Start Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fullname',
              'title' => 'Fullname',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'gender',
              'title' => 'Gender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'goverment_body',
              'title' => 'Goverment Body',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'groups',
              'title' => 'Groups',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'hidden',
              'title' => 'Hidden',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'last_appointment',
              'title' => 'Last Appointment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'last_import',
              'title' => 'Last Import',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'law_draft_count',
              'title' => 'Law Draft Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lawyer_checked',
              'title' => 'Lawyer Checked',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'lobbist',
              'title' => 'Lobbist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'modified_when',
              'title' => 'Modified When',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'office',
              'title' => 'Office',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'person',
              'title' => 'Person',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'photo',
              'title' => 'Photo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'positions',
              'title' => 'Positions',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'raw_position',
              'title' => 'Raw Position',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'relations',
              'title' => 'Relations',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'site',
              'title' => 'Site',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'start_year',
              'title' => 'Start Year',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'submitted',
              'title' => 'Submitted',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'temp_commission',
              'title' => 'Temp Commission',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'terms_number',
              'title' => 'Terms Number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total_years',
              'title' => 'Total Years',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'vote_link',
              'title' => 'Vote Link',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'deputy_profile',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/lobbist_detail/{id}/',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'lobbist_detail',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'lobbist_detail',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 4489,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'law_draft' => [
          'fields' => [
            [
              'name' => 'analyst_filled',
              'title' => 'Analyst Filled',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'approved',
              'title' => 'Approved',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'committees',
              'title' => 'Committees',
              'type' => '`$ARRAY`',
              'short' => 'Committee ids.',
            ],
            [
              'name' => 'core',
              'title' => 'Core',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_by',
              'title' => 'Created By',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'created_when',
              'title' => 'Created When',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'departments',
              'title' => 'Departments',
              'type' => '`$ARRAY`',
              'short' => 'Empty in every probe; item type unverified (probably integer ids).',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'entry_date',
              'title' => 'Entry Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fact_checked',
              'title' => 'Fact Checked',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'in_watch_list',
              'title' => 'In Watch List',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'initiator_offices',
              'title' => 'Initiator Offices',
              'type' => '`$ARRAY`',
              'short' => 'Empty in every probe; item type unverified (probably integer ids).',
            ],
            [
              'name' => 'initiators',
              'title' => 'Initiators',
              'type' => '`$ARRAY`',
              'short' => 'Empty in every probe; item type unverified (probably integer ids).',
            ],
            [
              'name' => 'is_lobbyist',
              'title' => 'Is Lobbyist',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'keywords',
              'title' => 'Keywords',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'last_update',
              'title' => 'Last Update',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'law_authors',
              'title' => 'Law Authors',
              'type' => '`$ARRAY`',
              'short' => 'Declarator person ids of the authors.',
            ],
            [
              'name' => 'lawyer_checked',
              'title' => 'Lawyer Checked',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'link',
              'title' => 'Link',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'markers',
              'title' => 'Markers',
              'type' => '`$ARRAY`',
              'short' => 'Empty in every probe; item type unverified (probably integer ids).',
            ],
            [
              'name' => 'modified_by',
              'title' => 'Modified By',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'modified_when',
              'title' => 'Modified When',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'note',
              'title' => 'Note',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'number',
              'title' => 'Number',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'old_phase',
              'title' => 'Old Phase',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'parties',
              'title' => 'Parties',
              'type' => '`$ARRAY`',
              'short' => 'Empty in every probe; item type unverified (probably integer ids).',
            ],
            [
              'name' => 'possible_interested_persons',
              'title' => 'Possible Interested Persons',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'transcript_url',
              'title' => 'Transcript Url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'law_draft',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/law_draft_api/{id}/',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'law_draft_api',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'law_draft_api',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 391,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'lobby_group' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'level',
              'title' => 'Level',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'lft',
              'title' => 'Lft',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'office',
              'title' => 'Office',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'order',
              'title' => 'Order',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'parent',
              'title' => 'Parent',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Null in every probe; type unverified.',
            ],
            [
              'name' => 'rght',
              'title' => 'Rght',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'tree_id',
              'title' => 'Tree Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'lobby_group',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/lobby_group/',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'lobby_group',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'lobby_group',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'lobbyist' => [
          'fields' => [
            [
              'name' => 'birth_date',
              'title' => 'Birth Date',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'commission',
              'title' => 'Commission',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'committee',
              'title' => 'Committee',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'committees',
              'title' => 'Committees',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'convocation',
              'title' => 'Convocation',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'convocations',
              'title' => 'Convocations',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'draft',
              'title' => 'Draft',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'election_method',
              'title' => 'Election Method',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'end_date',
              'title' => 'End Date',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Free text in the sf dump (e.g.',
            ],
            [
              'name' => 'fraction',
              'title' => 'Fraction',
              'type' => '`$ANY`',
              'short' => 'Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown.',
            ],
            [
              'name' => 'fraction_end_date',
              'title' => 'Fraction End Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_group',
              'title' => 'Fraction Group',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_old',
              'title' => 'Fraction Old',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction_start_date',
              'title' => 'Fraction Start Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fullname',
              'title' => 'Fullname',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'gender',
              'title' => 'Gender',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'goverment_body',
              'title' => 'Goverment Body',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'groups',
              'title' => 'Groups',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Lobby group ids (listLobbyGroups).',
            ],
            [
              'name' => 'hidden',
              'title' => 'Hidden',
              'type' => '`$BOOLEAN`',
              'req' => true,
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council).',
            ],
            [
              'name' => 'last_appointment',
              'title' => 'Last Appointment',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'law_draft_apis',
              'title' => 'Law Draft Apis',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'law_draft_count',
              'title' => 'Law Draft Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lobbist',
              'title' => 'Lobbist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'modified_when',
              'title' => 'Modified When',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'person',
              'title' => 'Person',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Declarator person id: use with searchSections and getSuccessRate.',
            ],
            [
              'name' => 'positions',
              'title' => 'Positions',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'rupep',
              'title' => 'Rupep',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'site',
              'title' => 'Site',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Chamber: \'D\' (State Duma) or \'S\' (Federation Council).',
            ],
            [
              'name' => 'start_year',
              'title' => 'Start Year',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'temp_commission',
              'title' => 'Temp Commission',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'terms_number',
              'title' => 'Terms Number',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'total_years',
              'title' => 'Total Years',
              'type' => '`$NUMBER`',
              'req' => true,
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'lobbyist',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/media/dumps/lobbist-small-{chamber}.json',
                  'segments' => [
                    [
                      'lit' => 'media',
                    ],
                    [
                      'lit' => 'dumps',
                    ],
                    [
                      'lit' => 'lobbist-small-{chamber}.json',
                    ],
                  ],
                  'parts' => [
                    'media',
                    'dumps',
                    'lobbist-small-{chamber}.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'chamber',
                        'orig' => 'chamber',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'sf',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'chamber',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'person' => [
          'fields' => [
            [
              'name' => 'convocations',
              'title' => 'Convocations',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'incomes',
              'title' => 'Incomes',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'main',
              'title' => 'Main',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'person_id',
              'title' => 'Person Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'position_en',
              'title' => 'Position En',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'position_ru',
              'title' => 'Position Ru',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'real_estates',
              'title' => 'Real Estates',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'savings',
              'title' => 'Savings',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Empty in the probe; item shape unverified.',
            ],
            [
              'name' => 'spendings',
              'title' => 'Spendings',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Empty in the probe; item shape unverified.',
            ],
            [
              'name' => 'stocks',
              'title' => 'Stocks',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Empty in the probe; item shape unverified.',
            ],
            [
              'name' => 'vehicles',
              'title' => 'Vehicles',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
          ],
          'name' => 'person',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/convocations/{convocationId}/person_convocations',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'convocations',
                    ],
                    [
                      'var' => 'convocation_id',
                    ],
                    [
                      'lit' => 'person_convocations',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'convocations',
                    '{convocation_id}',
                    'person_convocations',
                  ],
                  'rename' => [
                    'param' => [
                      'convocationId' => 'convocation_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.persons`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'convocation_id',
                        'orig' => 'convocationId',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 8,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'json',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'convocation_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/search/sections/',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'search',
                    ],
                    [
                      'lit' => 'sections',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'v1',
                    'search',
                    'sections',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'person',
                        'orig' => 'person',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 57270,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'person',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'senator_profile' => [
          'fields' => [
            [
              'name' => 'bio',
              'title' => 'Bio',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'birth_date',
              'title' => 'Birth Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'comments',
              'title' => 'Comments',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'commission',
              'title' => 'Commission',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'committee',
              'title' => 'Committee',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'committees',
              'title' => 'Committees',
              'type' => '`$ARRAY`',
              'short' => 'Empty in the probe; item type unverified.',
            ],
            [
              'name' => 'conclusion',
              'title' => 'Conclusion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'convocations',
              'title' => 'Convocations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'duma_id',
              'title' => 'Duma Id',
              'type' => '`$INTEGER`',
              'short' => 'State Duma id; null for senators in the probe (an integer in Duma profiles).',
            ],
            [
              'name' => 'edited',
              'title' => 'Edited',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'election_method',
              'title' => 'Election Method',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'end_date',
              'title' => 'End Date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'family',
              'title' => 'Family',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fraction',
              'title' => 'Fraction',
              'type' => '`$STRING`',
              'short' => 'Faction name.',
            ],
            [
              'name' => 'fraction_group',
              'title' => 'Fraction Group',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fullname',
              'title' => 'Fullname',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'gender',
              'title' => 'Gender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'goverment_body',
              'title' => 'Goverment Body',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'groups',
              'title' => 'Groups',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'hidden',
              'title' => 'Hidden',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'last_appointment',
              'title' => 'Last Appointment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'last_import',
              'title' => 'Last Import',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'person',
              'title' => 'Person',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'photo',
              'title' => 'Photo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'position',
              'title' => 'Position',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'relations',
              'title' => 'Relations',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'site',
              'title' => 'Site',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'start_year',
              'title' => 'Start Year',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'submitted',
              'title' => 'Submitted',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'temp_commission',
              'title' => 'Temp Commission',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'terms_number',
              'title' => 'Terms Number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total_years',
              'title' => 'Total Years',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'verified',
              'title' => 'Verified',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'vote_link',
              'title' => 'Vote Link',
              'type' => '`$STRING`',
              'short' => 'Null in every probe; type unverified.',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'senator_profile',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/lobbist/{id}/',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'lobbist',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'lobbist',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 10514,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'success_rate' => [
          'fields' => [
            [
              'name' => 'approved_number',
              'title' => 'Approved Number',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'filtered_number',
              'title' => 'Filtered Number',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'lobbyist_number',
              'title' => 'Lobbyist Number',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'number',
              'title' => 'Number',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'rate',
              'title' => 'Rate',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'Percentage of proposed bills that passed; null when none were proposed.',
            ],
          ],
          'name' => 'success_rate',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/persons/{personId}/success_rate',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'persons',
                    ],
                    [
                      'var' => 'person_id',
                    ],
                    [
                      'lit' => 'success_rate',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'persons',
                    '{person_id}',
                    'success_rate',
                  ],
                  'rename' => [
                    'param' => [
                      'personId' => 'person_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.success_rate`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'person_id',
                        'orig' => 'personId',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 31850,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'json',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'person_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.person',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DumabingoFeatures::make_feature($name);
    }
}
