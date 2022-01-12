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

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');
const proto = {};
proto.idep = {};
proto.idep.token = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.token.MsgClient = function(hostname, credentials, options) {
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
proto.idep.token.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.token.MsgIssueToken,
 *   !proto.idep.token.MsgIssueTokenResponse>}
 */
const methodDescriptor_Msg_IssueToken = new grpc.web.MethodDescriptor(
  '/idep.token.Msg/IssueToken',
  grpc.web.MethodType.UNARY,
  proto.idep.token.MsgIssueToken,
  proto.idep.token.MsgIssueTokenResponse,
  /**
   * @param {!proto.idep.token.MsgIssueToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgIssueTokenResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.MsgIssueToken,
 *   !proto.idep.token.MsgIssueTokenResponse>}
 */
const methodInfo_Msg_IssueToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.MsgIssueTokenResponse,
  /**
   * @param {!proto.idep.token.MsgIssueToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgIssueTokenResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.MsgIssueToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.MsgIssueTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.MsgIssueTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.MsgClient.prototype.issueToken = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Msg/IssueToken',
    request,
    metadata || {},
    methodDescriptor_Msg_IssueToken,
    callback
  );
};

/**
 * @param {!proto.idep.token.MsgIssueToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.MsgIssueTokenResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.MsgPromiseClient.prototype.issueToken = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Msg/IssueToken',
    request,
    metadata || {},
    methodDescriptor_Msg_IssueToken
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.MsgEditToken,
 *   !proto.idep.token.MsgEditTokenResponse>}
 */
const methodDescriptor_Msg_EditToken = new grpc.web.MethodDescriptor(
  '/idep.token.Msg/EditToken',
  grpc.web.MethodType.UNARY,
  proto.idep.token.MsgEditToken,
  proto.idep.token.MsgEditTokenResponse,
  /**
   * @param {!proto.idep.token.MsgEditToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgEditTokenResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.MsgEditToken,
 *   !proto.idep.token.MsgEditTokenResponse>}
 */
const methodInfo_Msg_EditToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.MsgEditTokenResponse,
  /**
   * @param {!proto.idep.token.MsgEditToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgEditTokenResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.MsgEditToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.MsgEditTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.MsgEditTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.MsgClient.prototype.editToken = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Msg/EditToken',
    request,
    metadata || {},
    methodDescriptor_Msg_EditToken,
    callback
  );
};

/**
 * @param {!proto.idep.token.MsgEditToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.MsgEditTokenResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.MsgPromiseClient.prototype.editToken = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Msg/EditToken',
    request,
    metadata || {},
    methodDescriptor_Msg_EditToken
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.MsgMintToken,
 *   !proto.idep.token.MsgMintTokenResponse>}
 */
const methodDescriptor_Msg_MintToken = new grpc.web.MethodDescriptor(
  '/idep.token.Msg/MintToken',
  grpc.web.MethodType.UNARY,
  proto.idep.token.MsgMintToken,
  proto.idep.token.MsgMintTokenResponse,
  /**
   * @param {!proto.idep.token.MsgMintToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgMintTokenResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.MsgMintToken,
 *   !proto.idep.token.MsgMintTokenResponse>}
 */
const methodInfo_Msg_MintToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.MsgMintTokenResponse,
  /**
   * @param {!proto.idep.token.MsgMintToken} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgMintTokenResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.MsgMintToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.MsgMintTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.MsgMintTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.MsgClient.prototype.mintToken = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Msg/MintToken',
    request,
    metadata || {},
    methodDescriptor_Msg_MintToken,
    callback
  );
};

/**
 * @param {!proto.idep.token.MsgMintToken} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.MsgMintTokenResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.MsgPromiseClient.prototype.mintToken = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Msg/MintToken',
    request,
    metadata || {},
    methodDescriptor_Msg_MintToken
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.token.MsgTransferTokenOwner,
 *   !proto.idep.token.MsgTransferTokenOwnerResponse>}
 */
const methodDescriptor_Msg_TransferTokenOwner = new grpc.web.MethodDescriptor(
  '/idep.token.Msg/TransferTokenOwner',
  grpc.web.MethodType.UNARY,
  proto.idep.token.MsgTransferTokenOwner,
  proto.idep.token.MsgTransferTokenOwnerResponse,
  /**
   * @param {!proto.idep.token.MsgTransferTokenOwner} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgTransferTokenOwnerResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.token.MsgTransferTokenOwner,
 *   !proto.idep.token.MsgTransferTokenOwnerResponse>}
 */
const methodInfo_Msg_TransferTokenOwner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.token.MsgTransferTokenOwnerResponse,
  /**
   * @param {!proto.idep.token.MsgTransferTokenOwner} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.token.MsgTransferTokenOwnerResponse.deserializeBinary
);

/**
 * @param {!proto.idep.token.MsgTransferTokenOwner} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.token.MsgTransferTokenOwnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.token.MsgTransferTokenOwnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.token.MsgClient.prototype.transferTokenOwner = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.token.Msg/TransferTokenOwner',
    request,
    metadata || {},
    methodDescriptor_Msg_TransferTokenOwner,
    callback
  );
};

/**
 * @param {!proto.idep.token.MsgTransferTokenOwner} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.token.MsgTransferTokenOwnerResponse>}
 *     Promise that resolves to the response
 */
proto.idep.token.MsgPromiseClient.prototype.transferTokenOwner = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.token.Msg/TransferTokenOwner',
    request,
    metadata || {},
    methodDescriptor_Msg_TransferTokenOwner
  );
};

module.exports = proto.idep.token;
