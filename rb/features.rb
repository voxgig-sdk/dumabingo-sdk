# Dumabingo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DumabingoFeatures
  def self.make_feature(name)
    case name
    when "base"
      DumabingoBaseFeature.new
    when "ratelimit"
      DumabingoRatelimitFeature.new
    when "retry"
      DumabingoRetryFeature.new
    when "test"
      DumabingoTestFeature.new
    when "timeout"
      DumabingoTimeoutFeature.new
    else
      DumabingoBaseFeature.new
    end
  end
end
