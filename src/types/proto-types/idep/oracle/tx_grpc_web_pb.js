/**
 * @fileoverview gRPC-Web generated client stub for idep.oracle
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');
const proto = {};
proto.idep = {};
proto.idep.oracle = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.oracle.MsgClient = function(hostname, credentials, options) {
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
proto.idep.oracle.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.oracle.MsgCreateFeed,
 *   !proto.idep.oracle.MsgCreateFeedResponse>}
 */
const methodDescriptor_Msg_CreateFeed = new grpc.web.MethodDescriptor(
  '/idep.oracle.Msg/CreateFeed',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.MsgCreateFeed,
  proto.idep.oracle.MsgCreateFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgCreateFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgCreateFeedResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.MsgCreateFeed,
 *   !proto.idep.oracle.MsgCreateFeedResponse>}
 */
const methodInfo_Msg_CreateFeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.MsgCreateFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgCreateFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgCreateFeedResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.MsgCreateFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.MsgCreateFeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.MsgCreateFeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.MsgClient.prototype.createFeed = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Msg/CreateFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateFeed,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.MsgCreateFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.MsgCreateFeedResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.MsgPromiseClient.prototype.createFeed = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Msg/CreateFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateFeed
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.oracle.MsgEditFeed,
 *   !proto.idep.oracle.MsgEditFeedResponse>}
 */
const methodDescriptor_Msg_EditFeed = new grpc.web.MethodDescriptor(
  '/idep.oracle.Msg/EditFeed',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.MsgEditFeed,
  proto.idep.oracle.MsgEditFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgEditFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgEditFeedResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.MsgEditFeed,
 *   !proto.idep.oracle.MsgEditFeedResponse>}
 */
const methodInfo_Msg_EditFeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.MsgEditFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgEditFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgEditFeedResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.MsgEditFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.MsgEditFeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.MsgEditFeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.MsgClient.prototype.editFeed = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Msg/EditFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_EditFeed,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.MsgEditFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.MsgEditFeedResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.MsgPromiseClient.prototype.editFeed = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Msg/EditFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_EditFeed
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.oracle.MsgStartFeed,
 *   !proto.idep.oracle.MsgStartFeedResponse>}
 */
const methodDescriptor_Msg_StartFeed = new grpc.web.MethodDescriptor(
  '/idep.oracle.Msg/StartFeed',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.MsgStartFeed,
  proto.idep.oracle.MsgStartFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgStartFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgStartFeedResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.MsgStartFeed,
 *   !proto.idep.oracle.MsgStartFeedResponse>}
 */
const methodInfo_Msg_StartFeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.MsgStartFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgStartFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgStartFeedResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.MsgStartFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.MsgStartFeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.MsgStartFeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.MsgClient.prototype.startFeed = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Msg/StartFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_StartFeed,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.MsgStartFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.MsgStartFeedResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.MsgPromiseClient.prototype.startFeed = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Msg/StartFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_StartFeed
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.oracle.MsgPauseFeed,
 *   !proto.idep.oracle.MsgPauseFeedResponse>}
 */
const methodDescriptor_Msg_PauseFeed = new grpc.web.MethodDescriptor(
  '/idep.oracle.Msg/PauseFeed',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.MsgPauseFeed,
  proto.idep.oracle.MsgPauseFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgPauseFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgPauseFeedResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.MsgPauseFeed,
 *   !proto.idep.oracle.MsgPauseFeedResponse>}
 */
const methodInfo_Msg_PauseFeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.MsgPauseFeedResponse,
  /**
   * @param {!proto.idep.oracle.MsgPauseFeed} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.MsgPauseFeedResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.MsgPauseFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.MsgPauseFeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.MsgPauseFeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.MsgClient.prototype.pauseFeed = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Msg/PauseFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_PauseFeed,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.MsgPauseFeed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.MsgPauseFeedResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.MsgPromiseClient.prototype.pauseFeed = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Msg/PauseFeed',
    request,
    metadata || {},
    methodDescriptor_Msg_PauseFeed
  );
};

module.exports = proto.idep.oracle;
