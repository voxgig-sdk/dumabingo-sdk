-- Dumabingo SDK exists test

local sdk = require("dumabingo_sdk")

describe("DumabingoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
