

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DumabingoSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DeputyProfileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
  afterEach(liveDelay('DUMABINGO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DumabingoSDK.test()
    const ent = testsdk.DeputyProfile()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DumabingoSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeputyProfile().load({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deputy_profile.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"appointing_date":{"a":true,"h":"Appointing Date","n":"appointing_date","r":false,"sh":"Null in every probe; type unverified.","t":"`$STRING`","key$":"appointing_date","index$":0},"bio":{"a":true,"h":"Bio","n":"bio","r":false,"t":"`$STRING`","key$":"bio","index$":1},"birth_date":{"a":true,"h":"Birth Date","n":"birth_date","r":false,"t":"`$STRING`","key$":"birth_date","index$":2},"comments":{"a":true,"h":"Comments","n":"comments","r":false,"t":"`$STRING`","key$":"comments","index$":3},"commission":{"a":true,"h":"Commission","n":"commission","r":false,"t":"`$STRING`","key$":"commission","index$":4},"committee":{"a":true,"h":"Committee","n":"committee","r":false,"t":"`$STRING`","key$":"committee","index$":5},"committees":{"a":true,"h":"Committees","n":"committees","r":false,"t":"`$ARRAY`","key$":"committees","index$":6},"conclusion":{"a":true,"h":"Conclusion","n":"conclusion","r":false,"t":"`$STRING`","key$":"conclusion","index$":7},"convocation":{"a":true,"h":"Convocation","n":"convocation","r":false,"t":"`$INTEGER`","key$":"convocation","index$":8},"draft":{"a":true,"h":"Draft","n":"draft","r":false,"t":"`$BOOLEAN`","key$":"draft","index$":9},"duma_id":{"a":true,"h":"Duma Id","n":"duma_id","r":false,"t":"`$INTEGER`","key$":"duma_id","index$":10},"edited":{"a":true,"h":"Edited","n":"edited","r":false,"t":"`$BOOLEAN`","key$":"edited","index$":11},"election_method":{"a":true,"h":"Election Method","n":"election_method","r":false,"t":"`$STRING`","key$":"election_method","index$":12},"end_date":{"a":true,"h":"End Date","n":"end_date","r":false,"sh":"Free text in the sf dump (e.g.","t":"`$STRING`","key$":"end_date","index$":13},"end_date_old":{"a":true,"h":"End Date Old","n":"end_date_old","r":false,"sh":"Null in every probe; type unverified.","t":"`$STRING`","key$":"end_date_old","index$":14},"fact_checked":{"a":true,"h":"Fact Checked","n":"fact_checked","r":false,"t":"`$BOOLEAN`","key$":"fact_checked","index$":15},"family":{"a":true,"h":"Family","n":"family","r":false,"t":"`$STRING`","key$":"family","index$":16},"fraction":{"a":true,"h":"Fraction","n":"fraction","r":false,"sh":"Faction id.","t":"`$INTEGER`","key$":"fraction","index$":17},"fraction_end_date":{"a":true,"h":"Fraction End Date","n":"fraction_end_date","r":false,"t":"`$STRING`","key$":"fraction_end_date","index$":18},"fraction_group":{"a":true,"h":"Fraction Group","n":"fraction_group","r":false,"t":"`$STRING`","key$":"fraction_group","index$":19},"fraction_old":{"a":true,"h":"Fraction Old","n":"fraction_old","r":false,"t":"`$STRING`","key$":"fraction_old","index$":20},"fraction_start_date":{"a":true,"h":"Fraction Start Date","n":"fraction_start_date","r":false,"t":"`$STRING`","key$":"fraction_start_date","index$":21},"fullname":{"a":true,"h":"Fullname","n":"fullname","r":true,"t":"`$STRING`","key$":"fullname","index$":22},"gender":{"a":true,"h":"Gender","n":"gender","r":false,"t":"`$STRING`","key$":"gender","index$":23},"goverment_body":{"a":true,"h":"Goverment Body","n":"goverment_body","r":false,"t":"`$STRING`","key$":"goverment_body","index$":24},"groups":{"a":true,"h":"Groups","n":"groups","r":false,"t":"`$ARRAY`","key$":"groups","index$":25},"hidden":{"a":true,"h":"Hidden","n":"hidden","r":false,"t":"`$BOOLEAN`","key$":"hidden","index$":26},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":27},"last_appointment":{"a":true,"h":"Last Appointment","n":"last_appointment","r":false,"t":"`$STRING`","key$":"last_appointment","index$":28},"last_import":{"a":true,"h":"Last Import","n":"last_import","r":false,"t":"`$STRING`","key$":"last_import","index$":29},"law_draft_count":{"a":true,"h":"Law Draft Count","n":"law_draft_count","r":false,"t":"`$INTEGER`","key$":"law_draft_count","index$":30},"lawyer_checked":{"a":true,"h":"Lawyer Checked","n":"lawyer_checked","r":false,"t":"`$BOOLEAN`","key$":"lawyer_checked","index$":31},"lobbist":{"a":true,"h":"Lobbist","n":"lobbist","r":false,"t":"`$INTEGER`","key$":"lobbist","index$":32},"modified_when":{"a":true,"h":"Modified When","n":"modified_when","r":false,"t":"`$STRING`","key$":"modified_when","index$":33},"office":{"a":true,"h":"Office","n":"office","r":false,"sh":"Null in every probe; type unverified.","t":"`$STRING`","key$":"office","index$":34},"person":{"a":true,"h":"Person","n":"person","r":true,"t":"`$INTEGER`","key$":"person","index$":35},"photo":{"a":true,"h":"Photo","n":"photo","r":false,"t":"`$STRING`","key$":"photo","index$":36},"positions":{"a":true,"h":"Positions","n":"positions","r":false,"t":"`$ARRAY`","key$":"positions","index$":37},"raw_position":{"a":true,"h":"Raw Position","n":"raw_position","r":false,"t":"`$STRING`","key$":"raw_position","index$":38},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$ANY`","key$":"region","index$":39},"relations":{"a":true,"h":"Relations","n":"relations","r":false,"t":"`$STRING`","key$":"relations","index$":40},"site":{"a":true,"h":"Site","n":"site","r":false,"t":"`$STRING`","key$":"site","index$":41},"start_year":{"a":true,"h":"Start Year","n":"start_year","r":false,"t":"`$INTEGER`","key$":"start_year","index$":42},"submitted":{"a":true,"h":"Submitted","n":"submitted","r":false,"t":"`$STRING`","key$":"submitted","index$":43},"temp_commission":{"a":true,"h":"Temp Commission","n":"temp_commission","r":false,"t":"`$STRING`","key$":"temp_commission","index$":44},"terms_number":{"a":true,"h":"Terms Number","n":"terms_number","r":false,"t":"`$INTEGER`","key$":"terms_number","index$":45},"total_years":{"a":true,"h":"Total Years","n":"total_years","r":false,"t":"`$NUMBER`","key$":"total_years","index$":46},"vote_link":{"a":true,"h":"Vote Link","n":"vote_link","r":false,"t":"`$STRING`","key$":"vote_link","index$":47}},"id":{"field":"id","name":"id"},"name":"deputy_profile","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/lobbist_detail/{id}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":4489,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/lobbist_detail/{id}/","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"lobbist_detail"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"deputy_profile","name__orig":"deputy_profile","Name":"DeputyProfile","name_":"deputy_profile","name-":"deputy-profile","NAME":"DEPUTY_PROFILE","index$":0}, {"active":true,"entity":"deputy_profile","key$":"BasicDeputyProfileFlow","kind":"basic","name":"BasicDeputyProfileFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"deputy_profile_ref01","srcdatavar":"deputy_profile_ref01_data","suffix":"_dt0"},"m":{"id":"deputy_profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-deputy_profile_ref01"}}],"index$":0,"route":"GET /api/lobbist_detail/{id}/","record":{}}]}, 'DeputyProfile', {"GET /api/lobbist_detail/{id}/":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"example":4489,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deputy_profile_ref01_data = Object.values(setup.data.existing.deputy_profile)[0] as any

    // LOAD
    const deputy_profile_ref01_ent = client.DeputyProfile()
    const deputy_profile_ref01_match_dt0: any = {}
    deputy_profile_ref01_match_dt0.id = deputy_profile_ref01_data.id
    const deputy_profile_ref01_data_dt0 = (await deputy_profile_ref01_ent.load(deputy_profile_ref01_match_dt0)).data()
    assert(deputy_profile_ref01_data_dt0.id === deputy_profile_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deputy_profile/DeputyProfileTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DumabingoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['deputy_profile01','deputy_profile02','deputy_profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DUMABINGO_TEST_DEPUTY_PROFILE_ENTID': idmap,
    'DUMABINGO_TEST_LIVE': 'FALSE',
    'DUMABINGO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DUMABINGO_TEST_DEPUTY_PROFILE_ENTID']

  const live = 'TRUE' === env.DUMABINGO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DUMABINGO_TEST_DEPUTY_PROFILE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DumabingoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DUMABINGO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
