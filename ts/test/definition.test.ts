import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "deputy_profile",
    "accessor": "DeputyProfile",
    "op": "load",
    "method": "GET",
    "path": "/api/lobbist_detail/{id}/",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 4489
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "appointing_date": "x",
      "bio": "x",
      "birth_date": "1980-08-09",
      "comments": "",
      "commission": "",
      "committee": "",
      "committees": [
        "Комитет ГД по туризму и развитию туристической инфраструктуры"
      ],
      "conclusion": "x",
      "convocation": 1,
      "draft": true,
      "duma_id": 1,
      "edited": true,
      "election_method": "партийный список",
      "end_date": "2024-06-01",
      "end_date_old": "x",
      "fact_checked": true,
      "family": "",
      "fraction": 1,
      "fraction_end_date": "2026-12-20",
      "fraction_group": "Группа Шхагошева А.Л.",
      "fraction_old": "ЛДПР",
      "fraction_start_date": "2021-10-12",
      "fullname": "Костенко Наталья Васильевна",
      "gender": "F",
      "goverment_body": "исполнительный орган власти",
      "groups": [
        1
      ],
      "hidden": true,
      "id": 1,
      "last_appointment": "2017-09-26",
      "last_import": "2019-01-23T20:31:26.366445",
      "law_draft_count": 1,
      "lawyer_checked": true,
      "lobbist": 1,
      "modified_when": "2025-09-01",
      "office": "x",
      "person": 1,
      "photo": "lobbist/Костенко_Наталья_Васильевна.jpg",
      "positions": [
        1
      ],
      "raw_position": "",
      "region": {
        "id": 1,
        "name": "Москва",
        "short_name": "Москва",
        "genitive": "города Москвы"
      },
      "relations": "x",
      "site": "D",
      "start_year": 1,
      "submitted": "x",
      "temp_commission": "",
      "terms_number": 1,
      "total_years": 1,
      "vote_link": "http://vote.duma.gov.ru/?convocation=AAAAAAA7&deputy=99112787&sort=date_desc"
    },
    "idField": "id"
  },
  {
    "entity": "law_draft",
    "accessor": "LawDraft",
    "op": "load",
    "method": "GET",
    "path": "/api/law_draft_api/{id}/",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 391
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "keywords": [
        "экология"
      ],
      "entry_date": "2022-07-11",
      "created_when": "2022-09-19T23:55:16.984079",
      "modified_when": "2024-07-22T19:38:36.801032",
      "name": "x",
      "number": "161119-8",
      "link": "https://sozd.duma.gov.ru/bill/161119-8",
      "description": "x",
      "transcript_url": "http://api.duma.gov.ru/api/transcript/332229-8",
      "old_phase": "x",
      "type": "Федеральный закон",
      "in_watch_list": true,
      "core": "x",
      "possible_interested_persons": "x",
      "note": "x",
      "analyst_filled": true,
      "lawyer_checked": true,
      "fact_checked": true,
      "approved": true,
      "is_lobbyist": true,
      "last_update": "2023-05-05T09:52:31.761676",
      "created_by": 1,
      "modified_by": 1,
      "law_authors": [
        1
      ],
      "initiators": [],
      "initiator_offices": [],
      "parties": [],
      "committees": [
        1
      ],
      "departments": [],
      "markers": []
    },
    "idField": "id"
  },
  {
    "entity": "lobby_group",
    "accessor": "LobbyGroup",
    "op": "list",
    "method": "GET",
    "path": "/api/lobby_group/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "level": 1,
        "lft": 1,
        "name": "Группа интересов силовых структур",
        "office": 1,
        "order": 1,
        "parent": 1,
        "region": 1,
        "rght": 1,
        "tree_id": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "lobbyist",
    "accessor": "Lobbyist",
    "op": "list",
    "method": "GET",
    "path": "/media/dumps/lobbist-small-{chamber}.json",
    "args": [
      {
        "name": "chamber",
        "wire": "chamber",
        "value": "sf"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "person": 1,
        "fullname": "Строкова Елена Викторовна",
        "gender": "F",
        "rupep": "3193",
        "site": "D",
        "committee": "Член Комитета ГД по международным делам",
        "birth_date": "1976-02-17",
        "goverment_body": "исполнительный орган власти",
        "terms_number": 1,
        "total_years": 1,
        "start_year": 1,
        "commission": "",
        "temp_commission": "",
        "convocations": [
          "VIII"
        ],
        "committees": [
          "Комитет ГД по международным делам"
        ],
        "region": {
          "id": 1,
          "name": "Москва",
          "short_name": "Москва",
          "genitive": "города Москвы"
        },
        "law_draft_apis": [
          {
            "id": 1,
            "name": "x",
            "number": "1179398-7",
            "link": "https://sozd.duma.gov.ru/bill/1179398-7"
          }
        ],
        "fraction_old": "ЛДПР",
        "fraction_start_date": "2016-10-05",
        "fraction_end_date": "2021-10-11",
        "fraction_group": "Группа Шхагошева А.Л.",
        "election_method": "партийный список",
        "last_appointment": "2017-09-26",
        "end_date": "2024-06-01",
        "law_draft_count": 1,
        "draft": true,
        "modified_when": "2025-09-01",
        "hidden": true,
        "lobbist": 1,
        "convocation": 1,
        "fraction": 1,
        "positions": [
          1
        ],
        "groups": [
          1
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "person",
    "accessor": "Person",
    "op": "list",
    "method": "GET",
    "path": "/api/convocations/{convocationId}/person_convocations",
    "args": [
      {
        "name": "convocation_id",
        "wire": "convocationId",
        "value": 8
      }
    ],
    "select": {
      "format": "json"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "persons": [
        {
          "person_id": 1,
          "convocations": [
            "VIII"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "person",
    "accessor": "Person",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/search/sections/",
    "args": [],
    "select": {
      "person": 57270
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "person"
    ],
    "queryArgs": [
      {
        "name": "person",
        "wire": "person"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "count": 1,
      "next": "x",
      "previous": "x",
      "results": [
        {
          "incomes": [
            {
              "comment": "",
              "relative": {},
              "size": 1
            }
          ],
          "main": {
            "document_type": {
              "id": 1,
              "name": "x"
            },
            "office": {
              "id": 1,
              "name": "Совет Федерации",
              "region": {},
              "type": {
                "id": 1,
                "name": "x"
              },
              "url": "http://council.gov.ru"
            },
            "party": {},
            "person": {
              "family_name": "Ракитин",
              "gender": "M",
              "given_name": "Александр",
              "id": 1,
              "name": "Ракитин Александр Васильевич",
              "patronymic_name": "Васильевич",
              "wikipedia_id": "Q41295310"
            },
            "year": 1
          },
          "position_en": "",
          "position_ru": "x",
          "real_estates": [
            {
              "comment": "",
              "country": "Россия",
              "name": "Для размещения гаражей и автостоянок",
              "own_type": {
                "id": 1,
                "name": "x"
              },
              "region": {},
              "relative": {},
              "share": 1,
              "square": 1,
              "type": {
                "id": 1,
                "name": "x"
              }
            }
          ],
          "savings": [],
          "spendings": [],
          "stocks": [],
          "vehicles": [
            {
              "brand": {},
              "brand_parent": {},
              "comment": "",
              "full_info": "Автомобиль легковой, Mitsubishi Pajero МИЦУБИСИ PAJERO",
              "manufacture_year": 1,
              "name": "МИЦУБИСИ PAJERO",
              "relative": {},
              "type": {
                "id": 1,
                "name": "x"
              }
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "senator_profile",
    "accessor": "SenatorProfile",
    "op": "load",
    "method": "GET",
    "path": "/api/lobbist/{id}/",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 10514
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "bio": "x",
      "birth_date": "1958-05-17",
      "comments": "",
      "commission": "",
      "committee": "Комитет по обороне и безопасности",
      "committees": [],
      "conclusion": "x",
      "convocations": [
        "I"
      ],
      "duma_id": 1,
      "edited": true,
      "election_method": "партийный список",
      "end_date": "сентябрь 2022",
      "family": "",
      "fraction": "x",
      "fraction_group": "Группа Шхагошева А.Л.",
      "fullname": "Ракитин Александр Васильевич",
      "gender": "M",
      "goverment_body": "исполнительный орган власти",
      "groups": [
        1
      ],
      "hidden": true,
      "id": 1,
      "last_appointment": "2017-09-26",
      "last_import": "2020-05-24T16:48:00.133790",
      "person": 1,
      "photo": "x",
      "position": "Первый заместитель председателя Комитета",
      "region": {
        "id": 1,
        "name": "Москва",
        "short_name": "Москва",
        "genitive": "города Москвы"
      },
      "relations": "x",
      "site": "S",
      "start_year": 1,
      "submitted": "x",
      "temp_commission": "",
      "terms_number": 1,
      "total_years": 1,
      "verified": true,
      "vote_link": "x"
    },
    "idField": "id"
  },
  {
    "entity": "success_rate",
    "accessor": "SuccessRate",
    "op": "load",
    "method": "GET",
    "path": "/api/persons/{personId}/success_rate",
    "args": [
      {
        "name": "person_id",
        "wire": "personId",
        "value": 31850
      }
    ],
    "select": {
      "format": "json"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "success_rate": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
