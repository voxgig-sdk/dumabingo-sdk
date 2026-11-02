package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dumabingo",
			"slug": "dumabingo",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.deklarator.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"deputy_profile": map[string]any{},
				"law_draft": map[string]any{},
				"lobby_group": map[string]any{},
				"lobbyist": map[string]any{},
				"person": map[string]any{},
				"senator_profile": map[string]any{},
				"success_rate": map[string]any{},
			},
		},
		"entity": map[string]any{
			"deputy_profile": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "appointing_date",
						"title": "Appointing Date",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "bio",
						"title": "Bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birth_date",
						"title": "Birth Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comments",
						"title": "Comments",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "commission",
						"title": "Commission",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "committee",
						"title": "Committee",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "committees",
						"title": "Committees",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "conclusion",
						"title": "Conclusion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "convocation",
						"title": "Convocation",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "draft",
						"title": "Draft",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "duma_id",
						"title": "Duma Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "election_method",
						"title": "Election Method",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"short": "Free text in the sf dump (e.g.",
					},
					map[string]any{
						"name": "end_date_old",
						"title": "End Date Old",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "fact_checked",
						"title": "Fact Checked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction",
						"title": "Fraction",
						"type": "`$INTEGER`",
						"short": "Faction id.",
					},
					map[string]any{
						"name": "fraction_end_date",
						"title": "Fraction End Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_group",
						"title": "Fraction Group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_old",
						"title": "Fraction Old",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_start_date",
						"title": "Fraction Start Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullname",
						"title": "Fullname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "goverment_body",
						"title": "Goverment Body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hidden",
						"title": "Hidden",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "last_appointment",
						"title": "Last Appointment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_import",
						"title": "Last Import",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "law_draft_count",
						"title": "Law Draft Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lawyer_checked",
						"title": "Lawyer Checked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lobbist",
						"title": "Lobbist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modified_when",
						"title": "Modified When",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "office",
						"title": "Office",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "person",
						"title": "Person",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "photo",
						"title": "Photo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "positions",
						"title": "Positions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "raw_position",
						"title": "Raw Position",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "relations",
						"title": "Relations",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "site",
						"title": "Site",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start_year",
						"title": "Start Year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "submitted",
						"title": "Submitted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temp_commission",
						"title": "Temp Commission",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terms_number",
						"title": "Terms Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_years",
						"title": "Total Years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "vote_link",
						"title": "Vote Link",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "deputy_profile",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/lobbist_detail/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "lobbist_detail",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"lobbist_detail",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 4489,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"law_draft": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "analyst_filled",
						"title": "Analyst Filled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "approved",
						"title": "Approved",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "committees",
						"title": "Committees",
						"type": "`$ARRAY`",
						"short": "Committee ids.",
					},
					map[string]any{
						"name": "core",
						"title": "Core",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_by",
						"title": "Created By",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_when",
						"title": "Created When",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departments",
						"title": "Departments",
						"type": "`$ARRAY`",
						"short": "Empty in every probe; item type unverified (probably integer ids).",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "entry_date",
						"title": "Entry Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fact_checked",
						"title": "Fact Checked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "in_watch_list",
						"title": "In Watch List",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "initiator_offices",
						"title": "Initiator Offices",
						"type": "`$ARRAY`",
						"short": "Empty in every probe; item type unverified (probably integer ids).",
					},
					map[string]any{
						"name": "initiators",
						"title": "Initiators",
						"type": "`$ARRAY`",
						"short": "Empty in every probe; item type unverified (probably integer ids).",
					},
					map[string]any{
						"name": "is_lobbyist",
						"title": "Is Lobbyist",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "keywords",
						"title": "Keywords",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "last_update",
						"title": "Last Update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "law_authors",
						"title": "Law Authors",
						"type": "`$ARRAY`",
						"short": "Declarator person ids of the authors.",
					},
					map[string]any{
						"name": "lawyer_checked",
						"title": "Lawyer Checked",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "markers",
						"title": "Markers",
						"type": "`$ARRAY`",
						"short": "Empty in every probe; item type unverified (probably integer ids).",
					},
					map[string]any{
						"name": "modified_by",
						"title": "Modified By",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modified_when",
						"title": "Modified When",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "old_phase",
						"title": "Old Phase",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "parties",
						"title": "Parties",
						"type": "`$ARRAY`",
						"short": "Empty in every probe; item type unverified (probably integer ids).",
					},
					map[string]any{
						"name": "possible_interested_persons",
						"title": "Possible Interested Persons",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transcript_url",
						"title": "Transcript Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "law_draft",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/law_draft_api/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "law_draft_api",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"law_draft_api",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 391,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lobby_group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "level",
						"title": "Level",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "lft",
						"title": "Lft",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "office",
						"title": "Office",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "order",
						"title": "Order",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Null in every probe; type unverified.",
					},
					map[string]any{
						"name": "rght",
						"title": "Rght",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "tree_id",
						"title": "Tree Id",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "lobby_group",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/lobby_group/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "lobby_group",
									},
								},
								"parts": []any{
									"api",
									"lobby_group",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lobbyist": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "birth_date",
						"title": "Birth Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "commission",
						"title": "Commission",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "committee",
						"title": "Committee",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "committees",
						"title": "Committees",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "convocation",
						"title": "Convocation",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "convocations",
						"title": "Convocations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "draft",
						"title": "Draft",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "election_method",
						"title": "Election Method",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"req": true,
						"short": "Free text in the sf dump (e.g.",
					},
					map[string]any{
						"name": "fraction",
						"title": "Fraction",
						"type": "`$ANY`",
						"short": "Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown.",
					},
					map[string]any{
						"name": "fraction_end_date",
						"title": "Fraction End Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_group",
						"title": "Fraction Group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_old",
						"title": "Fraction Old",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction_start_date",
						"title": "Fraction Start Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullname",
						"title": "Fullname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "goverment_body",
						"title": "Goverment Body",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Lobby group ids (listLobbyGroups).",
					},
					map[string]any{
						"name": "hidden",
						"title": "Hidden",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council).",
					},
					map[string]any{
						"name": "last_appointment",
						"title": "Last Appointment",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "law_draft_apis",
						"title": "Law Draft Apis",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "law_draft_count",
						"title": "Law Draft Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lobbist",
						"title": "Lobbist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modified_when",
						"title": "Modified When",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "person",
						"title": "Person",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Declarator person id: use with searchSections and getSuccessRate.",
					},
					map[string]any{
						"name": "positions",
						"title": "Positions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "rupep",
						"title": "Rupep",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "site",
						"title": "Site",
						"type": "`$STRING`",
						"req": true,
						"short": "Chamber: 'D' (State Duma) or 'S' (Federation Council).",
					},
					map[string]any{
						"name": "start_year",
						"title": "Start Year",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "temp_commission",
						"title": "Temp Commission",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "terms_number",
						"title": "Terms Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "total_years",
						"title": "Total Years",
						"type": "`$NUMBER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "lobbyist",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/media/dumps/lobbist-small-{chamber}.json",
								"segments": []any{
									map[string]any{
										"lit": "media",
									},
									map[string]any{
										"lit": "dumps",
									},
									map[string]any{
										"lit": "lobbist-small-{chamber}.json",
									},
								},
								"parts": []any{
									"media",
									"dumps",
									"lobbist-small-{chamber}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "chamber",
											"orig": "chamber",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "sf",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"chamber",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"person": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "convocations",
						"title": "Convocations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "incomes",
						"title": "Incomes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "main",
						"title": "Main",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "person_id",
						"title": "Person Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "position_en",
						"title": "Position En",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "position_ru",
						"title": "Position Ru",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "real_estates",
						"title": "Real Estates",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "savings",
						"title": "Savings",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Empty in the probe; item shape unverified.",
					},
					map[string]any{
						"name": "spendings",
						"title": "Spendings",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Empty in the probe; item shape unverified.",
					},
					map[string]any{
						"name": "stocks",
						"title": "Stocks",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Empty in the probe; item shape unverified.",
					},
					map[string]any{
						"name": "vehicles",
						"title": "Vehicles",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "person",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/convocations/{convocationId}/person_convocations",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "convocations",
									},
									map[string]any{
										"var": "convocation_id",
									},
									map[string]any{
										"lit": "person_convocations",
									},
								},
								"parts": []any{
									"api",
									"convocations",
									"{convocation_id}",
									"person_convocations",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"convocationId": "convocation_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.persons`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "convocation_id",
											"orig": "convocationId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 8,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "json",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"convocation_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/search/sections/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "sections",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"search",
									"sections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "person",
											"orig": "person",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 57270,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"person",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"senator_profile": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bio",
						"title": "Bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birth_date",
						"title": "Birth Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comments",
						"title": "Comments",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "commission",
						"title": "Commission",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "committee",
						"title": "Committee",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "committees",
						"title": "Committees",
						"type": "`$ARRAY`",
						"short": "Empty in the probe; item type unverified.",
					},
					map[string]any{
						"name": "conclusion",
						"title": "Conclusion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "convocations",
						"title": "Convocations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "duma_id",
						"title": "Duma Id",
						"type": "`$INTEGER`",
						"short": "State Duma id; null for senators in the probe (an integer in Duma profiles).",
					},
					map[string]any{
						"name": "edited",
						"title": "Edited",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "election_method",
						"title": "Election Method",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fraction",
						"title": "Fraction",
						"type": "`$STRING`",
						"short": "Faction name.",
					},
					map[string]any{
						"name": "fraction_group",
						"title": "Fraction Group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullname",
						"title": "Fullname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "goverment_body",
						"title": "Goverment Body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hidden",
						"title": "Hidden",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "last_appointment",
						"title": "Last Appointment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_import",
						"title": "Last Import",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "person",
						"title": "Person",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "photo",
						"title": "Photo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "position",
						"title": "Position",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "relations",
						"title": "Relations",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "site",
						"title": "Site",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start_year",
						"title": "Start Year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "submitted",
						"title": "Submitted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temp_commission",
						"title": "Temp Commission",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terms_number",
						"title": "Terms Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_years",
						"title": "Total Years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vote_link",
						"title": "Vote Link",
						"type": "`$STRING`",
						"short": "Null in every probe; type unverified.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "senator_profile",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/lobbist/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "lobbist",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"lobbist",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 10514,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"success_rate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "approved_number",
						"title": "Approved Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "filtered_number",
						"title": "Filtered Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "lobbyist_number",
						"title": "Lobbyist Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "rate",
						"title": "Rate",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Percentage of proposed bills that passed; null when none were proposed.",
					},
				},
				"name": "success_rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/persons/{personId}/success_rate",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "persons",
									},
									map[string]any{
										"var": "person_id",
									},
									map[string]any{
										"lit": "success_rate",
									},
								},
								"parts": []any{
									"api",
									"persons",
									"{person_id}",
									"success_rate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"personId": "person_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.success_rate`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "person_id",
											"orig": "personId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 31850,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "json",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"person_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.person",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
