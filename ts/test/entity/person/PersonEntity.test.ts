

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


describe('PersonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
  afterEach(liveDelay('DUMABINGO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DumabingoSDK.test()
    const ent = testsdk.Person()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('person hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DumabingoSDK.test(offline).Person().stream('list')) { }
    }, /offline/)

    for await (const _item of DumabingoSDK.test(offline).Person()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DumabingoSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Person().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DumabingoSDK.test().Person().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DumabingoSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Person().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Person().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DumabingoSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Person().list({"convocation_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'person.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"convocations":{"a":true,"h":"Convocations","n":"convocations","r":true,"t":"`$ARRAY`","key$":"convocations","index$":0},"incomes":{"a":true,"h":"Incomes","n":"incomes","r":true,"t":"`$ARRAY`","key$":"incomes","index$":1},"main":{"a":true,"h":"Main","n":"main","r":true,"t":"`$OBJECT`","key$":"main","index$":2},"person_id":{"a":true,"h":"Person Id","n":"person_id","r":true,"t":"`$INTEGER`","key$":"person_id","index$":3},"position_en":{"a":true,"h":"Position En","n":"position_en","r":true,"t":"`$STRING`","key$":"position_en","index$":4},"position_ru":{"a":true,"h":"Position Ru","n":"position_ru","r":true,"t":"`$STRING`","key$":"position_ru","index$":5},"real_estates":{"a":true,"h":"Real Estates","n":"real_estates","r":true,"t":"`$ARRAY`","key$":"real_estates","index$":6},"savings":{"a":true,"h":"Savings","n":"savings","r":true,"sh":"Empty in the probe; item shape unverified.","t":"`$ARRAY`","key$":"savings","index$":7},"spendings":{"a":true,"h":"Spendings","n":"spendings","r":true,"sh":"Empty in the probe; item shape unverified.","t":"`$ARRAY`","key$":"spendings","index$":8},"stocks":{"a":true,"h":"Stocks","n":"stocks","r":true,"sh":"Empty in the probe; item shape unverified.","t":"`$ARRAY`","key$":"stocks","index$":9},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":true,"t":"`$ARRAY`","key$":"vehicles","index$":10}},"name":"person","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/convocations/{convocationId}/person_convocations","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":8,"k":"param","n":"convocation_id","or":"convocationId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/convocations/{convocationId}/person_convocations","q":{"exist":["convocation_id"]},"r":{"param":{"convocationId":"convocation_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"convocations"},{"var":"convocation_id"},{"lit":"person_convocations"}],"t":{"req":"`reqdata`","res":"`body.persons`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/search/sections/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":57270,"k":"query","n":"person","or":"person","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/search/sections/","q":{"exist":["person"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"search"},{"lit":"sections"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"person","name__orig":"person","Name":"Person","name_":"person","name-":"person","NAME":"PERSON","index$":4}, {"active":true,"entity":"person","key$":"BasicPersonFlow","kind":"basic","name":"BasicPersonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"person_ref01"}}],"index$":0}]}, 'Person', {"GET /api/convocations/{convocationId}/person_convocations":{"protocol":"http","parameters":[{"name":"convocationId","in":"path","required":true,"description":"Convocation number (dumabingo.org uses 7 and 8).","schema":{"type":"integer"},"example":8,"index$":0},{"name":"format","in":"query","required":false,"description":"Django REST Framework renderer; json returns JSON.","schema":{"type":"string","default":"json"},"example":"json","index$":1}]},"GET /api/v1/search/sections/":{"protocol":"http","parameters":[{"name":"person","in":"query","required":true,"description":"Declarator person id (Lobbyist.person).","schema":{"type":"integer"},"example":57270,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let person_ref01_data = Object.values(setup.data.existing.person)[0] as any

    // LIST
    const person_ref01_ent = client.Person()
    const person_ref01_match: any = {}

    const person_ref01_list = (await person_ref01_ent.list(person_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/person/PersonTestData.json')

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
    ['person01','person02','person03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DUMABINGO_TEST_PERSON_ENTID': idmap,
    'DUMABINGO_TEST_LIVE': 'FALSE',
    'DUMABINGO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DUMABINGO_TEST_PERSON_ENTID']

  const live = 'TRUE' === env.DUMABINGO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DUMABINGO_TEST_PERSON_ENTID']
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
  
