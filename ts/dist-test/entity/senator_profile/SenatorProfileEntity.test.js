"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SenatorProfileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DUMABINGO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DumabingoSDK.test();
        const ent = testsdk.SenatorProfile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DumabingoSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SenatorProfile().load({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'senator_profile.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bio": { "a": true, "h": "Bio", "n": "bio", "r": false, "t": "`$STRING`", "key$": "bio", "index$": 0 }, "birth_date": { "a": true, "h": "Birth Date", "n": "birth_date", "r": false, "t": "`$STRING`", "key$": "birth_date", "index$": 1 }, "comments": { "a": true, "h": "Comments", "n": "comments", "r": false, "t": "`$STRING`", "key$": "comments", "index$": 2 }, "commission": { "a": true, "h": "Commission", "n": "commission", "r": false, "t": "`$STRING`", "key$": "commission", "index$": 3 }, "committee": { "a": true, "h": "Committee", "n": "committee", "r": false, "t": "`$STRING`", "key$": "committee", "index$": 4 }, "committees": { "a": true, "h": "Committees", "n": "committees", "r": false, "sh": "Empty in the probe; item type unverified.", "t": "`$ARRAY`", "key$": "committees", "index$": 5 }, "conclusion": { "a": true, "h": "Conclusion", "n": "conclusion", "r": false, "t": "`$STRING`", "key$": "conclusion", "index$": 6 }, "convocations": { "a": true, "h": "Convocations", "n": "convocations", "r": false, "t": "`$ARRAY`", "key$": "convocations", "index$": 7 }, "duma_id": { "a": true, "h": "Duma Id", "n": "duma_id", "r": false, "sh": "State Duma id; null for senators in the probe (an integer in Duma profiles).", "t": "`$INTEGER`", "key$": "duma_id", "index$": 8 }, "edited": { "a": true, "h": "Edited", "n": "edited", "r": false, "t": "`$BOOLEAN`", "key$": "edited", "index$": 9 }, "election_method": { "a": true, "h": "Election Method", "n": "election_method", "r": false, "t": "`$STRING`", "key$": "election_method", "index$": 10 }, "end_date": { "a": true, "h": "End Date", "n": "end_date", "r": false, "t": "`$STRING`", "key$": "end_date", "index$": 11 }, "family": { "a": true, "h": "Family", "n": "family", "r": false, "t": "`$STRING`", "key$": "family", "index$": 12 }, "fraction": { "a": true, "h": "Fraction", "n": "fraction", "r": false, "sh": "Faction name.", "t": "`$STRING`", "key$": "fraction", "index$": 13 }, "fraction_group": { "a": true, "h": "Fraction Group", "n": "fraction_group", "r": false, "t": "`$STRING`", "key$": "fraction_group", "index$": 14 }, "fullname": { "a": true, "h": "Fullname", "n": "fullname", "r": true, "t": "`$STRING`", "key$": "fullname", "index$": 15 }, "gender": { "a": true, "h": "Gender", "n": "gender", "r": false, "t": "`$STRING`", "key$": "gender", "index$": 16 }, "goverment_body": { "a": true, "h": "Goverment Body", "n": "goverment_body", "r": false, "t": "`$STRING`", "key$": "goverment_body", "index$": 17 }, "groups": { "a": true, "h": "Groups", "n": "groups", "r": false, "t": "`$ARRAY`", "key$": "groups", "index$": 18 }, "hidden": { "a": true, "h": "Hidden", "n": "hidden", "r": false, "t": "`$BOOLEAN`", "key$": "hidden", "index$": 19 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 20 }, "last_appointment": { "a": true, "h": "Last Appointment", "n": "last_appointment", "r": false, "t": "`$STRING`", "key$": "last_appointment", "index$": 21 }, "last_import": { "a": true, "h": "Last Import", "n": "last_import", "r": false, "t": "`$STRING`", "key$": "last_import", "index$": 22 }, "person": { "a": true, "h": "Person", "n": "person", "r": true, "t": "`$INTEGER`", "key$": "person", "index$": 23 }, "photo": { "a": true, "h": "Photo", "n": "photo", "r": false, "t": "`$STRING`", "key$": "photo", "index$": 24 }, "position": { "a": true, "h": "Position", "n": "position", "r": false, "t": "`$STRING`", "key$": "position", "index$": 25 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "t": "`$ANY`", "key$": "region", "index$": 26 }, "relations": { "a": true, "h": "Relations", "n": "relations", "r": false, "t": "`$STRING`", "key$": "relations", "index$": 27 }, "site": { "a": true, "h": "Site", "n": "site", "r": false, "t": "`$STRING`", "key$": "site", "index$": 28 }, "start_year": { "a": true, "h": "Start Year", "n": "start_year", "r": false, "t": "`$INTEGER`", "key$": "start_year", "index$": 29 }, "submitted": { "a": true, "h": "Submitted", "n": "submitted", "r": false, "t": "`$STRING`", "key$": "submitted", "index$": 30 }, "temp_commission": { "a": true, "h": "Temp Commission", "n": "temp_commission", "r": false, "t": "`$STRING`", "key$": "temp_commission", "index$": 31 }, "terms_number": { "a": true, "h": "Terms Number", "n": "terms_number", "r": false, "t": "`$INTEGER`", "key$": "terms_number", "index$": 32 }, "total_years": { "a": true, "h": "Total Years", "n": "total_years", "r": false, "t": "`$NUMBER`", "key$": "total_years", "index$": 33 }, "verified": { "a": true, "h": "Verified", "n": "verified", "r": false, "t": "`$BOOLEAN`", "key$": "verified", "index$": 34 }, "vote_link": { "a": true, "h": "Vote Link", "n": "vote_link", "r": false, "sh": "Null in every probe; type unverified.", "t": "`$STRING`", "key$": "vote_link", "index$": 35 } }, "id": { "field": "id", "name": "id" }, "name": "senator_profile", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/lobbist/{id}/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 10514, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/lobbist/{id}/", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "lobbist" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "senator_profile", "name__orig": "senator_profile", "Name": "SenatorProfile", "name_": "senator_profile", "name-": "senator-profile", "NAME": "SENATOR_PROFILE", "index$": 5 }, { "active": true, "entity": "senator_profile", "key$": "BasicSenatorProfileFlow", "kind": "basic", "name": "BasicSenatorProfileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "senator_profile_ref01", "srcdatavar": "senator_profile_ref01_data", "suffix": "_dt0" }, "m": { "id": "senator_profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-senator_profile_ref01" } }], "index$": 0, "route": "GET /api/lobbist/{id}/", "record": {} }] }, 'SenatorProfile', { "GET /api/lobbist/{id}/": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "example": 10514, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let senator_profile_ref01_data = Object.values(setup.data.existing.senator_profile)[0];
        // LOAD
        const senator_profile_ref01_ent = client.SenatorProfile();
        const senator_profile_ref01_match_dt0 = {};
        senator_profile_ref01_match_dt0.id = senator_profile_ref01_data.id;
        const senator_profile_ref01_data_dt0 = (await senator_profile_ref01_ent.load(senator_profile_ref01_match_dt0)).data();
        (0, node_assert_1.default)(senator_profile_ref01_data_dt0.id === senator_profile_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/senator_profile/SenatorProfileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DumabingoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['senator_profile01', 'senator_profile02', 'senator_profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DUMABINGO_TEST_SENATOR_PROFILE_ENTID': idmap,
        'DUMABINGO_TEST_LIVE': 'FALSE',
        'DUMABINGO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DUMABINGO_TEST_SENATOR_PROFILE_ENTID'];
    const live = 'TRUE' === env.DUMABINGO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DUMABINGO_TEST_SENATOR_PROFILE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DumabingoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SenatorProfileEntity.test.js.map