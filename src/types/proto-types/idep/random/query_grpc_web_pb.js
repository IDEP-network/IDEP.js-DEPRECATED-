/**
 * @fileoverview gRPC-Web generated client stub for idep.random
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var idep_random_random_pb = require('../../idep/random/random_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');
const proto = {};
proto.idep = {};
proto.idep.random = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.random.QueryClient = function(hostname, credentials, options) {
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
proto.idep.random.QueryPromiseClient = function(
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
 *   !proto.idep.random.QueryRandomRequest,
 *   !proto.idep.random.QueryRandomResponse>}
 */
const methodDescriptor_Query_Random = new grpc.web.MethodDescriptor(
  '/idep.random.Query/Random',
  grpc.web.MethodType.UNARY,
  proto.idep.random.QueryRandomRequest,
  proto.idep.random.QueryRandomResponse,
  /**
   * @param {!proto.idep.random.QueryRandomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.random.QueryRandomResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.random.QueryRandomRequest,
 *   !proto.idep.random.QueryRandomResponse>}
 */
const methodInfo_Query_Random = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.random.QueryRandomResponse,
  /**
   * @param {!proto.idep.random.QueryRandomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.random.QueryRandomResponse.deserializeBinary
);

/**
 * @param {!proto.idep.random.QueryRandomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.random.QueryRandomResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.random.QueryRandomResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.random.QueryClient.prototype.random = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.random.Query/Random',
    request,
    metadata || {},
    methodDescriptor_Query_Random,
    callback
  );
};

/**
 * @param {!proto.idep.random.QueryRandomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.random.QueryRandomResponse>}
 *     Promise that resolves to the response
 */
proto.idep.random.QueryPromiseClient.prototype.random = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.random.Query/Random',
    request,
    metadata || {},
    methodDescriptor_Query_Random
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.random.QueryRandomRequestQueueRequest,
 *   !proto.idep.random.QueryRandomRequestQueueResponse>}
 */
const methodDescriptor_Query_RandomRequestQueue = new grpc.web.MethodDescriptor(
  '/idep.random.Query/RandomRequestQueue',
  grpc.web.MethodType.UNARY,
  proto.idep.random.QueryRandomRequestQueueRequest,
  proto.idep.random.QueryRandomRequestQueueResponse,
  /**
   * @param {!proto.idep.random.QueryRandomRequestQueueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.random.QueryRandomRequestQueueResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.random.QueryRandomRequestQueueRequest,
 *   !proto.idep.random.QueryRandomRequestQueueResponse>}
 */
const methodInfo_Query_RandomRequestQueue = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.random.QueryRandomRequestQueueResponse,
  /**
   * @param {!proto.idep.random.QueryRandomRequestQueueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.random.QueryRandomRequestQueueResponse.deserializeBinary
);

/**
 * @param {!proto.idep.random.QueryRandomRequestQueueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.random.QueryRandomRequestQueueResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.random.QueryRandomRequestQueueResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.random.QueryClient.prototype.randomRequestQueue = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.random.Query/RandomRequestQueue',
    request,
    metadata || {},
    methodDescriptor_Query_RandomRequestQueue,
    callback
  );
};

/**
 * @param {!proto.idep.random.QueryRandomRequestQueueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.random.QueryRandomRequestQueueResponse>}
 *     Promise that resolves to the response
 */
proto.idep.random.QueryPromiseClient.prototype.randomRequestQueue = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.random.Query/RandomRequestQueue',
    request,
    metadata || {},
    methodDescriptor_Query_RandomRequestQueue
  );
};

module.exports = proto.idep.random;
