# Dumabingo SDK utility: prepare_body
require_relative 'media'
module DumabingoUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return DumabingoUtilities.raw_body(ctx.reqdata) if DumabingoUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
