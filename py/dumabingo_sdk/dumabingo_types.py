# Typed models for the Dumabingo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class DeputyProfileRequired(TypedDict):
    fullname: str
    id: int
    person: int


class DeputyProfile(DeputyProfileRequired, total=False):
    appointing_date: str
    bio: str
    birth_date: str
    comments: str
    commission: str
    committee: str
    committees: list
    conclusion: str
    convocation: int
    draft: bool
    duma_id: int
    edited: bool
    election_method: str
    end_date: str
    end_date_old: str
    fact_checked: bool
    family: str
    fraction: int
    fraction_end_date: str
    fraction_group: str
    fraction_old: str
    fraction_start_date: str
    gender: str
    goverment_body: str
    groups: list
    hidden: bool
    last_appointment: str
    last_import: str
    law_draft_count: int
    lawyer_checked: bool
    lobbist: int
    modified_when: str
    office: str
    photo: str
    positions: list
    raw_position: str
    region: Any
    relations: str
    site: str
    start_year: int
    submitted: str
    temp_commission: str
    terms_number: int
    total_years: float
    vote_link: str


class DeputyProfileLoadMatch(TypedDict):
    id: int


class LawDraftRequired(TypedDict):
    id: int
    link: str
    name: str
    number: str


class LawDraft(LawDraftRequired, total=False):
    analyst_filled: bool
    approved: bool
    committees: list
    core: str
    created_by: int
    created_when: str
    departments: list
    description: str
    entry_date: str
    fact_checked: bool
    in_watch_list: bool
    initiator_offices: list
    initiators: list
    is_lobbyist: bool
    keywords: list
    last_update: str
    law_authors: list
    lawyer_checked: bool
    markers: list
    modified_by: int
    modified_when: str
    note: str
    old_phase: str
    parties: list
    possible_interested_persons: str
    transcript_url: str
    type: str


class LawDraftLoadMatch(TypedDict):
    id: int


class LobbyGroup(TypedDict):
    id: int
    level: int
    lft: int
    name: str
    office: int
    order: int
    parent: int
    region: int
    rght: int
    tree_id: int


class LobbyGroupListMatch(TypedDict, total=False):
    id: int
    level: int
    lft: int
    name: str
    office: int
    order: int
    parent: int
    region: int
    rght: int
    tree_id: int


class LobbyistRequired(TypedDict):
    birth_date: str
    commission: str
    committee: str
    committees: list
    convocations: list
    election_method: str
    end_date: str
    fullname: str
    gender: str
    goverment_body: str
    groups: list
    hidden: bool
    id: int
    last_appointment: str
    person: int
    region: Any
    site: str
    start_year: int
    temp_commission: str
    terms_number: int
    total_years: float


class Lobbyist(LobbyistRequired, total=False):
    convocation: int
    draft: bool
    fraction: Any
    fraction_end_date: str
    fraction_group: str
    fraction_old: str
    fraction_start_date: str
    law_draft_apis: list
    law_draft_count: int
    lobbist: int
    modified_when: str
    positions: list
    rupep: str


class LobbyistListMatch(TypedDict):
    chamber: str


class Person(TypedDict):
    convocations: list
    incomes: list
    main: dict
    person_id: int
    position_en: str
    position_ru: str
    real_estates: list
    savings: list
    spendings: list
    stocks: list
    vehicles: list


class PersonListMatchRequired(TypedDict):
    convocation_id: int


class PersonListMatch(PersonListMatchRequired, total=False):
    format: str


class SenatorProfileRequired(TypedDict):
    fullname: str
    id: int
    person: int


class SenatorProfile(SenatorProfileRequired, total=False):
    bio: str
    birth_date: str
    comments: str
    commission: str
    committee: str
    committees: list
    conclusion: str
    convocations: list
    duma_id: int
    edited: bool
    election_method: str
    end_date: str
    family: str
    fraction: str
    fraction_group: str
    gender: str
    goverment_body: str
    groups: list
    hidden: bool
    last_appointment: str
    last_import: str
    photo: str
    position: str
    region: Any
    relations: str
    site: str
    start_year: int
    submitted: str
    temp_commission: str
    terms_number: int
    total_years: float
    verified: bool
    vote_link: str


class SenatorProfileLoadMatch(TypedDict):
    id: int


class SuccessRate(TypedDict):
    approved_number: int
    filtered_number: int
    lobbyist_number: int
    number: int
    rate: float


class SuccessRateLoadMatchRequired(TypedDict):
    person_id: int


class SuccessRateLoadMatch(SuccessRateLoadMatchRequired, total=False):
    format: str
