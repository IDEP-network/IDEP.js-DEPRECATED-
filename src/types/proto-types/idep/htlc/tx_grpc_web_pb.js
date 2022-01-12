/**
 * @fileoverview gRPC-Web generated client stub for idep.htlc
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
const proto = {};
proto.idep = {};
proto.idep.htlc = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.htlc.MsgClient = function(hostname, credentials, options) {
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
proto.idep.htlc.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.htlc.MsgCreateHTLC,
 *   !proto.idep.htlc.MsgCreateHTLCResponse>}
 */
const methodDescriptor_Msg_CreateHTLC = new grpc.web.MethodDescriptor(
  '/idep.htlc.Msg/CreateHTLC',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.MsgCreateHTLC,
  proto.idep.htlc.MsgCreateHTLCResponse,
  /**
   * @param {!proto.idep.htlc.MsgCreateHTLC} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.MsgCreateHTLCResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.MsgCreateHTLC,
 *   !proto.idep.htlc.MsgCreateHTLCResponse>}
 */
const methodInfo_Msg_CreateHTLC = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.MsgCreateHTLCResponse,
  /**
   * @param {!proto.idep.htlc.MsgCreateHTLC} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.MsgCreateHTLCResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.MsgCreateHTLC} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.MsgCreateHTLCResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.MsgCreateHTLCResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.MsgClient.prototype.createHTLC = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Msg/CreateHTLC',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateHTLC,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.MsgCreateHTLC} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.MsgCreateHTLCResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.MsgPromiseClient.prototype.createHTLC = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Msg/CreateHTLC',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateHTLC
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.htlc.MsgClaimHTLC,
 *   !proto.idep.htlc.MsgClaimHTLCResponse>}
 */
const methodDescriptor_Msg_ClaimHTLC = new grpc.web.MethodDescriptor(
  '/idep.htlc.Msg/ClaimHTLC',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.MsgClaimHTLC,
  proto.idep.htlc.MsgClaimHTLCResponse,
  /**
   * @param {!proto.idep.htlc.MsgClaimHTLC} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.MsgClaimHTLCResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.MsgClaimHTLC,
 *   !proto.idep.htlc.MsgClaimHTLCResponse>}
 */
const methodInfo_Msg_ClaimHTLC = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.MsgClaimHTLCResponse,
  /**
   * @param {!proto.idep.htlc.MsgClaimHTLC} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.MsgClaimHTLCResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.MsgClaimHTLC} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.MsgClaimHTLCResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.MsgClaimHTLCResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.MsgClient.prototype.claimHTLC = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Msg/ClaimHTLC',
    request,
    metadata || {},
    methodDescriptor_Msg_ClaimHTLC,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.MsgClaimHTLC} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.MsgClaimHTLCResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.MsgPromiseClient.prototype.claimHTLC = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Msg/ClaimHTLC',
    request,
    metadata || {},
    methodDescriptor_Msg_ClaimHTLC
  );
};

module.exports = proto.idep.htlc;
