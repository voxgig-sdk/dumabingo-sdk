

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


describe('LobbyGroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
  afterEach(liveDelay('DUMABINGO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DumabingoSDK.test()
    const ent = testsdk.LobbyGroup()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('lobby_group hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DumabingoSDK.test(offline).LobbyGroup().stream('list')) { }
    }, /offline/)

    for await (const _item of DumabingoSDK.test(offline).LobbyGroup()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DumabingoSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LobbyGroup().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DumabingoSDK.test().LobbyGroup().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DumabingoSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LobbyGroup().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LobbyGroup().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DumabingoSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LobbyGroup().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lobby_group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":0},"level":{"a":true,"h":"Level","n":"level","r":true,"t":"`$INTEGER`","key$":"level","index$":1},"lft":{"a":true,"h":"Lft","n":"lft","r":true,"t":"`$INTEGER`","key$":"lft","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":3},"office":{"a":true,"h":"Office","n":"office","r":true,"sh":"Null in every probe; type unverified.","t":"`$INTEGER`","key$":"office","index$":4},"order":{"a":true,"h":"Order","n":"order","r":true,"t":"`$INTEGER`","key$":"order","index$":5},"parent":{"a":true,"h":"Parent","n":"parent","r":true,"t":"`$INTEGER`","key$":"parent","index$":6},"region":{"a":true,"h":"Region","n":"region","r":true,"sh":"Null in every probe; type unverified.","t":"`$INTEGER`","key$":"region","index$":7},"rght":{"a":true,"h":"Rght","n":"rght","r":true,"t":"`$INTEGER`","key$":"rght","index$":8},"tree_id":{"a":true,"h":"Tree Id","n":"tree_id","r":true,"t":"`$INTEGER`","key$":"tree_id","index$":9}},"id":{"field":"id","name":"id"},"name":"lobby_group","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/lobby_group/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/lobby_group/","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"lobby_group"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"lobby_group","name__orig":"lobby_group","Name":"LobbyGroup","name_":"lobby_group","name-":"lobby-group","NAME":"LOBBY_GROUP","index$":2}, {"active":true,"entity":"lobby_group","key$":"BasicLobbyGroupFlow","kind":"basic","name":"BasicLobbyGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"lobby_group_ref01"}}],"index$":0}]}, 'LobbyGroup', {"GET /api/lobby_group/":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lobby_group_ref01_data = Object.values(setup.data.existing.lobby_group)[0] as any

    // LIST
    const lobby_group_ref01_ent = client.LobbyGroup()
    const lobby_group_ref01_match: any = {}

    const lobby_group_ref01_list = (await lobby_group_ref01_ent.list(lobby_group_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/lobby_group/LobbyGroupTestData.json')

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
    ['lobby_group01','lobby_group02','lobby_group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DUMABINGO_TEST_LOBBY_GROUP_ENTID': idmap,
    'DUMABINGO_TEST_LIVE': 'FALSE',
    'DUMABINGO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DUMABINGO_TEST_LOBBY_GROUP_ENTID']

  const live = 'TRUE' === env.DUMABINGO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DUMABINGO_TEST_LOBBY_GROUP_ENTID']
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
  
