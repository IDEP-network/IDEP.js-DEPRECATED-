/**
 * @fileoverview gRPC-Web generated client stub for idep.coinswap
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');
const proto = {};
proto.idep = {};
proto.idep.coinswap = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.coinswap.QueryClient = function(hostname, credentials, options) {
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
proto.idep.coinswap.QueryPromiseClient = function(
  hostname,
  credentials,
  options
) {
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
 *   !proto.idep.coinswap.QueryLiquidityRequest,
 *   !proto.idep.coinswap.QueryLiquidityResponse>}
 */
const methodDescriptor_Query_Liquidity = new grpc.web.MethodDescriptor(
  '/idep.coinswap.Query/Liquidity',
  grpc.web.MethodType.UNARY,
  proto.idep.coinswap.QueryLiquidityRequest,
  proto.idep.coinswap.QueryLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.QueryLiquidityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.QueryLiquidityResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.coinswap.QueryLiquidityRequest,
 *   !proto.idep.coinswap.QueryLiquidityResponse>}
 */
const methodInfo_Query_Liquidity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.coinswap.QueryLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.QueryLiquidityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.QueryLiquidityResponse.deserializeBinary
);

/**
 * @param {!proto.idep.coinswap.QueryLiquidityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.coinswap.QueryLiquidityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.coinswap.QueryLiquidityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.coinswap.QueryClient.prototype.liquidity = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.coinswap.Query/Liquidity',
    request,
    metadata || {},
    methodDescriptor_Query_Liquidity,
    callback
  );
};

/**
 * @param {!proto.idep.coinswap.QueryLiquidityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.coinswap.QueryLiquidityResponse>}
 *     Promise that resolves to the response
 */
proto.idep.coinswap.QueryPromiseClient.prototype.liquidity = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.coinswap.Query/Liquidity',
    request,
    metadata || {},
    methodDescriptor_Query_Liquidity
  );
};

module.exports = proto.idep.coinswap;
