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

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');
const proto = {};
proto.idep = {};
proto.idep.record = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.record.QueryClient = function(hostname, credentials, options) {
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
proto.idep.record.QueryPromiseClient = function(
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
 *   !proto.idep.record.QueryRecordRequest,
 *   !proto.idep.record.QueryRecordResponse>}
 */
const methodDescriptor_Query_Record = new grpc.web.MethodDescriptor(
  '/idep.record.Query/Record',
  grpc.web.MethodType.UNARY,
  proto.idep.record.QueryRecordRequest,
  proto.idep.record.QueryRecordResponse,
  /**
   * @param {!proto.idep.record.QueryRecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.record.QueryRecordResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.record.QueryRecordRequest,
 *   !proto.idep.record.QueryRecordResponse>}
 */
const methodInfo_Query_Record = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.record.QueryRecordResponse,
  /**
   * @param {!proto.idep.record.QueryRecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.record.QueryRecordResponse.deserializeBinary
);

/**
 * @param {!proto.idep.record.QueryRecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.record.QueryRecordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.record.QueryRecordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.record.QueryClient.prototype.record = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.record.Query/Record',
    request,
    metadata || {},
    methodDescriptor_Query_Record,
    callback
  );
};

/**
 * @param {!proto.idep.record.QueryRecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.record.QueryRecordResponse>}
 *     Promise that resolves to the response
 */
proto.idep.record.QueryPromiseClient.prototype.record = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.record.Query/Record',
    request,
    metadata || {},
    methodDescriptor_Query_Record
  );
};

module.exports = proto.idep.record;
