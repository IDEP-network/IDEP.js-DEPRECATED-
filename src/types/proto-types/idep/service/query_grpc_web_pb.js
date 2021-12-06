/**
 * @fileoverview gRPC-Web generated client stub for idep.service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require('grpc-web');

var cosmos_base_v1beta1_coin_pb = require('../../cosmos/base/v1beta1/coin_pb.js');

var cosmos_base_query_v1beta1_pagination_pb = require('../../cosmos/base/query/v1beta1/pagination_pb.js');

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');

var google_api_annotations_pb = require('../../google/api/annotations_pb.js');

var idep_service_service_pb = require('../../idep/service/service_pb.js');
const proto = {};
proto.idep = {};
proto.idep.service = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.service.QueryClient = function(hostname, credentials, options) {
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
proto.idep.service.QueryPromiseClient = function(
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
 *   !proto.idep.service.QueryDefinitionRequest,
 *   !proto.idep.service.QueryDefinitionResponse>}
 */
const methodDescriptor_Query_Definition = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Definition',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryDefinitionRequest,
  proto.idep.service.QueryDefinitionResponse,
  /**
   * @param {!proto.idep.service.QueryDefinitionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryDefinitionResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryDefinitionRequest,
 *   !proto.idep.service.QueryDefinitionResponse>}
 */
const methodInfo_Query_Definition = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryDefinitionResponse,
  /**
   * @param {!proto.idep.service.QueryDefinitionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryDefinitionResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryDefinitionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryDefinitionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryDefinitionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.definition = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Definition',
    request,
    metadata || {},
    methodDescriptor_Query_Definition,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryDefinitionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryDefinitionResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.definition = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Definition',
    request,
    metadata || {},
    methodDescriptor_Query_Definition
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryBindingRequest,
 *   !proto.idep.service.QueryBindingResponse>}
 */
const methodDescriptor_Query_Binding = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Binding',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryBindingRequest,
  proto.idep.service.QueryBindingResponse,
  /**
   * @param {!proto.idep.service.QueryBindingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryBindingResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryBindingRequest,
 *   !proto.idep.service.QueryBindingResponse>}
 */
const methodInfo_Query_Binding = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryBindingResponse,
  /**
   * @param {!proto.idep.service.QueryBindingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryBindingResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryBindingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryBindingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryBindingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.binding = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Binding',
    request,
    metadata || {},
    methodDescriptor_Query_Binding,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryBindingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryBindingResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.binding = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Binding',
    request,
    metadata || {},
    methodDescriptor_Query_Binding
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryBindingsRequest,
 *   !proto.idep.service.QueryBindingsResponse>}
 */
const methodDescriptor_Query_Bindings = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Bindings',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryBindingsRequest,
  proto.idep.service.QueryBindingsResponse,
  /**
   * @param {!proto.idep.service.QueryBindingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryBindingsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryBindingsRequest,
 *   !proto.idep.service.QueryBindingsResponse>}
 */
const methodInfo_Query_Bindings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryBindingsResponse,
  /**
   * @param {!proto.idep.service.QueryBindingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryBindingsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryBindingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryBindingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryBindingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.bindings = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Bindings',
    request,
    metadata || {},
    methodDescriptor_Query_Bindings,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryBindingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryBindingsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.bindings = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Bindings',
    request,
    metadata || {},
    methodDescriptor_Query_Bindings
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryWithdrawAddressRequest,
 *   !proto.idep.service.QueryWithdrawAddressResponse>}
 */
const methodDescriptor_Query_WithdrawAddress = new grpc.web.MethodDescriptor(
  '/idep.service.Query/WithdrawAddress',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryWithdrawAddressRequest,
  proto.idep.service.QueryWithdrawAddressResponse,
  /**
   * @param {!proto.idep.service.QueryWithdrawAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryWithdrawAddressResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryWithdrawAddressRequest,
 *   !proto.idep.service.QueryWithdrawAddressResponse>}
 */
const methodInfo_Query_WithdrawAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryWithdrawAddressResponse,
  /**
   * @param {!proto.idep.service.QueryWithdrawAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryWithdrawAddressResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryWithdrawAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryWithdrawAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryWithdrawAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.withdrawAddress = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/WithdrawAddress',
    request,
    metadata || {},
    methodDescriptor_Query_WithdrawAddress,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryWithdrawAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryWithdrawAddressResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.withdrawAddress = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/WithdrawAddress',
    request,
    metadata || {},
    methodDescriptor_Query_WithdrawAddress
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryRequestContextRequest,
 *   !proto.idep.service.QueryRequestContextResponse>}
 */
const methodDescriptor_Query_RequestContext = new grpc.web.MethodDescriptor(
  '/idep.service.Query/RequestContext',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryRequestContextRequest,
  proto.idep.service.QueryRequestContextResponse,
  /**
   * @param {!proto.idep.service.QueryRequestContextRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestContextResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryRequestContextRequest,
 *   !proto.idep.service.QueryRequestContextResponse>}
 */
const methodInfo_Query_RequestContext = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryRequestContextResponse,
  /**
   * @param {!proto.idep.service.QueryRequestContextRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestContextResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryRequestContextRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryRequestContextResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryRequestContextResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.requestContext = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/RequestContext',
    request,
    metadata || {},
    methodDescriptor_Query_RequestContext,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryRequestContextRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryRequestContextResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.requestContext = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/RequestContext',
    request,
    metadata || {},
    methodDescriptor_Query_RequestContext
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryRequestRequest,
 *   !proto.idep.service.QueryRequestResponse>}
 */
const methodDescriptor_Query_Request = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Request',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryRequestRequest,
  proto.idep.service.QueryRequestResponse,
  /**
   * @param {!proto.idep.service.QueryRequestRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryRequestRequest,
 *   !proto.idep.service.QueryRequestResponse>}
 */
const methodInfo_Query_Request = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryRequestResponse,
  /**
   * @param {!proto.idep.service.QueryRequestRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryRequestRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryRequestResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryRequestResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.request = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Request',
    request,
    metadata || {},
    methodDescriptor_Query_Request,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryRequestRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryRequestResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.request = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Request',
    request,
    metadata || {},
    methodDescriptor_Query_Request
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryRequestsRequest,
 *   !proto.idep.service.QueryRequestsResponse>}
 */
const methodDescriptor_Query_Requests = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Requests',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryRequestsRequest,
  proto.idep.service.QueryRequestsResponse,
  /**
   * @param {!proto.idep.service.QueryRequestsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryRequestsRequest,
 *   !proto.idep.service.QueryRequestsResponse>}
 */
const methodInfo_Query_Requests = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryRequestsResponse,
  /**
   * @param {!proto.idep.service.QueryRequestsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryRequestsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryRequestsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryRequestsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.requests = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Requests',
    request,
    metadata || {},
    methodDescriptor_Query_Requests,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryRequestsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryRequestsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.requests = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Requests',
    request,
    metadata || {},
    methodDescriptor_Query_Requests
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryRequestsByReqCtxRequest,
 *   !proto.idep.service.QueryRequestsByReqCtxResponse>}
 */
const methodDescriptor_Query_RequestsByReqCtx = new grpc.web.MethodDescriptor(
  '/idep.service.Query/RequestsByReqCtx',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryRequestsByReqCtxRequest,
  proto.idep.service.QueryRequestsByReqCtxResponse,
  /**
   * @param {!proto.idep.service.QueryRequestsByReqCtxRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestsByReqCtxResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryRequestsByReqCtxRequest,
 *   !proto.idep.service.QueryRequestsByReqCtxResponse>}
 */
const methodInfo_Query_RequestsByReqCtx = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryRequestsByReqCtxResponse,
  /**
   * @param {!proto.idep.service.QueryRequestsByReqCtxRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryRequestsByReqCtxResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryRequestsByReqCtxRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryRequestsByReqCtxResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryRequestsByReqCtxResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.requestsByReqCtx = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/RequestsByReqCtx',
    request,
    metadata || {},
    methodDescriptor_Query_RequestsByReqCtx,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryRequestsByReqCtxRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryRequestsByReqCtxResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.requestsByReqCtx = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/RequestsByReqCtx',
    request,
    metadata || {},
    methodDescriptor_Query_RequestsByReqCtx
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryResponseRequest,
 *   !proto.idep.service.QueryResponseResponse>}
 */
const methodDescriptor_Query_Response = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Response',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryResponseRequest,
  proto.idep.service.QueryResponseResponse,
  /**
   * @param {!proto.idep.service.QueryResponseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryResponseResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryResponseRequest,
 *   !proto.idep.service.QueryResponseResponse>}
 */
const methodInfo_Query_Response = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryResponseResponse,
  /**
   * @param {!proto.idep.service.QueryResponseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryResponseResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryResponseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryResponseResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryResponseResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.response = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Response',
    request,
    metadata || {},
    methodDescriptor_Query_Response,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryResponseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryResponseResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.response = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Response',
    request,
    metadata || {},
    methodDescriptor_Query_Response
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryResponsesRequest,
 *   !proto.idep.service.QueryResponsesResponse>}
 */
const methodDescriptor_Query_Responses = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Responses',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryResponsesRequest,
  proto.idep.service.QueryResponsesResponse,
  /**
   * @param {!proto.idep.service.QueryResponsesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryResponsesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryResponsesRequest,
 *   !proto.idep.service.QueryResponsesResponse>}
 */
const methodInfo_Query_Responses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryResponsesResponse,
  /**
   * @param {!proto.idep.service.QueryResponsesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryResponsesResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryResponsesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryResponsesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryResponsesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.responses = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Responses',
    request,
    metadata || {},
    methodDescriptor_Query_Responses,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryResponsesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryResponsesResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.responses = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Responses',
    request,
    metadata || {},
    methodDescriptor_Query_Responses
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryEarnedFeesRequest,
 *   !proto.idep.service.QueryEarnedFeesResponse>}
 */
const methodDescriptor_Query_EarnedFees = new grpc.web.MethodDescriptor(
  '/idep.service.Query/EarnedFees',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryEarnedFeesRequest,
  proto.idep.service.QueryEarnedFeesResponse,
  /**
   * @param {!proto.idep.service.QueryEarnedFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryEarnedFeesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryEarnedFeesRequest,
 *   !proto.idep.service.QueryEarnedFeesResponse>}
 */
const methodInfo_Query_EarnedFees = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryEarnedFeesResponse,
  /**
   * @param {!proto.idep.service.QueryEarnedFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryEarnedFeesResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryEarnedFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryEarnedFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryEarnedFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.earnedFees = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/EarnedFees',
    request,
    metadata || {},
    methodDescriptor_Query_EarnedFees,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryEarnedFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryEarnedFeesResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.earnedFees = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/EarnedFees',
    request,
    metadata || {},
    methodDescriptor_Query_EarnedFees
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QuerySchemaRequest,
 *   !proto.idep.service.QuerySchemaResponse>}
 */
const methodDescriptor_Query_Schema = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Schema',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QuerySchemaRequest,
  proto.idep.service.QuerySchemaResponse,
  /**
   * @param {!proto.idep.service.QuerySchemaRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QuerySchemaResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QuerySchemaRequest,
 *   !proto.idep.service.QuerySchemaResponse>}
 */
const methodInfo_Query_Schema = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QuerySchemaResponse,
  /**
   * @param {!proto.idep.service.QuerySchemaRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QuerySchemaResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QuerySchemaRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QuerySchemaResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QuerySchemaResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.schema = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Schema',
    request,
    metadata || {},
    methodDescriptor_Query_Schema,
    callback
  );
};

/**
 * @param {!proto.idep.service.QuerySchemaRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QuerySchemaResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.schema = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Schema',
    request,
    metadata || {},
    methodDescriptor_Query_Schema
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.QueryParamsRequest,
 *   !proto.idep.service.QueryParamsResponse>}
 */
const methodDescriptor_Query_Params = new grpc.web.MethodDescriptor(
  '/idep.service.Query/Params',
  grpc.web.MethodType.UNARY,
  proto.idep.service.QueryParamsRequest,
  proto.idep.service.QueryParamsResponse,
  /**
   * @param {!proto.idep.service.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryParamsResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.QueryParamsRequest,
 *   !proto.idep.service.QueryParamsResponse>}
 */
const methodInfo_Query_Params = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.QueryParamsResponse,
  /**
   * @param {!proto.idep.service.QueryParamsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.QueryParamsResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.QueryParamsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.QueryParamsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.QueryClient.prototype.params = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params,
    callback
  );
};

/**
 * @param {!proto.idep.service.QueryParamsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.QueryParamsResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.QueryPromiseClient.prototype.params = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Query/Params',
    request,
    metadata || {},
    methodDescriptor_Query_Params
  );
};

module.exports = proto.idep.service;
