// Typed models for the Dumabingo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dumabingo-sdk/go/core"
)

// DeputyProfile is the typed data model for the deputy_profile entity.
type DeputyProfile struct {
}

// DeputyProfileLoadMatch is the typed request payload for DeputyProfile.LoadTyped.
type DeputyProfileLoadMatch struct {
	Id int `json:"id"`
}

// LawDraft is the typed data model for the law_draft entity.
type LawDraft struct {
}

// LawDraftLoadMatch is the typed request payload for LawDraft.LoadTyped.
type LawDraftLoadMatch struct {
	Id int `json:"id"`
}

// LobbyGroup is the typed data model for the lobby_group entity.
type LobbyGroup struct {
}

// LobbyGroupListMatch is the typed request payload for LobbyGroup.ListTyped.
type LobbyGroupListMatch struct {
	Id *int `json:"id,omitempty"`
	Level *int `json:"level,omitempty"`
	Lft *int `json:"lft,omitempty"`
	Name *string `json:"name,omitempty"`
	Office *int `json:"office,omitempty"`
	Order *int `json:"order,omitempty"`
	Parent *int `json:"parent,omitempty"`
	Region *int `json:"region,omitempty"`
	Rght *int `json:"rght,omitempty"`
	TreeId *int `json:"tree_id,omitempty"`
}

// Lobbyist is the typed data model for the lobbyist entity.
type Lobbyist struct {
}

// LobbyistListMatch is the typed request payload for Lobbyist.ListTyped.
type LobbyistListMatch struct {
	Chamber string `json:"chamber"`
}

// Person is the typed data model for the person entity.
type Person struct {
}

// PersonListMatch is the typed request payload for Person.ListTyped.
type PersonListMatch struct {
	ConvocationId int `json:"convocation_id"`
	Format *string `json:"format,omitempty"`
}

// SenatorProfile is the typed data model for the senator_profile entity.
type SenatorProfile struct {
}

// SenatorProfileLoadMatch is the typed request payload for SenatorProfile.LoadTyped.
type SenatorProfileLoadMatch struct {
	Id int `json:"id"`
}

// SuccessRate is the typed data model for the success_rate entity.
type SuccessRate struct {
}

// SuccessRateLoadMatch is the typed request payload for SuccessRate.LoadTyped.
type SuccessRateLoadMatch struct {
	PersonId int `json:"person_id"`
	Format *string `json:"format,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
