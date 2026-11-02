export interface DeputyProfile {
    appointing_date?: string;
    bio?: string;
    birth_date?: string;
    comments?: string;
    commission?: string;
    committee?: string;
    committees?: any[];
    conclusion?: string;
    convocation?: number;
    draft?: boolean;
    duma_id?: number;
    edited?: boolean;
    election_method?: string;
    end_date?: string;
    end_date_old?: string;
    fact_checked?: boolean;
    family?: string;
    fraction?: number;
    fraction_end_date?: string;
    fraction_group?: string;
    fraction_old?: string;
    fraction_start_date?: string;
    fullname: string;
    gender?: string;
    goverment_body?: string;
    groups?: any[];
    hidden?: boolean;
    id: number;
    last_appointment?: string;
    last_import?: string;
    law_draft_count?: number;
    lawyer_checked?: boolean;
    lobbist?: number;
    modified_when?: string;
    office?: string;
    person: number;
    photo?: string;
    positions?: any[];
    raw_position?: string;
    region?: any;
    relations?: string;
    site?: string;
    start_year?: number;
    submitted?: string;
    temp_commission?: string;
    terms_number?: number;
    total_years?: number;
    vote_link?: string;
}
export interface DeputyProfileLoadMatch {
    id: number;
}
export interface LawDraft {
    analyst_filled?: boolean;
    approved?: boolean;
    committees?: any[];
    core?: string;
    created_by?: number;
    created_when?: string;
    departments?: any[];
    description?: string;
    entry_date?: string;
    fact_checked?: boolean;
    id: number;
    in_watch_list?: boolean;
    initiator_offices?: any[];
    initiators?: any[];
    is_lobbyist?: boolean;
    keywords?: any[];
    last_update?: string;
    law_authors?: any[];
    lawyer_checked?: boolean;
    link: string;
    markers?: any[];
    modified_by?: number;
    modified_when?: string;
    name: string;
    note?: string;
    number: string;
    old_phase?: string;
    parties?: any[];
    possible_interested_persons?: string;
    transcript_url?: string;
    type?: string;
}
export interface LawDraftLoadMatch {
    id: number;
}
export interface LobbyGroup {
    id: number;
    level: number;
    lft: number;
    name: string;
    office: number;
    order: number;
    parent: number;
    region: number;
    rght: number;
    tree_id: number;
}
export interface LobbyGroupListMatch {
    id?: number;
    level?: number;
    lft?: number;
    name?: string;
    office?: number;
    order?: number;
    parent?: number;
    region?: number;
    rght?: number;
    tree_id?: number;
}
export interface Lobbyist {
    birth_date: string;
    commission: string;
    committee: string;
    committees: any[];
    convocation?: number;
    convocations: any[];
    draft?: boolean;
    election_method: string;
    end_date: string;
    fraction?: any;
    fraction_end_date?: string;
    fraction_group?: string;
    fraction_old?: string;
    fraction_start_date?: string;
    fullname: string;
    gender: string;
    goverment_body: string;
    groups: any[];
    hidden: boolean;
    id: number;
    last_appointment: string;
    law_draft_apis?: any[];
    law_draft_count?: number;
    lobbist?: number;
    modified_when?: string;
    person: number;
    positions?: any[];
    region: any;
    rupep?: string;
    site: string;
    start_year: number;
    temp_commission: string;
    terms_number: number;
    total_years: number;
}
export interface LobbyistListMatch {
    chamber: string;
}
export interface Person {
    convocations: any[];
    incomes: any[];
    main: Record<string, any>;
    person_id: number;
    position_en: string;
    position_ru: string;
    real_estates: any[];
    savings: any[];
    spendings: any[];
    stocks: any[];
    vehicles: any[];
}
export interface PersonListMatch {
    convocation_id: number;
    format?: string;
}
export interface SenatorProfile {
    bio?: string;
    birth_date?: string;
    comments?: string;
    commission?: string;
    committee?: string;
    committees?: any[];
    conclusion?: string;
    convocations?: any[];
    duma_id?: number;
    edited?: boolean;
    election_method?: string;
    end_date?: string;
    family?: string;
    fraction?: string;
    fraction_group?: string;
    fullname: string;
    gender?: string;
    goverment_body?: string;
    groups?: any[];
    hidden?: boolean;
    id: number;
    last_appointment?: string;
    last_import?: string;
    person: number;
    photo?: string;
    position?: string;
    region?: any;
    relations?: string;
    site?: string;
    start_year?: number;
    submitted?: string;
    temp_commission?: string;
    terms_number?: number;
    total_years?: number;
    verified?: boolean;
    vote_link?: string;
}
export interface SenatorProfileLoadMatch {
    id: number;
}
export interface SuccessRate {
    approved_number: number;
    filtered_number: number;
    lobbyist_number: number;
    number: number;
    rate: number;
}
export interface SuccessRateLoadMatch {
    person_id: number;
    format?: string;
}
