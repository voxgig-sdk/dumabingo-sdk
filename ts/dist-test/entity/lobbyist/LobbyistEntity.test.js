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
(0, node_test_1.describe)('LobbyistEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DUMABINGO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DumabingoSDK.test();
        const ent = testsdk.Lobbyist();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DumabingoSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Lobbyist().list({ "chamber": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lobbyist.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "birth_date": { "a": true, "h": "Birth Date", "n": "birth_date", "r": true, "t": "`$STRING`", "key$": "birth_date", "index$": 0 }, "commission": { "a": true, "h": "Commission", "n": "commission", "r": true, "t": "`$STRING`", "key$": "commission", "index$": 1 }, "committee": { "a": true, "h": "Committee", "n": "committee", "r": true, "t": "`$STRING`", "key$": "committee", "index$": 2 }, "committees": { "a": true, "h": "Committees", "n": "committees", "r": true, "t": "`$ARRAY`", "key$": "committees", "index$": 3 }, "convocation": { "a": true, "h": "Convocation", "n": "convocation", "r": false, "t": "`$INTEGER`", "key$": "convocation", "index$": 4 }, "convocations": { "a": true, "h": "Convocations", "n": "convocations", "r": true, "t": "`$ARRAY`", "key$": "convocations", "index$": 5 }, "draft": { "a": true, "h": "Draft", "n": "draft", "r": false, "t": "`$BOOLEAN`", "key$": "draft", "index$": 6 }, "election_method": { "a": true, "h": "Election Method", "n": "election_method", "r": true, "t": "`$STRING`", "key$": "election_method", "index$": 7 }, "end_date": { "a": true, "h": "End Date", "n": "end_date", "r": true, "sh": "Free text in the sf dump (e.g.", "t": "`$STRING`", "key$": "end_date", "index$": 8 }, "fraction": { "a": true, "h": "Fraction", "n": "fraction", "r": false, "sh": "Faction: an integer faction id in the Duma dumps (d7, d8), the faction NAME as a string in the Federation Council dump (sf); null when unknown.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "fraction", "index$": 9 }, "fraction_end_date": { "a": true, "h": "Fraction End Date", "n": "fraction_end_date", "r": false, "t": "`$STRING`", "key$": "fraction_end_date", "index$": 10 }, "fraction_group": { "a": true, "h": "Fraction Group", "n": "fraction_group", "r": false, "t": "`$STRING`", "key$": "fraction_group", "index$": 11 }, "fraction_old": { "a": true, "h": "Fraction Old", "n": "fraction_old", "r": false, "t": "`$STRING`", "key$": "fraction_old", "index$": 12 }, "fraction_start_date": { "a": true, "h": "Fraction Start Date", "n": "fraction_start_date", "r": false, "t": "`$STRING`", "key$": "fraction_start_date", "index$": 13 }, "fullname": { "a": true, "h": "Fullname", "n": "fullname", "r": true, "t": "`$STRING`", "key$": "fullname", "index$": 14 }, "gender": { "a": true, "h": "Gender", "n": "gender", "r": true, "t": "`$STRING`", "key$": "gender", "index$": 15 }, "goverment_body": { "a": true, "h": "Goverment Body", "n": "goverment_body", "r": true, "t": "`$STRING`", "key$": "goverment_body", "index$": 16 }, "groups": { "a": true, "h": "Groups", "n": "groups", "r": true, "sh": "Lobby group ids (listLobbyGroups).", "t": "`$ARRAY`", "key$": "groups", "index$": 17 }, "hidden": { "a": true, "h": "Hidden", "n": "hidden", "r": true, "t": "`$BOOLEAN`", "key$": "hidden", "index$": 18 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Lobbyist record id: the {id} of getDeputyProfile (Duma) or getSenatorProfile (Federation Council).", "t": "`$INTEGER`", "key$": "id", "index$": 19 }, "last_appointment": { "a": true, "h": "Last Appointment", "n": "last_appointment", "r": true, "t": "`$STRING`", "key$": "last_appointment", "index$": 20 }, "law_draft_apis": { "a": true, "h": "Law Draft Apis", "n": "law_draft_apis", "r": false, "t": "`$ARRAY`", "key$": "law_draft_apis", "index$": 21 }, "law_draft_count": { "a": true, "h": "Law Draft Count", "n": "law_draft_count", "r": false, "t": "`$INTEGER`", "key$": "law_draft_count", "index$": 22 }, "lobbist": { "a": true, "h": "Lobbist", "n": "lobbist", "r": false, "t": "`$INTEGER`", "key$": "lobbist", "index$": 23 }, "modified_when": { "a": true, "h": "Modified When", "n": "modified_when", "r": false, "t": "`$STRING`", "key$": "modified_when", "index$": 24 }, "person": { "a": true, "h": "Person", "n": "person", "r": true, "sh": "Declarator person id: use with searchSections and getSuccessRate.", "t": "`$INTEGER`", "key$": "person", "index$": 25 }, "positions": { "a": true, "h": "Positions", "n": "positions", "r": false, "t": "`$ARRAY`", "key$": "positions", "index$": 26 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": "`$ANY`", "key$": "region", "index$": 27 }, "rupep": { "a": true, "h": "Rupep", "n": "rupep", "r": false, "t": "`$STRING`", "key$": "rupep", "index$": 28 }, "site": { "a": true, "h": "Site", "n": "site", "r": true, "sh": "Chamber: 'D' (State Duma) or 'S' (Federation Council).", "t": "`$STRING`", "key$": "site", "index$": 29 }, "start_year": { "a": true, "h": "Start Year", "n": "start_year", "r": true, "t": "`$INTEGER`", "key$": "start_year", "index$": 30 }, "temp_commission": { "a": true, "h": "Temp Commission", "n": "temp_commission", "r": true, "t": "`$STRING`", "key$": "temp_commission", "index$": 31 }, "terms_number": { "a": true, "h": "Terms Number", "n": "terms_number", "r": true, "t": "`$INTEGER`", "key$": "terms_number", "index$": 32 }, "total_years": { "a": true, "h": "Total Years", "n": "total_years", "r": true, "t": "`$NUMBER`", "key$": "total_years", "index$": 33 } }, "id": { "field": "id", "name": "id" }, "name": "lobbyist", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /media/dumps/lobbist-small-{chamber}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "sf", "k": "param", "n": "chamber", "or": "chamber", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/media/dumps/lobbist-small-{chamber}.json", "q": { "exist": ["chamber"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "media" }, { "lit": "dumps" }, { "lit": "lobbist-small-{chamber}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "lobbyist", "name__orig": "lobbyist", "Name": "Lobbyist", "name_": "lobbyist", "name-": "lobbyist", "NAME": "LOBBYIST", "index$": 3 }, { "active": true, "entity": "lobbyist", "key$": "BasicLobbyistFlow", "kind": "basic", "name": "BasicLobbyistFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "chamber": "chamber01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "lobbyist_ref01" } }], "index$": 0 }] }, 'Lobbyist', { "GET /media/dumps/lobbist-small-{chamber}.json": { "protocol": "http", "parameters": [{ "name": "chamber", "in": "path", "required": true, "description": "Dump id.", "schema": { "type": "string", "enum": ["d7", "d8", "sf"] }, "example": "sf", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let lobbyist_ref01_data = Object.values(setup.data.existing.lobbyist)[0];
        // LIST
        const lobbyist_ref01_ent = client.Lobbyist();
        const lobbyist_ref01_match = {};
        lobbyist_ref01_match['chamber'] = setup.idmap['chamber01'];
        const lobbyist_ref01_list = (await lobbyist_ref01_ent.list(lobbyist_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lobbyist/LobbyistTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DumabingoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lobbyist01', 'lobbyist02', 'lobbyist03', 'chamber01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DUMABINGO_TEST_LOBBYIST_ENTID': idmap,
        'DUMABINGO_TEST_LIVE': 'FALSE',
        'DUMABINGO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DUMABINGO_TEST_LOBBYIST_ENTID'];
    const live = 'TRUE' === env.DUMABINGO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DUMABINGO_TEST_LOBBYIST_ENTID'];
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
//# sourceMappingURL=LobbyistEntity.test.js.map