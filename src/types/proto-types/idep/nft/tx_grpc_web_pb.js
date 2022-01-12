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
const proto = {};
proto.idep = {};
proto.idep.nft = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.nft.MsgClient = function(hostname, credentials, options) {
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
proto.idep.nft.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.nft.MsgIssueDenom,
 *   !proto.idep.nft.MsgIssueDenomResponse>}
 */
const methodDescriptor_Msg_IssueDenom = new grpc.web.MethodDescriptor(
  '/idep.nft.Msg/IssueDenom',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.MsgIssueDenom,
  proto.idep.nft.MsgIssueDenomResponse,
  /**
   * @param {!proto.idep.nft.MsgIssueDenom} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgIssueDenomResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.MsgIssueDenom,
 *   !proto.idep.nft.MsgIssueDenomResponse>}
 */
const methodInfo_Msg_IssueDenom = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.MsgIssueDenomResponse,
  /**
   * @param {!proto.idep.nft.MsgIssueDenom} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgIssueDenomResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.MsgIssueDenom} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.MsgIssueDenomResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.MsgIssueDenomResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.MsgClient.prototype.issueDenom = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Msg/IssueDenom',
    request,
    metadata || {},
    methodDescriptor_Msg_IssueDenom,
    callback
  );
};

/**
 * @param {!proto.idep.nft.MsgIssueDenom} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.MsgIssueDenomResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.MsgPromiseClient.prototype.issueDenom = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Msg/IssueDenom',
    request,
    metadata || {},
    methodDescriptor_Msg_IssueDenom
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.MsgMintNFT,
 *   !proto.idep.nft.MsgMintNFTResponse>}
 */
const methodDescriptor_Msg_MintNFT = new grpc.web.MethodDescriptor(
  '/idep.nft.Msg/MintNFT',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.MsgMintNFT,
  proto.idep.nft.MsgMintNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgMintNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgMintNFTResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.MsgMintNFT,
 *   !proto.idep.nft.MsgMintNFTResponse>}
 */
const methodInfo_Msg_MintNFT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.MsgMintNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgMintNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgMintNFTResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.MsgMintNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.MsgMintNFTResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.MsgMintNFTResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.MsgClient.prototype.mintNFT = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Msg/MintNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_MintNFT,
    callback
  );
};

/**
 * @param {!proto.idep.nft.MsgMintNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.MsgMintNFTResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.MsgPromiseClient.prototype.mintNFT = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Msg/MintNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_MintNFT
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.MsgEditNFT,
 *   !proto.idep.nft.MsgEditNFTResponse>}
 */
const methodDescriptor_Msg_EditNFT = new grpc.web.MethodDescriptor(
  '/idep.nft.Msg/EditNFT',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.MsgEditNFT,
  proto.idep.nft.MsgEditNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgEditNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgEditNFTResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.MsgEditNFT,
 *   !proto.idep.nft.MsgEditNFTResponse>}
 */
const methodInfo_Msg_EditNFT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.MsgEditNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgEditNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgEditNFTResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.MsgEditNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.MsgEditNFTResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.MsgEditNFTResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.MsgClient.prototype.editNFT = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Msg/EditNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_EditNFT,
    callback
  );
};

/**
 * @param {!proto.idep.nft.MsgEditNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.MsgEditNFTResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.MsgPromiseClient.prototype.editNFT = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Msg/EditNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_EditNFT
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.MsgTransferNFT,
 *   !proto.idep.nft.MsgTransferNFTResponse>}
 */
const methodDescriptor_Msg_TransferNFT = new grpc.web.MethodDescriptor(
  '/idep.nft.Msg/TransferNFT',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.MsgTransferNFT,
  proto.idep.nft.MsgTransferNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgTransferNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgTransferNFTResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.MsgTransferNFT,
 *   !proto.idep.nft.MsgTransferNFTResponse>}
 */
const methodInfo_Msg_TransferNFT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.MsgTransferNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgTransferNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgTransferNFTResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.MsgTransferNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.MsgTransferNFTResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.MsgTransferNFTResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.MsgClient.prototype.transferNFT = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Msg/TransferNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_TransferNFT,
    callback
  );
};

/**
 * @param {!proto.idep.nft.MsgTransferNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.MsgTransferNFTResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.MsgPromiseClient.prototype.transferNFT = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Msg/TransferNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_TransferNFT
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.nft.MsgBurnNFT,
 *   !proto.idep.nft.MsgBurnNFTResponse>}
 */
const methodDescriptor_Msg_BurnNFT = new grpc.web.MethodDescriptor(
  '/idep.nft.Msg/BurnNFT',
  grpc.web.MethodType.UNARY,
  proto.idep.nft.MsgBurnNFT,
  proto.idep.nft.MsgBurnNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgBurnNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgBurnNFTResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.nft.MsgBurnNFT,
 *   !proto.idep.nft.MsgBurnNFTResponse>}
 */
const methodInfo_Msg_BurnNFT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.nft.MsgBurnNFTResponse,
  /**
   * @param {!proto.idep.nft.MsgBurnNFT} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.nft.MsgBurnNFTResponse.deserializeBinary
);

/**
 * @param {!proto.idep.nft.MsgBurnNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.nft.MsgBurnNFTResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.nft.MsgBurnNFTResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.nft.MsgClient.prototype.burnNFT = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.nft.Msg/BurnNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_BurnNFT,
    callback
  );
};

/**
 * @param {!proto.idep.nft.MsgBurnNFT} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.nft.MsgBurnNFTResponse>}
 *     Promise that resolves to the response
 */
proto.idep.nft.MsgPromiseClient.prototype.burnNFT = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.nft.Msg/BurnNFT',
    request,
    metadata || {},
    methodDescriptor_Msg_BurnNFT
  );
};

module.exports = proto.idep.nft;
