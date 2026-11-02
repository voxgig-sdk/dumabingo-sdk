# Dumabingo SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DumabingoUtility.registrar = ->(u) {
  u.clean = DumabingoUtilities::Clean
  u.clean_add = DumabingoUtilities::CleanAdd
  u.clean_explain = DumabingoUtilities::CleanExplain
  u.done = DumabingoUtilities::Done
  u.make_error = DumabingoUtilities::MakeError
  u.feature_add = DumabingoUtilities::FeatureAdd
  u.feature_hook = DumabingoUtilities::FeatureHook
  u.feature_init = DumabingoUtilities::FeatureInit
  u.fetcher = DumabingoUtilities::Fetcher
  u.make_fetch_def = DumabingoUtilities::MakeFetchDef
  u.make_context = DumabingoUtilities::MakeContext
  u.make_options = DumabingoUtilities::MakeOptions
  u.make_request = DumabingoUtilities::MakeRequest
  u.make_response = DumabingoUtilities::MakeResponse
  u.make_result = DumabingoUtilities::MakeResult
  u.make_point = DumabingoUtilities::MakePoint
  u.make_spec = DumabingoUtilities::MakeSpec
  u.make_url = DumabingoUtilities::MakeUrl
  u.param = DumabingoUtilities::Param
  u.prepare_auth = DumabingoUtilities::PrepareAuth
  u.prepare_body = DumabingoUtilities::PrepareBody
  u.prepare_headers = DumabingoUtilities::PrepareHeaders
  u.prepare_method = DumabingoUtilities::PrepareMethod
  u.prepare_params = DumabingoUtilities::PrepareParams
  u.prepare_path = DumabingoUtilities::PreparePath
  u.prepare_query = DumabingoUtilities::PrepareQuery
  u.graphql_body = DumabingoUtilities::GraphqlBody
  u.graphql_errors = DumabingoUtilities::GraphqlErrors
  u.result_basic = DumabingoUtilities::ResultBasic
  u.result_body = DumabingoUtilities::ResultBody
  u.result_headers = DumabingoUtilities::ResultHeaders
  u.transform_request = DumabingoUtilities::TransformRequest
  u.transform_response = DumabingoUtilities::TransformResponse
}
