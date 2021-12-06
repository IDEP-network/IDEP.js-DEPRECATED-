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

var idep_oracle_oracle_pb = require('../../idep/oracle/oracle_pb.js');

var idep_service_service_pb = require('../../idep/service/service_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');
const proto = {};
proto.idep = {};
proto.idep.oracle = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.oracle.QueryClient = function(hostname, credentials, options) {
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
proto.idep.oracle.QueryPromiseClient = function(
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
 *   !proto.idep.oracle.QueryFeedRequest,
 *   !proto.idep.oracle.QueryFeedResponse>}
 */
const methodDescriptor_Query_Feed = new grpc.web.MethodDescriptor(
  '/idep.oracle.Query/Feed',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.QueryFeedRequest,
  proto.idep.oracle.QueryFeedResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.QueryFeedRequest,
 *   !proto.idep.oracle.QueryFeedResponse>}
 */
const methodInfo_Query_Feed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.QueryFeedResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.QueryFeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.QueryFeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.QueryFeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.QueryClient.prototype.feed = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Query/Feed',
    request,
    metadata || {},
    methodDescriptor_Query_Feed,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.QueryFeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.QueryFeedResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.QueryPromiseClient.prototype.feed = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Query/Feed',
    request,
    metadata || {},
    methodDescriptor_Query_Feed
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.oracle.QueryFeedsRequest,
 *   !proto.idep.oracle.QueryFeedsResponse>}
 */
const methodDescriptor_Query_Feeds = new grpc.web.MethodDescriptor(
  '/idep.oracle.Query/Feeds',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.QueryFeedsRequest,
  proto.idep.oracle.QueryFeedsResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.QueryFeedsRequest,
 *   !proto.idep.oracle.QueryFeedsResponse>}
 */
const methodInfo_Query_Feeds = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.QueryFeedsResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.QueryFeedsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.QueryFeedsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.QueryFeedsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.QueryClient.prototype.feeds = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Query/Feeds',
    request,
    metadata || {},
    methodDescriptor_Query_Feeds,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.QueryFeedsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.QueryFeedsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.QueryPromiseClient.prototype.feeds = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Query/Feeds',
    request,
    metadata || {},
    methodDescriptor_Query_Feeds
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.oracle.QueryFeedValueRequest,
 *   !proto.idep.oracle.QueryFeedValueResponse>}
 */
const methodDescriptor_Query_FeedValue = new grpc.web.MethodDescriptor(
  '/idep.oracle.Query/FeedValue',
  grpc.web.MethodType.UNARY,
  proto.idep.oracle.QueryFeedValueRequest,
  proto.idep.oracle.QueryFeedValueResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedValueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedValueResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.oracle.QueryFeedValueRequest,
 *   !proto.idep.oracle.QueryFeedValueResponse>}
 */
const methodInfo_Query_FeedValue = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.oracle.QueryFeedValueResponse,
  /**
   * @param {!proto.idep.oracle.QueryFeedValueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.oracle.QueryFeedValueResponse.deserializeBinary
);

/**
 * @param {!proto.idep.oracle.QueryFeedValueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.oracle.QueryFeedValueResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.oracle.QueryFeedValueResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.oracle.QueryClient.prototype.feedValue = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.oracle.Query/FeedValue',
    request,
    metadata || {},
    methodDescriptor_Query_FeedValue,
    callback
  );
};

/**
 * @param {!proto.idep.oracle.QueryFeedValueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.oracle.QueryFeedValueResponse>}
 *     Promise that resolves to the response
 */
proto.idep.oracle.QueryPromiseClient.prototype.feedValue = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.oracle.Query/FeedValue',
    request,
    metadata || {},
    methodDescriptor_Query_FeedValue
  );
};

module.exports = proto.idep.oracle;
