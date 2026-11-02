# Dumabingo SDK exists test

require "minitest/autorun"
require_relative "../Dumabingo_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DumabingoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
