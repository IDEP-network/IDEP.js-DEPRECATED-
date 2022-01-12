/**
 * @fileoverview gRPC-Web generated client stub for idep.token
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');

var cosmos_proto_cosmos_pb = require('../../cosmos_proto/cosmos_pb.js');

var cosmos_base_query_v1beta1_pagination_pb = require('../../cosmos/base/query/v1beta1/pagination_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

var idep_token_token_pb = require('../../idep/token/token_pb.js');
const proto = {};
proto.idep = {};
proto.idep.token = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.token.QueryClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.token.QueryPromiseClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.QueryTokenRequest,
 *   !proto.idep.token.QueryTokenResponse>}
 */
const methodDescriptor_Query_Token = new grpc.web.MethodDescriptor(
  '/idep.token.Query/Token',
  grpc.web.MethodType.UNARY,
  proto.idep.token.QueryTokenRequest,
  proto.idep.token.QueryTokenResponse,
  /**
   * @param {!proto.idep.token.QueryTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryTokenResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.QueryTokenRequest,
 *   !proto.idep.token.QueryTokenResponse>}
 */
const methodInfo_Query_Token = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.QueryTokenResponse,
  /**
   * @param {!proto.idep.token.QueryTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryTokenResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.QueryTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.QueryTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.QueryTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.QueryClient.prototype.token = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Query/Token',
    request,
    metadata || {},
    methodDescriptor_Query_Token,
    callback
  );
};

/**
 * @param {!proto.idep.token.QueryTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.QueryTokenResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.QueryPromiseClient.prototype.token = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Query/Token',
    request,
    metadata || {},
    methodDescriptor_Query_Token
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.QueryTokensRequest,
 *   !proto.idep.token.QueryTokensResponse>}
 */
const methodDescriptor_Query_Tokens = new grpc.web.MethodDescriptor(
  '/idep.token.Query/Tokens',
  grpc.web.MethodType.UNARY,
  proto.idep.token.QueryTokensRequest,
  proto.idep.token.QueryTokensResponse,
  /**
   * @param {!proto.idep.token.QueryTokensRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryTokensResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.QueryTokensRequest,
 *   !proto.idep.token.QueryTokensResponse>}
 */
const methodInfo_Query_Tokens = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.QueryTokensResponse,
  /**
   * @param {!proto.idep.token.QueryTokensRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryTokensResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.QueryTokensRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.QueryTokensResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.QueryTokensResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.QueryClient.prototype.tokens = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Query/Tokens',
    request,
    metadata || {},
    methodDescriptor_Query_Tokens,
    callback
  );
};

/**
 * @param {!proto.idep.token.QueryTokensRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.QueryTokensResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.QueryPromiseClient.prototype.tokens = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Query/Tokens',
    request,
    metadata || {},
    methodDescriptor_Query_Tokens
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.QueryFeesRequest,
 *   !proto.idep.token.QueryFeesResponse>}
 */
const methodDescriptor_Query_Fees = new grpc.web.MethodDescriptor(
  '/idep.token.Query/Fees',
  grpc.web.MethodType.UNARY,
  proto.idep.token.QueryFeesRequest,
  proto.idep.token.QueryFeesResponse,
  /**
   * @param {!proto.idep.token.QueryFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryFeesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.QueryFeesRequest,
 *   !proto.idep.token.QueryFeesResponse>}
 */
const methodInfo_Query_Fees = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.QueryFeesResponse,
  /**
   * @param {!proto.idep.token.QueryFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryFeesResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.QueryFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.QueryFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.QueryFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.QueryClient.prototype.fees = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Query/Fees',
    request,
    metadata || {},
    methodDescriptor_Query_Fees,
    callback
  );
};

/**
 * @param {!proto.idep.token.QueryFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.QueryFeesResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.QueryPromiseClient.prototype.fees = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Query/Fees',
    request,
    metadata || {},
    methodDescriptor_Query_Fees
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.QueryParamsRequest,
 *   !proto.idep.token.QueryParamsResponse>}
 */
const methodDescriptor_Query_Params = new grpc.web.MethodDescriptor(
  '/idep.token.Query/Params',
  grpc.web.MethodType.UNARY,
  proto.idep.token.QueryParamsRequest,
  proto.idep.token.QueryParamsResponse,
  /**
   * @param {!proto.idep.token.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryParamsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.QueryParamsRequest,
 *   !proto.idep.token.QueryParamsResponse>}
 */
const methodInfo_Query_Params = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.QueryParamsResponse,
  /**
   * @param {!proto.idep.token.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.QueryParamsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.QueryParamsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.QueryParamsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.QueryClient.prototype.params = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params,
    callback
  );
};

/**
 * @param {!proto.idep.token.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.QueryParamsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.QueryPromiseClient.prototype.params = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params
  );
};

module.exports = proto.idep.token;
