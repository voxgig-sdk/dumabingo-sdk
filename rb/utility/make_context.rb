# Dumabingo SDK utility: make_context
require_relative '../core/context'
module DumabingoUtilities
  MakeContext = ->(ctxmap, basectx) {
    DumabingoContext.new(ctxmap, basectx)
  }
end
