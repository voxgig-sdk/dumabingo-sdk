<?php
declare(strict_types=1);

// Typed models for the Dumabingo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** DeputyProfile entity data model. */
class DeputyProfile
{
    public ?string $appointing_date = null;
    public ?string $bio = null;
    public ?string $birth_date = null;
    public ?string $comments = null;
    public ?string $commission = null;
    public ?string $committee = null;
    public ?array $committees = null;
    public ?string $conclusion = null;
    public ?int $convocation = null;
    public ?bool $draft = null;
    public ?int $duma_id = null;
    public ?bool $edited = null;
    public ?string $election_method = null;
    public ?string $end_date = null;
    public ?string $end_date_old = null;
    public ?bool $fact_checked = null;
    public ?string $family = null;
    public ?int $fraction = null;
    public ?string $fraction_end_date = null;
    public ?string $fraction_group = null;
    public ?string $fraction_old = null;
    public ?string $fraction_start_date = null;
    public string $fullname;
    public ?string $gender = null;
    public ?string $goverment_body = null;
    public ?array $groups = null;
    public ?bool $hidden = null;
    public int $id;
    public ?string $last_appointment = null;
    public ?string $last_import = null;
    public ?int $law_draft_count = null;
    public ?bool $lawyer_checked = null;
    public ?int $lobbist = null;
    public ?string $modified_when = null;
    public ?string $office = null;
    public int $person;
    public ?string $photo = null;
    public ?array $positions = null;
    public ?string $raw_position = null;
    public mixed $region = null;
    public ?string $relations = null;
    public ?string $site = null;
    public ?int $start_year = null;
    public ?string $submitted = null;
    public ?string $temp_commission = null;
    public ?int $terms_number = null;
    public ?float $total_years = null;
    public ?string $vote_link = null;
}

/** Request payload for DeputyProfile#load. */
class DeputyProfileLoadMatch
{
    public int $id;
}

/** LawDraft entity data model. */
class LawDraft
{
    public ?bool $analyst_filled = null;
    public ?bool $approved = null;
    public ?array $committees = null;
    public ?string $core = null;
    public ?int $created_by = null;
    public ?string $created_when = null;
    public ?array $departments = null;
    public ?string $description = null;
    public ?string $entry_date = null;
    public ?bool $fact_checked = null;
    public int $id;
    public ?bool $in_watch_list = null;
    public ?array $initiator_offices = null;
    public ?array $initiators = null;
    public ?bool $is_lobbyist = null;
    public ?array $keywords = null;
    public ?string $last_update = null;
    public ?array $law_authors = null;
    public ?bool $lawyer_checked = null;
    public string $link;
    public ?array $markers = null;
    public ?int $modified_by = null;
    public ?string $modified_when = null;
    public string $name;
    public ?string $note = null;
    public string $number;
    public ?string $old_phase = null;
    public ?array $parties = null;
    public ?string $possible_interested_persons = null;
    public ?string $transcript_url = null;
    public ?string $type = null;
}

/** Request payload for LawDraft#load. */
class LawDraftLoadMatch
{
    public int $id;
}

/** LobbyGroup entity data model. */
class LobbyGroup
{
    public int $id;
    public int $level;
    public int $lft;
    public string $name;
    public int $office;
    public int $order;
    public int $parent;
    public int $region;
    public int $rght;
    public int $tree_id;
}

/** Request payload for LobbyGroup#list. */
class LobbyGroupListMatch
{
    public ?int $id = null;
    public ?int $level = null;
    public ?int $lft = null;
    public ?string $name = null;
    public ?int $office = null;
    public ?int $order = null;
    public ?int $parent = null;
    public ?int $region = null;
    public ?int $rght = null;
    public ?int $tree_id = null;
}

/** Lobbyist entity data model. */
class Lobbyist
{
    public string $birth_date;
    public string $commission;
    public string $committee;
    public array $committees;
    public ?int $convocation = null;
    public array $convocations;
    public ?bool $draft = null;
    public string $election_method;
    public string $end_date;
    public mixed $fraction = null;
    public ?string $fraction_end_date = null;
    public ?string $fraction_group = null;
    public ?string $fraction_old = null;
    public ?string $fraction_start_date = null;
    public string $fullname;
    public string $gender;
    public string $goverment_body;
    public array $groups;
    public bool $hidden;
    public int $id;
    public string $last_appointment;
    public ?array $law_draft_apis = null;
    public ?int $law_draft_count = null;
    public ?int $lobbist = null;
    public ?string $modified_when = null;
    public int $person;
    public ?array $positions = null;
    public mixed $region;
    public ?string $rupep = null;
    public string $site;
    public int $start_year;
    public string $temp_commission;
    public int $terms_number;
    public float $total_years;
}

/** Request payload for Lobbyist#list. */
class LobbyistListMatch
{
    public string $chamber;
}

/** Person entity data model. */
class Person
{
    public array $convocations;
    public array $incomes;
    public array $main;
    public int $person_id;
    public string $position_en;
    public string $position_ru;
    public array $real_estates;
    public array $savings;
    public array $spendings;
    public array $stocks;
    public array $vehicles;
}

/** Request payload for Person#list. */
class PersonListMatch
{
    public int $convocation_id;
    public ?string $format = null;
}

/** SenatorProfile entity data model. */
class SenatorProfile
{
    public ?string $bio = null;
    public ?string $birth_date = null;
    public ?string $comments = null;
    public ?string $commission = null;
    public ?string $committee = null;
    public ?array $committees = null;
    public ?string $conclusion = null;
    public ?array $convocations = null;
    public ?int $duma_id = null;
    public ?bool $edited = null;
    public ?string $election_method = null;
    public ?string $end_date = null;
    public ?string $family = null;
    public ?string $fraction = null;
    public ?string $fraction_group = null;
    public string $fullname;
    public ?string $gender = null;
    public ?string $goverment_body = null;
    public ?array $groups = null;
    public ?bool $hidden = null;
    public int $id;
    public ?string $last_appointment = null;
    public ?string $last_import = null;
    public int $person;
    public ?string $photo = null;
    public ?string $position = null;
    public mixed $region = null;
    public ?string $relations = null;
    public ?string $site = null;
    public ?int $start_year = null;
    public ?string $submitted = null;
    public ?string $temp_commission = null;
    public ?int $terms_number = null;
    public ?float $total_years = null;
    public ?bool $verified = null;
    public ?string $vote_link = null;
}

/** Request payload for SenatorProfile#load. */
class SenatorProfileLoadMatch
{
    public int $id;
}

/** SuccessRate entity data model. */
class SuccessRate
{
    public int $approved_number;
    public int $filtered_number;
    public int $lobbyist_number;
    public int $number;
    public float $rate;
}

/** Request payload for SuccessRate#load. */
class SuccessRateLoadMatch
{
    public int $person_id;
    public ?string $format = null;
}

