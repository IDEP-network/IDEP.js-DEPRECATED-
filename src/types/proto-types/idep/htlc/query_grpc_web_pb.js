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

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var idep_htlc_htlc_pb = require('../../idep/htlc/htlc_pb.js');
const proto = {};
proto.idep = {};
proto.idep.htlc = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.htlc.QueryClient = function(hostname, credentials, options) {
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
proto.idep.htlc.QueryPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.htlc.QueryHTLCRequest,
 *   !proto.idep.htlc.QueryHTLCResponse>}
 */
const methodDescriptor_Query_HTLC = new grpc.web.MethodDescriptor(
  '/idep.htlc.Query/HTLC',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.QueryHTLCRequest,
  proto.idep.htlc.QueryHTLCResponse,
  /**
   * @param {!proto.idep.htlc.QueryHTLCRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryHTLCResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.QueryHTLCRequest,
 *   !proto.idep.htlc.QueryHTLCResponse>}
 */
const methodInfo_Query_HTLC = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.QueryHTLCResponse,
  /**
   * @param {!proto.idep.htlc.QueryHTLCRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryHTLCResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.QueryHTLCRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.QueryHTLCResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.QueryHTLCResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.QueryClient.prototype.hTLC = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Query/HTLC',
    request,
    metadata || {},
    methodDescriptor_Query_HTLC,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.QueryHTLCRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.QueryHTLCResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.QueryPromiseClient.prototype.hTLC = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Query/HTLC',
    request,
    metadata || {},
    methodDescriptor_Query_HTLC
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.htlc.QueryAssetSupplyRequest,
 *   !proto.idep.htlc.QueryAssetSupplyResponse>}
 */
const methodDescriptor_Query_AssetSupply = new grpc.web.MethodDescriptor(
  '/idep.htlc.Query/AssetSupply',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.QueryAssetSupplyRequest,
  proto.idep.htlc.QueryAssetSupplyResponse,
  /**
   * @param {!proto.idep.htlc.QueryAssetSupplyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryAssetSupplyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.QueryAssetSupplyRequest,
 *   !proto.idep.htlc.QueryAssetSupplyResponse>}
 */
const methodInfo_Query_AssetSupply = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.QueryAssetSupplyResponse,
  /**
   * @param {!proto.idep.htlc.QueryAssetSupplyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryAssetSupplyResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.QueryAssetSupplyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.QueryAssetSupplyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.QueryAssetSupplyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.QueryClient.prototype.assetSupply = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Query/AssetSupply',
    request,
    metadata || {},
    methodDescriptor_Query_AssetSupply,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.QueryAssetSupplyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.QueryAssetSupplyResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.QueryPromiseClient.prototype.assetSupply = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Query/AssetSupply',
    request,
    metadata || {},
    methodDescriptor_Query_AssetSupply
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.htlc.QueryAssetSuppliesRequest,
 *   !proto.idep.htlc.QueryAssetSuppliesResponse>}
 */
const methodDescriptor_Query_AssetSupplies = new grpc.web.MethodDescriptor(
  '/idep.htlc.Query/AssetSupplies',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.QueryAssetSuppliesRequest,
  proto.idep.htlc.QueryAssetSuppliesResponse,
  /**
   * @param {!proto.idep.htlc.QueryAssetSuppliesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryAssetSuppliesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.QueryAssetSuppliesRequest,
 *   !proto.idep.htlc.QueryAssetSuppliesResponse>}
 */
const methodInfo_Query_AssetSupplies = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.QueryAssetSuppliesResponse,
  /**
   * @param {!proto.idep.htlc.QueryAssetSuppliesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryAssetSuppliesResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.QueryAssetSuppliesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.QueryAssetSuppliesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.QueryAssetSuppliesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.QueryClient.prototype.assetSupplies = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Query/AssetSupplies',
    request,
    metadata || {},
    methodDescriptor_Query_AssetSupplies,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.QueryAssetSuppliesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.QueryAssetSuppliesResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.QueryPromiseClient.prototype.assetSupplies = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Query/AssetSupplies',
    request,
    metadata || {},
    methodDescriptor_Query_AssetSupplies
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.htlc.QueryParamsRequest,
 *   !proto.idep.htlc.QueryParamsResponse>}
 */
const methodDescriptor_Query_Params = new grpc.web.MethodDescriptor(
  '/idep.htlc.Query/Params',
  grpc.web.MethodType.UNARY,
  proto.idep.htlc.QueryParamsRequest,
  proto.idep.htlc.QueryParamsResponse,
  /**
   * @param {!proto.idep.htlc.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryParamsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.htlc.QueryParamsRequest,
 *   !proto.idep.htlc.QueryParamsResponse>}
 */
const methodInfo_Query_Params = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.htlc.QueryParamsResponse,
  /**
   * @param {!proto.idep.htlc.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.htlc.QueryParamsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.htlc.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.htlc.QueryParamsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.htlc.QueryParamsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.htlc.QueryClient.prototype.params = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.htlc.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params,
    callback
  );
};

/**
 * @param {!proto.idep.htlc.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.htlc.QueryParamsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.htlc.QueryPromiseClient.prototype.params = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.htlc.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params
  );
};

module.exports = proto.idep.htlc;
