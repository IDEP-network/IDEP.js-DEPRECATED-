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

var idep_coinswap_coinswap_pb = require('../../idep/coinswap/coinswap_pb.js');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');
const proto = {};
proto.idep = {};
proto.idep.coinswap = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.coinswap.MsgClient = function(hostname, credentials, options) {
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
proto.idep.coinswap.MsgPromiseClient = function(
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
 *   !proto.idep.coinswap.MsgAddLiquidity,
 *   !proto.idep.coinswap.MsgAddLiquidityResponse>}
 */
const methodDescriptor_Msg_AddLiquidity = new grpc.web.MethodDescriptor(
  '/idep.coinswap.Msg/AddLiquidity',
  grpc.web.MethodType.UNARY,
  proto.idep.coinswap.MsgAddLiquidity,
  proto.idep.coinswap.MsgAddLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.MsgAddLiquidity} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgAddLiquidityResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.coinswap.MsgAddLiquidity,
 *   !proto.idep.coinswap.MsgAddLiquidityResponse>}
 */
const methodInfo_Msg_AddLiquidity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.coinswap.MsgAddLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.MsgAddLiquidity} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgAddLiquidityResponse.deserializeBinary
);

/**
 * @param {!proto.idep.coinswap.MsgAddLiquidity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.coinswap.MsgAddLiquidityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.coinswap.MsgAddLiquidityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.coinswap.MsgClient.prototype.addLiquidity = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.coinswap.Msg/AddLiquidity',
    request,
    metadata || {},
    methodDescriptor_Msg_AddLiquidity,
    callback
  );
};

/**
 * @param {!proto.idep.coinswap.MsgAddLiquidity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.coinswap.MsgAddLiquidityResponse>}
 *     Promise that resolves to the response
 */
proto.idep.coinswap.MsgPromiseClient.prototype.addLiquidity = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.coinswap.Msg/AddLiquidity',
    request,
    metadata || {},
    methodDescriptor_Msg_AddLiquidity
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.coinswap.MsgRemoveLiquidity,
 *   !proto.idep.coinswap.MsgRemoveLiquidityResponse>}
 */
const methodDescriptor_Msg_RemoveLiquidity = new grpc.web.MethodDescriptor(
  '/idep.coinswap.Msg/RemoveLiquidity',
  grpc.web.MethodType.UNARY,
  proto.idep.coinswap.MsgRemoveLiquidity,
  proto.idep.coinswap.MsgRemoveLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.MsgRemoveLiquidity} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgRemoveLiquidityResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.coinswap.MsgRemoveLiquidity,
 *   !proto.idep.coinswap.MsgRemoveLiquidityResponse>}
 */
const methodInfo_Msg_RemoveLiquidity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.coinswap.MsgRemoveLiquidityResponse,
  /**
   * @param {!proto.idep.coinswap.MsgRemoveLiquidity} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgRemoveLiquidityResponse.deserializeBinary
);

/**
 * @param {!proto.idep.coinswap.MsgRemoveLiquidity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.coinswap.MsgRemoveLiquidityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.coinswap.MsgRemoveLiquidityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.coinswap.MsgClient.prototype.removeLiquidity = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.coinswap.Msg/RemoveLiquidity',
    request,
    metadata || {},
    methodDescriptor_Msg_RemoveLiquidity,
    callback
  );
};

/**
 * @param {!proto.idep.coinswap.MsgRemoveLiquidity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.coinswap.MsgRemoveLiquidityResponse>}
 *     Promise that resolves to the response
 */
proto.idep.coinswap.MsgPromiseClient.prototype.removeLiquidity = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.coinswap.Msg/RemoveLiquidity',
    request,
    metadata || {},
    methodDescriptor_Msg_RemoveLiquidity
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.coinswap.MsgSwapOrder,
 *   !proto.idep.coinswap.MsgSwapCoinResponse>}
 */
const methodDescriptor_Msg_SwapCoin = new grpc.web.MethodDescriptor(
  '/idep.coinswap.Msg/SwapCoin',
  grpc.web.MethodType.UNARY,
  proto.idep.coinswap.MsgSwapOrder,
  proto.idep.coinswap.MsgSwapCoinResponse,
  /**
   * @param {!proto.idep.coinswap.MsgSwapOrder} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgSwapCoinResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.coinswap.MsgSwapOrder,
 *   !proto.idep.coinswap.MsgSwapCoinResponse>}
 */
const methodInfo_Msg_SwapCoin = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.coinswap.MsgSwapCoinResponse,
  /**
   * @param {!proto.idep.coinswap.MsgSwapOrder} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.coinswap.MsgSwapCoinResponse.deserializeBinary
);

/**
 * @param {!proto.idep.coinswap.MsgSwapOrder} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.coinswap.MsgSwapCoinResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.coinswap.MsgSwapCoinResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.coinswap.MsgClient.prototype.swapCoin = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.coinswap.Msg/SwapCoin',
    request,
    metadata || {},
    methodDescriptor_Msg_SwapCoin,
    callback
  );
};

/**
 * @param {!proto.idep.coinswap.MsgSwapOrder} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.coinswap.MsgSwapCoinResponse>}
 *     Promise that resolves to the response
 */
proto.idep.coinswap.MsgPromiseClient.prototype.swapCoin = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.coinswap.Msg/SwapCoin',
    request,
    metadata || {},
    methodDescriptor_Msg_SwapCoin
  );
};

module.exports = proto.idep.coinswap;
