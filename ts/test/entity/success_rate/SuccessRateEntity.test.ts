

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


describe('SuccessRateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
  afterEach(liveDelay('DUMABINGO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DumabingoSDK.test()
    const ent = testsdk.SuccessRate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DumabingoSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SuccessRate().load({"person_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'success_rate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"approved_number":{"a":true,"h":"Approved Number","n":"approved_number","r":true,"t":"`$INTEGER`","key$":"approved_number","index$":0},"filtered_number":{"a":true,"h":"Filtered Number","n":"filtered_number","r":true,"t":"`$INTEGER`","key$":"filtered_number","index$":1},"lobbyist_number":{"a":true,"h":"Lobbyist Number","n":"lobbyist_number","r":true,"t":"`$INTEGER`","key$":"lobbyist_number","index$":2},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":3},"rate":{"a":true,"h":"Rate","n":"rate","r":true,"sh":"Percentage of proposed bills that passed; null when none were proposed.","t":"`$NUMBER`","key$":"rate","index$":4}},"name":"success_rate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/persons/{personId}/success_rate","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":31850,"k":"param","n":"person_id","or":"personId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/persons/{personId}/success_rate","q":{"exist":["person_id"]},"r":{"param":{"personId":"person_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"persons"},{"var":"person_id"},{"lit":"success_rate"}],"t":{"req":"`reqdata`","res":"`body.success_rate`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.person"]]},"key$":"success_rate","name__orig":"success_rate","Name":"SuccessRate","name_":"success_rate","name-":"success-rate","NAME":"SUCCESS_RATE","index$":6}, {"active":true,"entity":"success_rate","key$":"BasicSuccessRateFlow","kind":"basic","name":"BasicSuccessRateFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"success_rate_ref01","srcdatavar":"success_rate_ref01_data","suffix":"_dt0"},"m":{"id":"success_rate01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-success_rate_ref01"}}],"unreachable":true}]}, 'SuccessRate', {"GET /api/persons/{personId}/success_rate":{"protocol":"http","parameters":[{"name":"personId","in":"path","required":true,"description":"Declarator person id (Lobbyist.person).","schema":{"type":"integer"},"example":31850,"index$":0},{"name":"format","in":"query","required":false,"description":"Django REST Framework renderer; json returns JSON.","schema":{"type":"string","default":"json"},"example":"json","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let success_rate_ref01_data = Object.values(setup.data.existing.success_rate)[0] as any

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
      '../../../../.sdk/test/entity/success_rate/SuccessRateTestData.json')

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
    ['success_rate01','success_rate02','success_rate03','person01','person02','person03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DUMABINGO_TEST_SUCCESS_RATE_ENTID': idmap,
    'DUMABINGO_TEST_LIVE': 'FALSE',
    'DUMABINGO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DUMABINGO_TEST_SUCCESS_RATE_ENTID']

  const live = 'TRUE' === env.DUMABINGO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DUMABINGO_TEST_SUCCESS_RATE_ENTID']
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
  
