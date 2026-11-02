# Lobbyist entity test

require "minitest/autorun"
require "json"
require_relative "../Dumabingo_sdk"
require_relative "runner"

class LobbyistEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = DumabingoSDK.test(nil, nil)
    ent = testsdk.Lobbyist(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = DumabingoConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = DumabingoSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Lobbyist(nil).list({ "chamber" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = lobbyist_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "lobbyist." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "chamber01" => "sf" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    lobbyist_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.lobbyist")))
    lobbyist_ref01_data = nil
    if lobbyist_ref01_data_raw.length > 0
      lobbyist_ref01_data = Helpers.to_map(lobbyist_ref01_data_raw[0][1])
    end

    # LIST
    lobbyist_ref01_ent = client.Lobbyist(nil)
    lobbyist_ref01_match = {
      "chamber" => setup[:idmap]["chamber01"],
    }

    lobbyist_ref01_list_result = lobbyist_ref01_ent.list(lobbyist_ref01_match, nil)
    assert lobbyist_ref01_list_result.is_a?(Array)

  end
end

def lobbyist_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "lobbyist", "LobbyistTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = DumabingoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["lobbyist01", "lobbyist02", "lobbyist03", "chamber01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["DUMABINGO_TEST_LOBBYIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "DUMABINGO_TEST_LOBBYIST_ENTID" => idmap,
    "DUMABINGO_TEST_LIVE" => "FALSE",
    "DUMABINGO_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["DUMABINGO_TEST_LOBBYIST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["DUMABINGO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = DumabingoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["DUMABINGO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["DUMABINGO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
