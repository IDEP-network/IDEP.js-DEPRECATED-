/**
 * @fileoverview gRPC-Web generated client stub for idep.record
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var idep_record_record_pb = require('../../idep/record/record_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');
const proto = {};
proto.idep = {};
proto.idep.record = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.record.MsgClient = function(hostname, credentials, options) {
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
proto.idep.record.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.record.MsgCreateRecord,
 *   !proto.idep.record.MsgCreateRecordResponse>}
 */
const methodDescriptor_Msg_CreateRecord = new grpc.web.MethodDescriptor(
  '/idep.record.Msg/CreateRecord',
  grpc.web.MethodType.UNARY,
  proto.idep.record.MsgCreateRecord,
  proto.idep.record.MsgCreateRecordResponse,
  /**
   * @param {!proto.idep.record.MsgCreateRecord} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.record.MsgCreateRecordResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.record.MsgCreateRecord,
 *   !proto.idep.record.MsgCreateRecordResponse>}
 */
const methodInfo_Msg_CreateRecord = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.record.MsgCreateRecordResponse,
  /**
   * @param {!proto.idep.record.MsgCreateRecord} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.record.MsgCreateRecordResponse.deserializeBinary
);

/**
 * @param {!proto.idep.record.MsgCreateRecord} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.record.MsgCreateRecordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.record.MsgCreateRecordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.record.MsgClient.prototype.createRecord = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.record.Msg/CreateRecord',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateRecord,
    callback
  );
};

/**
 * @param {!proto.idep.record.MsgCreateRecord} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.record.MsgCreateRecordResponse>}
 *     Promise that resolves to the response
 */
proto.idep.record.MsgPromiseClient.prototype.createRecord = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.record.Msg/CreateRecord',
    request,
    metadata || {},
    methodDescriptor_Msg_CreateRecord
  );
};

module.exports = proto.idep.record;
