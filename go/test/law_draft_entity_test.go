package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dumabingo-sdk/go"
	"github.com/voxgig-sdk/dumabingo-sdk/go/core"

	vs "github.com/voxgig-sdk/dumabingo-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const law_draftEntityLiveStrict = true


func TestLawDraftEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LawDraft(nil)
		if ent == nil {
			t.Fatal("expected non-nil LawDraftEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LawDraft(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.DumabingoError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := law_draftBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "law_draft." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"law_draft01": float64(391)} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, law_draftEntityLiveStrict, setup.data, "law_draft", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["law_draft01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		lawDraftRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.law_draft")))
		var lawDraftRef01Data map[string]any
		if len(lawDraftRef01DataRaw) > 0 {
			lawDraftRef01Data = core.ToMapAny(lawDraftRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = lawDraftRef01Data

		// LOAD
		lawDraftRef01Ent := client.LawDraft(nil)
		lawDraftRef01MatchDt0 := map[string]any{
			"id": lawDraftRef01Data["id"],
		}
		lawDraftRef01DataDt0Loaded, err := lawDraftRef01Ent.Load(lawDraftRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		lawDraftRef01DataDt0LoadResult := core.ToMapAny(entityData(lawDraftRef01DataDt0Loaded))
		if lawDraftRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if lawDraftRef01DataDt0LoadResult["id"] != lawDraftRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func law_draftBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "law_draft", "LawDraftTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read law_draft test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse law_draft test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"law_draft01", "law_draft02", "law_draft03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("DUMABINGO_TEST_LAW_DRAFT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DUMABINGO_TEST_LAW_DRAFT_ENTID": idmap,
		"DUMABINGO_TEST_LIVE":      "FALSE",
		"DUMABINGO_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["DUMABINGO_TEST_LAW_DRAFT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DUMABINGO_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewDumabingoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DUMABINGO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DUMABINGO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
