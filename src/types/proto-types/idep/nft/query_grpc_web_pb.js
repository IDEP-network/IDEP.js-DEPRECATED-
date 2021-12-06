/**
 * @fileoverview gRPC-Web generated client stub for idep.nft
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');

var idep_nft_nft_pb = require('../../idep/nft/nft_pb.js');
const proto = {};
proto.idep = {};
proto.idep.nft = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.nft.QueryClient = function(hostname, credentials, options) {
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
proto.idep.nft.QueryPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.nft.QuerySupplyRequest,
 *   !proto.idep.nft.QuerySupplyResponse>}
 */
const methodDescriptor_Query_Supply = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/Supply',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QuerySupplyRequest,
  proto.idep.nft.QuerySupplyResponse,
  /**
   * @param {!proto.idep.nft.QuerySupplyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QuerySupplyResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QuerySupplyRequest,
 *   !proto.idep.nft.QuerySupplyResponse>}
 */
const methodInfo_Query_Supply = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QuerySupplyResponse,
  /**
   * @param {!proto.idep.nft.QuerySupplyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QuerySupplyResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QuerySupplyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QuerySupplyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QuerySupplyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.supply = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/Supply',
    request,
    metadata || {},
    methodDescriptor_Query_Supply,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QuerySupplyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QuerySupplyResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.supply = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/Supply',
    request,
    metadata || {},
    methodDescriptor_Query_Supply
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.QueryOwnerRequest,
 *   !proto.idep.nft.QueryOwnerResponse>}
 */
const methodDescriptor_Query_Owner = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/Owner',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QueryOwnerRequest,
  proto.idep.nft.QueryOwnerResponse,
  /**
   * @param {!proto.idep.nft.QueryOwnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryOwnerResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QueryOwnerRequest,
 *   !proto.idep.nft.QueryOwnerResponse>}
 */
const methodInfo_Query_Owner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QueryOwnerResponse,
  /**
   * @param {!proto.idep.nft.QueryOwnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryOwnerResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QueryOwnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QueryOwnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QueryOwnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.owner = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/Owner',
    request,
    metadata || {},
    methodDescriptor_Query_Owner,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QueryOwnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QueryOwnerResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.owner = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/Owner',
    request,
    metadata || {},
    methodDescriptor_Query_Owner
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.QueryCollectionRequest,
 *   !proto.idep.nft.QueryCollectionResponse>}
 */
const methodDescriptor_Query_Collection = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/Collection',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QueryCollectionRequest,
  proto.idep.nft.QueryCollectionResponse,
  /**
   * @param {!proto.idep.nft.QueryCollectionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryCollectionResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QueryCollectionRequest,
 *   !proto.idep.nft.QueryCollectionResponse>}
 */
const methodInfo_Query_Collection = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QueryCollectionResponse,
  /**
   * @param {!proto.idep.nft.QueryCollectionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryCollectionResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QueryCollectionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QueryCollectionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QueryCollectionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.collection = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/Collection',
    request,
    metadata || {},
    methodDescriptor_Query_Collection,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QueryCollectionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QueryCollectionResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.collection = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/Collection',
    request,
    metadata || {},
    methodDescriptor_Query_Collection
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.QueryDenomRequest,
 *   !proto.idep.nft.QueryDenomResponse>}
 */
const methodDescriptor_Query_Denom = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/Denom',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QueryDenomRequest,
  proto.idep.nft.QueryDenomResponse,
  /**
   * @param {!proto.idep.nft.QueryDenomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryDenomResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QueryDenomRequest,
 *   !proto.idep.nft.QueryDenomResponse>}
 */
const methodInfo_Query_Denom = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QueryDenomResponse,
  /**
   * @param {!proto.idep.nft.QueryDenomRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryDenomResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QueryDenomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QueryDenomResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QueryDenomResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.denom = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/Denom',
    request,
    metadata || {},
    methodDescriptor_Query_Denom,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QueryDenomRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QueryDenomResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.denom = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/Denom',
    request,
    metadata || {},
    methodDescriptor_Query_Denom
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.QueryDenomsRequest,
 *   !proto.idep.nft.QueryDenomsResponse>}
 */
const methodDescriptor_Query_Denoms = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/Denoms',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QueryDenomsRequest,
  proto.idep.nft.QueryDenomsResponse,
  /**
   * @param {!proto.idep.nft.QueryDenomsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryDenomsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QueryDenomsRequest,
 *   !proto.idep.nft.QueryDenomsResponse>}
 */
const methodInfo_Query_Denoms = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QueryDenomsResponse,
  /**
   * @param {!proto.idep.nft.QueryDenomsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryDenomsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QueryDenomsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QueryDenomsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QueryDenomsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.denoms = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/Denoms',
    request,
    metadata || {},
    methodDescriptor_Query_Denoms,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QueryDenomsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QueryDenomsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.denoms = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/Denoms',
    request,
    metadata || {},
    methodDescriptor_Query_Denoms
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.QueryNFTRequest,
 *   !proto.idep.nft.QueryNFTResponse>}
 */
const methodDescriptor_Query_NFT = new grpc.web.MethodDescriptor(
  '/idep.nft.Query/NFT',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.QueryNFTRequest,
  proto.idep.nft.QueryNFTResponse,
  /**
   * @param {!proto.idep.nft.QueryNFTRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryNFTResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.QueryNFTRequest,
 *   !proto.idep.nft.QueryNFTResponse>}
 */
const methodInfo_Query_NFT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.QueryNFTResponse,
  /**
   * @param {!proto.idep.nft.QueryNFTRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.QueryNFTResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.QueryNFTRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.QueryNFTResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.QueryNFTResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.QueryClient.prototype.nFT = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Query/NFT',
    request,
    metadata || {},
    methodDescriptor_Query_NFT,
    callback
  );
};

/**
 * @param {!proto.idep.nft.QueryNFTRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.QueryNFTResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.QueryPromiseClient.prototype.nFT = function(request, metadata) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Query/NFT',
    request,
    metadata || {},
    methodDescriptor_Query_NFT
  );
};

module.exports = proto.idep.nft;
