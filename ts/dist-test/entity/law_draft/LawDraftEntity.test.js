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
(0, node_test_1.describe)('LawDraftEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DUMABINGO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DUMABINGO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DumabingoSDK.test();
        const ent = testsdk.LawDraft();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DumabingoSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LawDraft().load({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DUMABINGO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'law_draft.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analyst_filled": { "a": true, "h": "Analyst Filled", "n": "analyst_filled", "r": false, "t": "`$BOOLEAN`", "key$": "analyst_filled", "index$": 0 }, "approved": { "a": true, "h": "Approved", "n": "approved", "r": false, "t": "`$BOOLEAN`", "key$": "approved", "index$": 1 }, "committees": { "a": true, "h": "Committees", "n": "committees", "r": false, "sh": "Committee ids.", "t": "`$ARRAY`", "key$": "committees", "index$": 2 }, "core": { "a": true, "h": "Core", "n": "core", "r": false, "t": "`$STRING`", "key$": "core", "index$": 3 }, "created_by": { "a": true, "h": "Created By", "n": "created_by", "r": false, "t": "`$INTEGER`", "key$": "created_by", "index$": 4 }, "created_when": { "a": true, "h": "Created When", "n": "created_when", "r": false, "t": "`$STRING`", "key$": "created_when", "index$": 5 }, "departments": { "a": true, "h": "Departments", "n": "departments", "r": false, "sh": "Empty in every probe; item type unverified (probably integer ids).", "t": "`$ARRAY`", "key$": "departments", "index$": 6 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Null in every probe; type unverified.", "t": "`$STRING`", "key$": "description", "index$": 7 }, "entry_date": { "a": true, "h": "Entry Date", "n": "entry_date", "r": false, "t": "`$STRING`", "key$": "entry_date", "index$": 8 }, "fact_checked": { "a": true, "h": "Fact Checked", "n": "fact_checked", "r": false, "t": "`$BOOLEAN`", "key$": "fact_checked", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 10 }, "in_watch_list": { "a": true, "h": "In Watch List", "n": "in_watch_list", "r": false, "t": "`$BOOLEAN`", "key$": "in_watch_list", "index$": 11 }, "initiator_offices": { "a": true, "h": "Initiator Offices", "n": "initiator_offices", "r": false, "sh": "Empty in every probe; item type unverified (probably integer ids).", "t": "`$ARRAY`", "key$": "initiator_offices", "index$": 12 }, "initiators": { "a": true, "h": "Initiators", "n": "initiators", "r": false, "sh": "Empty in every probe; item type unverified (probably integer ids).", "t": "`$ARRAY`", "key$": "initiators", "index$": 13 }, "is_lobbyist": { "a": true, "h": "Is Lobbyist", "n": "is_lobbyist", "r": false, "t": "`$BOOLEAN`", "key$": "is_lobbyist", "index$": 14 }, "keywords": { "a": true, "h": "Keywords", "n": "keywords", "r": false, "t": "`$ARRAY`", "key$": "keywords", "index$": 15 }, "last_update": { "a": true, "h": "Last Update", "n": "last_update", "r": false, "t": "`$STRING`", "key$": "last_update", "index$": 16 }, "law_authors": { "a": true, "h": "Law Authors", "n": "law_authors", "r": false, "sh": "Declarator person ids of the authors.", "t": "`$ARRAY`", "key$": "law_authors", "index$": 17 }, "lawyer_checked": { "a": true, "h": "Lawyer Checked", "n": "lawyer_checked", "r": false, "t": "`$BOOLEAN`", "key$": "lawyer_checked", "index$": 18 }, "link": { "a": true, "h": "Link", "n": "link", "r": true, "t": "`$STRING`", "key$": "link", "index$": 19 }, "markers": { "a": true, "h": "Markers", "n": "markers", "r": false, "sh": "Empty in every probe; item type unverified (probably integer ids).", "t": "`$ARRAY`", "key$": "markers", "index$": 20 }, "modified_by": { "a": true, "h": "Modified By", "n": "modified_by", "r": false, "t": "`$INTEGER`", "key$": "modified_by", "index$": 21 }, "modified_when": { "a": true, "h": "Modified When", "n": "modified_when", "r": false, "t": "`$STRING`", "key$": "modified_when", "index$": 22 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 23 }, "note": { "a": true, "h": "Note", "n": "note", "r": false, "t": "`$STRING`", "key$": "note", "index$": 24 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$STRING`", "key$": "number", "index$": 25 }, "old_phase": { "a": true, "h": "Old Phase", "n": "old_phase", "r": false, "sh": "Null in every probe; type unverified.", "t": "`$STRING`", "key$": "old_phase", "index$": 26 }, "parties": { "a": true, "h": "Parties", "n": "parties", "r": false, "sh": "Empty in every probe; item type unverified (probably integer ids).", "t": "`$ARRAY`", "key$": "parties", "index$": 27 }, "possible_interested_persons": { "a": true, "h": "Possible Interested Persons", "n": "possible_interested_persons", "r": false, "t": "`$STRING`", "key$": "possible_interested_persons", "index$": 28 }, "transcript_url": { "a": true, "h": "Transcript Url", "n": "transcript_url", "r": false, "t": "`$STRING`", "key$": "transcript_url", "index$": 29 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 30 } }, "id": { "field": "id", "name": "id" }, "name": "law_draft", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/law_draft_api/{id}/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 391, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/law_draft_api/{id}/", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "law_draft_api" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "law_draft", "name__orig": "law_draft", "Name": "LawDraft", "name_": "law_draft", "name-": "law-draft", "NAME": "LAW_DRAFT", "index$": 1 }, { "active": true, "entity": "law_draft", "key$": "BasicLawDraftFlow", "kind": "basic", "name": "BasicLawDraftFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "law_draft_ref01", "srcdatavar": "law_draft_ref01_data", "suffix": "_dt0" }, "m": { "id": "law_draft01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-law_draft_ref01" } }], "index$": 0, "route": "GET /api/law_draft_api/{id}/", "record": {} }] }, 'LawDraft', { "GET /api/law_draft_api/{id}/": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Declarator bill id (LawDraftRef.id).", "schema": { "type": "integer" }, "example": 391, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let law_draft_ref01_data = Object.values(setup.data.existing.law_draft)[0];
        // LOAD
        const law_draft_ref01_ent = client.LawDraft();
        const law_draft_ref01_match_dt0 = {};
        law_draft_ref01_match_dt0.id = law_draft_ref01_data.id;
        const law_draft_ref01_data_dt0 = (await law_draft_ref01_ent.load(law_draft_ref01_match_dt0)).data();
        (0, node_assert_1.default)(law_draft_ref01_data_dt0.id === law_draft_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/law_draft/LawDraftTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DumabingoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['law_draft01', 'law_draft02', 'law_draft03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DUMABINGO_TEST_LAW_DRAFT_ENTID': idmap,
        'DUMABINGO_TEST_LIVE': 'FALSE',
        'DUMABINGO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DUMABINGO_TEST_LAW_DRAFT_ENTID'];
    const live = 'TRUE' === env.DUMABINGO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DUMABINGO_TEST_LAW_DRAFT_ENTID'];
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
//# sourceMappingURL=LawDraftEntity.test.js.map