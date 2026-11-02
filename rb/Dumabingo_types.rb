# frozen_string_literal: true

# Typed models for the Dumabingo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# DeputyProfile entity data model.
#
# @!attribute [rw] appointing_date
#   @return [String, nil]
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] birth_date
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [String, nil]
#
# @!attribute [rw] commission
#   @return [String, nil]
#
# @!attribute [rw] committee
#   @return [String, nil]
#
# @!attribute [rw] committees
#   @return [Array, nil]
#
# @!attribute [rw] conclusion
#   @return [String, nil]
#
# @!attribute [rw] convocation
#   @return [Integer, nil]
#
# @!attribute [rw] draft
#   @return [Boolean, nil]
#
# @!attribute [rw] duma_id
#   @return [Integer, nil]
#
# @!attribute [rw] edited
#   @return [Boolean, nil]
#
# @!attribute [rw] election_method
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] end_date_old
#   @return [String, nil]
#
# @!attribute [rw] fact_checked
#   @return [Boolean, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] fraction
#   @return [Integer, nil]
#
# @!attribute [rw] fraction_end_date
#   @return [String, nil]
#
# @!attribute [rw] fraction_group
#   @return [String, nil]
#
# @!attribute [rw] fraction_old
#   @return [String, nil]
#
# @!attribute [rw] fraction_start_date
#   @return [String, nil]
#
# @!attribute [rw] fullname
#   @return [String]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] goverment_body
#   @return [String, nil]
#
# @!attribute [rw] groups
#   @return [Array, nil]
#
# @!attribute [rw] hidden
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] last_appointment
#   @return [String, nil]
#
# @!attribute [rw] last_import
#   @return [String, nil]
#
# @!attribute [rw] law_draft_count
#   @return [Integer, nil]
#
# @!attribute [rw] lawyer_checked
#   @return [Boolean, nil]
#
# @!attribute [rw] lobbist
#   @return [Integer, nil]
#
# @!attribute [rw] modified_when
#   @return [String, nil]
#
# @!attribute [rw] office
#   @return [String, nil]
#
# @!attribute [rw] person
#   @return [Integer]
#
# @!attribute [rw] photo
#   @return [String, nil]
#
# @!attribute [rw] positions
#   @return [Array, nil]
#
# @!attribute [rw] raw_position
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [Object, nil]
#
# @!attribute [rw] relations
#   @return [String, nil]
#
# @!attribute [rw] site
#   @return [String, nil]
#
# @!attribute [rw] start_year
#   @return [Integer, nil]
#
# @!attribute [rw] submitted
#   @return [String, nil]
#
# @!attribute [rw] temp_commission
#   @return [String, nil]
#
# @!attribute [rw] terms_number
#   @return [Integer, nil]
#
# @!attribute [rw] total_years
#   @return [Float, nil]
#
# @!attribute [rw] vote_link
#   @return [String, nil]
DeputyProfile = Struct.new(
  :appointing_date,
  :bio,
  :birth_date,
  :comments,
  :commission,
  :committee,
  :committees,
  :conclusion,
  :convocation,
  :draft,
  :duma_id,
  :edited,
  :election_method,
  :end_date,
  :end_date_old,
  :fact_checked,
  :family,
  :fraction,
  :fraction_end_date,
  :fraction_group,
  :fraction_old,
  :fraction_start_date,
  :fullname,
  :gender,
  :goverment_body,
  :groups,
  :hidden,
  :id,
  :last_appointment,
  :last_import,
  :law_draft_count,
  :lawyer_checked,
  :lobbist,
  :modified_when,
  :office,
  :person,
  :photo,
  :positions,
  :raw_position,
  :region,
  :relations,
  :site,
  :start_year,
  :submitted,
  :temp_commission,
  :terms_number,
  :total_years,
  :vote_link,
  keyword_init: true
)

# Request payload for DeputyProfile#load.
#
# @!attribute [rw] id
#   @return [Integer]
DeputyProfileLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# LawDraft entity data model.
#
# @!attribute [rw] analyst_filled
#   @return [Boolean, nil]
#
# @!attribute [rw] approved
#   @return [Boolean, nil]
#
# @!attribute [rw] committees
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [Integer, nil]
#
# @!attribute [rw] created_when
#   @return [String, nil]
#
# @!attribute [rw] departments
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] entry_date
#   @return [String, nil]
#
# @!attribute [rw] fact_checked
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] in_watch_list
#   @return [Boolean, nil]
#
# @!attribute [rw] initiator_offices
#   @return [Array, nil]
#
# @!attribute [rw] initiators
#   @return [Array, nil]
#
# @!attribute [rw] is_lobbyist
#   @return [Boolean, nil]
#
# @!attribute [rw] keywords
#   @return [Array, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] law_authors
#   @return [Array, nil]
#
# @!attribute [rw] lawyer_checked
#   @return [Boolean, nil]
#
# @!attribute [rw] link
#   @return [String]
#
# @!attribute [rw] markers
#   @return [Array, nil]
#
# @!attribute [rw] modified_by
#   @return [Integer, nil]
#
# @!attribute [rw] modified_when
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] old_phase
#   @return [String, nil]
#
# @!attribute [rw] parties
#   @return [Array, nil]
#
# @!attribute [rw] possible_interested_persons
#   @return [String, nil]
#
# @!attribute [rw] transcript_url
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
LawDraft = Struct.new(
  :analyst_filled,
  :approved,
  :committees,
  :core,
  :created_by,
  :created_when,
  :departments,
  :description,
  :entry_date,
  :fact_checked,
  :id,
  :in_watch_list,
  :initiator_offices,
  :initiators,
  :is_lobbyist,
  :keywords,
  :last_update,
  :law_authors,
  :lawyer_checked,
  :link,
  :markers,
  :modified_by,
  :modified_when,
  :name,
  :note,
  :number,
  :old_phase,
  :parties,
  :possible_interested_persons,
  :transcript_url,
  :type,
  keyword_init: true
)

# Request payload for LawDraft#load.
#
# @!attribute [rw] id
#   @return [Integer]
LawDraftLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# LobbyGroup entity data model.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] level
#   @return [Integer]
#
# @!attribute [rw] lft
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] office
#   @return [Integer]
#
# @!attribute [rw] order
#   @return [Integer]
#
# @!attribute [rw] parent
#   @return [Integer]
#
# @!attribute [rw] region
#   @return [Integer]
#
# @!attribute [rw] rght
#   @return [Integer]
#
# @!attribute [rw] tree_id
#   @return [Integer]
LobbyGroup = Struct.new(
  :id,
  :level,
  :lft,
  :name,
  :office,
  :order,
  :parent,
  :region,
  :rght,
  :tree_id,
  keyword_init: true
)

# Request payload for LobbyGroup#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] level
#   @return [Integer, nil]
#
# @!attribute [rw] lft
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] office
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [Integer, nil]
#
# @!attribute [rw] parent
#   @return [Integer, nil]
#
# @!attribute [rw] region
#   @return [Integer, nil]
#
# @!attribute [rw] rght
#   @return [Integer, nil]
#
# @!attribute [rw] tree_id
#   @return [Integer, nil]
LobbyGroupListMatch = Struct.new(
  :id,
  :level,
  :lft,
  :name,
  :office,
  :order,
  :parent,
  :region,
  :rght,
  :tree_id,
  keyword_init: true
)

# Lobbyist entity data model.
#
# @!attribute [rw] birth_date
#   @return [String]
#
# @!attribute [rw] commission
#   @return [String]
#
# @!attribute [rw] committee
#   @return [String]
#
# @!attribute [rw] committees
#   @return [Array]
#
# @!attribute [rw] convocation
#   @return [Integer, nil]
#
# @!attribute [rw] convocations
#   @return [Array]
#
# @!attribute [rw] draft
#   @return [Boolean, nil]
#
# @!attribute [rw] election_method
#   @return [String]
#
# @!attribute [rw] end_date
#   @return [String]
#
# @!attribute [rw] fraction
#   @return [Object, nil]
#
# @!attribute [rw] fraction_end_date
#   @return [String, nil]
#
# @!attribute [rw] fraction_group
#   @return [String, nil]
#
# @!attribute [rw] fraction_old
#   @return [String, nil]
#
# @!attribute [rw] fraction_start_date
#   @return [String, nil]
#
# @!attribute [rw] fullname
#   @return [String]
#
# @!attribute [rw] gender
#   @return [String]
#
# @!attribute [rw] goverment_body
#   @return [String]
#
# @!attribute [rw] groups
#   @return [Array]
#
# @!attribute [rw] hidden
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] last_appointment
#   @return [String]
#
# @!attribute [rw] law_draft_apis
#   @return [Array, nil]
#
# @!attribute [rw] law_draft_count
#   @return [Integer, nil]
#
# @!attribute [rw] lobbist
#   @return [Integer, nil]
#
# @!attribute [rw] modified_when
#   @return [String, nil]
#
# @!attribute [rw] person
#   @return [Integer]
#
# @!attribute [rw] positions
#   @return [Array, nil]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] rupep
#   @return [String, nil]
#
# @!attribute [rw] site
#   @return [String]
#
# @!attribute [rw] start_year
#   @return [Integer]
#
# @!attribute [rw] temp_commission
#   @return [String]
#
# @!attribute [rw] terms_number
#   @return [Integer]
#
# @!attribute [rw] total_years
#   @return [Float]
Lobbyist = Struct.new(
  :birth_date,
  :commission,
  :committee,
  :committees,
  :convocation,
  :convocations,
  :draft,
  :election_method,
  :end_date,
  :fraction,
  :fraction_end_date,
  :fraction_group,
  :fraction_old,
  :fraction_start_date,
  :fullname,
  :gender,
  :goverment_body,
  :groups,
  :hidden,
  :id,
  :last_appointment,
  :law_draft_apis,
  :law_draft_count,
  :lobbist,
  :modified_when,
  :person,
  :positions,
  :region,
  :rupep,
  :site,
  :start_year,
  :temp_commission,
  :terms_number,
  :total_years,
  keyword_init: true
)

# Request payload for Lobbyist#list.
#
# @!attribute [rw] chamber
#   @return [String]
LobbyistListMatch = Struct.new(
  :chamber,
  keyword_init: true
)

# Person entity data model.
#
# @!attribute [rw] convocations
#   @return [Array]
#
# @!attribute [rw] incomes
#   @return [Array]
#
# @!attribute [rw] main
#   @return [Hash]
#
# @!attribute [rw] person_id
#   @return [Integer]
#
# @!attribute [rw] position_en
#   @return [String]
#
# @!attribute [rw] position_ru
#   @return [String]
#
# @!attribute [rw] real_estates
#   @return [Array]
#
# @!attribute [rw] savings
#   @return [Array]
#
# @!attribute [rw] spendings
#   @return [Array]
#
# @!attribute [rw] stocks
#   @return [Array]
#
# @!attribute [rw] vehicles
#   @return [Array]
Person = Struct.new(
  :convocations,
  :incomes,
  :main,
  :person_id,
  :position_en,
  :position_ru,
  :real_estates,
  :savings,
  :spendings,
  :stocks,
  :vehicles,
  keyword_init: true
)

# Request payload for Person#list.
#
# @!attribute [rw] convocation_id
#   @return [Integer]
#
# @!attribute [rw] format
#   @return [String, nil]
PersonListMatch = Struct.new(
  :convocation_id,
  :format,
  keyword_init: true
)

# SenatorProfile entity data model.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] birth_date
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [String, nil]
#
# @!attribute [rw] commission
#   @return [String, nil]
#
# @!attribute [rw] committee
#   @return [String, nil]
#
# @!attribute [rw] committees
#   @return [Array, nil]
#
# @!attribute [rw] conclusion
#   @return [String, nil]
#
# @!attribute [rw] convocations
#   @return [Array, nil]
#
# @!attribute [rw] duma_id
#   @return [Integer, nil]
#
# @!attribute [rw] edited
#   @return [Boolean, nil]
#
# @!attribute [rw] election_method
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] fraction
#   @return [String, nil]
#
# @!attribute [rw] fraction_group
#   @return [String, nil]
#
# @!attribute [rw] fullname
#   @return [String]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] goverment_body
#   @return [String, nil]
#
# @!attribute [rw] groups
#   @return [Array, nil]
#
# @!attribute [rw] hidden
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] last_appointment
#   @return [String, nil]
#
# @!attribute [rw] last_import
#   @return [String, nil]
#
# @!attribute [rw] person
#   @return [Integer]
#
# @!attribute [rw] photo
#   @return [String, nil]
#
# @!attribute [rw] position
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [Object, nil]
#
# @!attribute [rw] relations
#   @return [String, nil]
#
# @!attribute [rw] site
#   @return [String, nil]
#
# @!attribute [rw] start_year
#   @return [Integer, nil]
#
# @!attribute [rw] submitted
#   @return [String, nil]
#
# @!attribute [rw] temp_commission
#   @return [String, nil]
#
# @!attribute [rw] terms_number
#   @return [Integer, nil]
#
# @!attribute [rw] total_years
#   @return [Float, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] vote_link
#   @return [String, nil]
SenatorProfile = Struct.new(
  :bio,
  :birth_date,
  :comments,
  :commission,
  :committee,
  :committees,
  :conclusion,
  :convocations,
  :duma_id,
  :edited,
  :election_method,
  :end_date,
  :family,
  :fraction,
  :fraction_group,
  :fullname,
  :gender,
  :goverment_body,
  :groups,
  :hidden,
  :id,
  :last_appointment,
  :last_import,
  :person,
  :photo,
  :position,
  :region,
  :relations,
  :site,
  :start_year,
  :submitted,
  :temp_commission,
  :terms_number,
  :total_years,
  :verified,
  :vote_link,
  keyword_init: true
)

# Request payload for SenatorProfile#load.
#
# @!attribute [rw] id
#   @return [Integer]
SenatorProfileLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# SuccessRate entity data model.
#
# @!attribute [rw] approved_number
#   @return [Integer]
#
# @!attribute [rw] filtered_number
#   @return [Integer]
#
# @!attribute [rw] lobbyist_number
#   @return [Integer]
#
# @!attribute [rw] number
#   @return [Integer]
#
# @!attribute [rw] rate
#   @return [Float]
SuccessRate = Struct.new(
  :approved_number,
  :filtered_number,
  :lobbyist_number,
  :number,
  :rate,
  keyword_init: true
)

# Request payload for SuccessRate#load.
#
# @!attribute [rw] person_id
#   @return [Integer]
#
# @!attribute [rw] format
#   @return [String, nil]
SuccessRateLoadMatch = Struct.new(
  :person_id,
  :format,
  keyword_init: true
)

