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

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');
const proto = {};
proto.idep = {};
proto.idep.service = require('./tx_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.idep.service.MsgClient = function(hostname, credentials, options) {
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
proto.idep.service.MsgPromiseClient = function(hostname, credentials, options) {
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
 *   !proto.idep.service.MsgDefineService,
 *   !proto.idep.service.MsgDefineServiceResponse>}
 */
const methodDescriptor_Msg_DefineService = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/DefineService',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgDefineService,
  proto.idep.service.MsgDefineServiceResponse,
  /**
   * @param {!proto.idep.service.MsgDefineService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgDefineServiceResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgDefineService,
 *   !proto.idep.service.MsgDefineServiceResponse>}
 */
const methodInfo_Msg_DefineService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgDefineServiceResponse,
  /**
   * @param {!proto.idep.service.MsgDefineService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgDefineServiceResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgDefineService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgDefineServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgDefineServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.defineService = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/DefineService',
    request,
    metadata || {},
    methodDescriptor_Msg_DefineService,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgDefineService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgDefineServiceResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.defineService = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/DefineService',
    request,
    metadata || {},
    methodDescriptor_Msg_DefineService
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgBindService,
 *   !proto.idep.service.MsgBindServiceResponse>}
 */
const methodDescriptor_Msg_BindService = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/BindService',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgBindService,
  proto.idep.service.MsgBindServiceResponse,
  /**
   * @param {!proto.idep.service.MsgBindService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgBindServiceResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgBindService,
 *   !proto.idep.service.MsgBindServiceResponse>}
 */
const methodInfo_Msg_BindService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgBindServiceResponse,
  /**
   * @param {!proto.idep.service.MsgBindService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgBindServiceResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgBindService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgBindServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgBindServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.bindService = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/BindService',
    request,
    metadata || {},
    methodDescriptor_Msg_BindService,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgBindService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgBindServiceResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.bindService = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/BindService',
    request,
    metadata || {},
    methodDescriptor_Msg_BindService
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgUpdateServiceBinding,
 *   !proto.idep.service.MsgUpdateServiceBindingResponse>}
 */
const methodDescriptor_Msg_UpdateServiceBinding = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/UpdateServiceBinding',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgUpdateServiceBinding,
  proto.idep.service.MsgUpdateServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgUpdateServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgUpdateServiceBindingResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgUpdateServiceBinding,
 *   !proto.idep.service.MsgUpdateServiceBindingResponse>}
 */
const methodInfo_Msg_UpdateServiceBinding = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgUpdateServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgUpdateServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgUpdateServiceBindingResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgUpdateServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgUpdateServiceBindingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgUpdateServiceBindingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.updateServiceBinding = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/UpdateServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_UpdateServiceBinding,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgUpdateServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgUpdateServiceBindingResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.updateServiceBinding = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/UpdateServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_UpdateServiceBinding
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgSetWithdrawAddress,
 *   !proto.idep.service.MsgSetWithdrawAddressResponse>}
 */
const methodDescriptor_Msg_SetWithdrawAddress = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/SetWithdrawAddress',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgSetWithdrawAddress,
  proto.idep.service.MsgSetWithdrawAddressResponse,
  /**
   * @param {!proto.idep.service.MsgSetWithdrawAddress} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgSetWithdrawAddressResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgSetWithdrawAddress,
 *   !proto.idep.service.MsgSetWithdrawAddressResponse>}
 */
const methodInfo_Msg_SetWithdrawAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgSetWithdrawAddressResponse,
  /**
   * @param {!proto.idep.service.MsgSetWithdrawAddress} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgSetWithdrawAddressResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgSetWithdrawAddress} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgSetWithdrawAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgSetWithdrawAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.setWithdrawAddress = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/SetWithdrawAddress',
    request,
    metadata || {},
    methodDescriptor_Msg_SetWithdrawAddress,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgSetWithdrawAddress} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgSetWithdrawAddressResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.setWithdrawAddress = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/SetWithdrawAddress',
    request,
    metadata || {},
    methodDescriptor_Msg_SetWithdrawAddress
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgEnableServiceBinding,
 *   !proto.idep.service.MsgEnableServiceBindingResponse>}
 */
const methodDescriptor_Msg_EnableServiceBinding = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/EnableServiceBinding',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgEnableServiceBinding,
  proto.idep.service.MsgEnableServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgEnableServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgEnableServiceBindingResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgEnableServiceBinding,
 *   !proto.idep.service.MsgEnableServiceBindingResponse>}
 */
const methodInfo_Msg_EnableServiceBinding = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgEnableServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgEnableServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgEnableServiceBindingResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgEnableServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgEnableServiceBindingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgEnableServiceBindingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.enableServiceBinding = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/EnableServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_EnableServiceBinding,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgEnableServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgEnableServiceBindingResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.enableServiceBinding = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/EnableServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_EnableServiceBinding
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgDisableServiceBinding,
 *   !proto.idep.service.MsgDisableServiceBindingResponse>}
 */
const methodDescriptor_Msg_DisableServiceBinding = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/DisableServiceBinding',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgDisableServiceBinding,
  proto.idep.service.MsgDisableServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgDisableServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgDisableServiceBindingResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgDisableServiceBinding,
 *   !proto.idep.service.MsgDisableServiceBindingResponse>}
 */
const methodInfo_Msg_DisableServiceBinding = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgDisableServiceBindingResponse,
  /**
   * @param {!proto.idep.service.MsgDisableServiceBinding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgDisableServiceBindingResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgDisableServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgDisableServiceBindingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgDisableServiceBindingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.disableServiceBinding = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/DisableServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_DisableServiceBinding,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgDisableServiceBinding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgDisableServiceBindingResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.disableServiceBinding = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/DisableServiceBinding',
    request,
    metadata || {},
    methodDescriptor_Msg_DisableServiceBinding
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgRefundServiceDeposit,
 *   !proto.idep.service.MsgRefundServiceDepositResponse>}
 */
const methodDescriptor_Msg_RefundServiceDeposit = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/RefundServiceDeposit',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgRefundServiceDeposit,
  proto.idep.service.MsgRefundServiceDepositResponse,
  /**
   * @param {!proto.idep.service.MsgRefundServiceDeposit} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgRefundServiceDepositResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgRefundServiceDeposit,
 *   !proto.idep.service.MsgRefundServiceDepositResponse>}
 */
const methodInfo_Msg_RefundServiceDeposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgRefundServiceDepositResponse,
  /**
   * @param {!proto.idep.service.MsgRefundServiceDeposit} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgRefundServiceDepositResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgRefundServiceDeposit} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgRefundServiceDepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgRefundServiceDepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.refundServiceDeposit = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/RefundServiceDeposit',
    request,
    metadata || {},
    methodDescriptor_Msg_RefundServiceDeposit,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgRefundServiceDeposit} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgRefundServiceDepositResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.refundServiceDeposit = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/RefundServiceDeposit',
    request,
    metadata || {},
    methodDescriptor_Msg_RefundServiceDeposit
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgCallService,
 *   !proto.idep.service.MsgCallServiceResponse>}
 */
const methodDescriptor_Msg_CallService = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/CallService',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgCallService,
  proto.idep.service.MsgCallServiceResponse,
  /**
   * @param {!proto.idep.service.MsgCallService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgCallServiceResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgCallService,
 *   !proto.idep.service.MsgCallServiceResponse>}
 */
const methodInfo_Msg_CallService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgCallServiceResponse,
  /**
   * @param {!proto.idep.service.MsgCallService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgCallServiceResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgCallService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgCallServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgCallServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.callService = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/CallService',
    request,
    metadata || {},
    methodDescriptor_Msg_CallService,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgCallService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgCallServiceResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.callService = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/CallService',
    request,
    metadata || {},
    methodDescriptor_Msg_CallService
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgRespondService,
 *   !proto.idep.service.MsgRespondServiceResponse>}
 */
const methodDescriptor_Msg_RespondService = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/RespondService',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgRespondService,
  proto.idep.service.MsgRespondServiceResponse,
  /**
   * @param {!proto.idep.service.MsgRespondService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgRespondServiceResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgRespondService,
 *   !proto.idep.service.MsgRespondServiceResponse>}
 */
const methodInfo_Msg_RespondService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgRespondServiceResponse,
  /**
   * @param {!proto.idep.service.MsgRespondService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgRespondServiceResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgRespondService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgRespondServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgRespondServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.respondService = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/RespondService',
    request,
    metadata || {},
    methodDescriptor_Msg_RespondService,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgRespondService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgRespondServiceResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.respondService = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/RespondService',
    request,
    metadata || {},
    methodDescriptor_Msg_RespondService
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgPauseRequestContext,
 *   !proto.idep.service.MsgPauseRequestContextResponse>}
 */
const methodDescriptor_Msg_PauseRequestContext = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/PauseRequestContext',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgPauseRequestContext,
  proto.idep.service.MsgPauseRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgPauseRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgPauseRequestContextResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgPauseRequestContext,
 *   !proto.idep.service.MsgPauseRequestContextResponse>}
 */
const methodInfo_Msg_PauseRequestContext = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgPauseRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgPauseRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgPauseRequestContextResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgPauseRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgPauseRequestContextResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgPauseRequestContextResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.pauseRequestContext = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/PauseRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_PauseRequestContext,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgPauseRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgPauseRequestContextResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.pauseRequestContext = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/PauseRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_PauseRequestContext
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgStartRequestContext,
 *   !proto.idep.service.MsgStartRequestContextResponse>}
 */
const methodDescriptor_Msg_StartRequestContext = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/StartRequestContext',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgStartRequestContext,
  proto.idep.service.MsgStartRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgStartRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgStartRequestContextResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgStartRequestContext,
 *   !proto.idep.service.MsgStartRequestContextResponse>}
 */
const methodInfo_Msg_StartRequestContext = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgStartRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgStartRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgStartRequestContextResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgStartRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgStartRequestContextResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgStartRequestContextResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.startRequestContext = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/StartRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_StartRequestContext,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgStartRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgStartRequestContextResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.startRequestContext = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/StartRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_StartRequestContext
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgKillRequestContext,
 *   !proto.idep.service.MsgKillRequestContextResponse>}
 */
const methodDescriptor_Msg_KillRequestContext = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/KillRequestContext',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgKillRequestContext,
  proto.idep.service.MsgKillRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgKillRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgKillRequestContextResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgKillRequestContext,
 *   !proto.idep.service.MsgKillRequestContextResponse>}
 */
const methodInfo_Msg_KillRequestContext = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgKillRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgKillRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgKillRequestContextResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgKillRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgKillRequestContextResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgKillRequestContextResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.killRequestContext = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/KillRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_KillRequestContext,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgKillRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgKillRequestContextResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.killRequestContext = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/KillRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_KillRequestContext
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgUpdateRequestContext,
 *   !proto.idep.service.MsgUpdateRequestContextResponse>}
 */
const methodDescriptor_Msg_UpdateRequestContext = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/UpdateRequestContext',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgUpdateRequestContext,
  proto.idep.service.MsgUpdateRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgUpdateRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgUpdateRequestContextResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgUpdateRequestContext,
 *   !proto.idep.service.MsgUpdateRequestContextResponse>}
 */
const methodInfo_Msg_UpdateRequestContext = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgUpdateRequestContextResponse,
  /**
   * @param {!proto.idep.service.MsgUpdateRequestContext} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgUpdateRequestContextResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgUpdateRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgUpdateRequestContextResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgUpdateRequestContextResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.updateRequestContext = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/UpdateRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_UpdateRequestContext,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgUpdateRequestContext} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgUpdateRequestContextResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.updateRequestContext = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/UpdateRequestContext',
    request,
    metadata || {},
    methodDescriptor_Msg_UpdateRequestContext
  );
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.idep.service.MsgWithdrawEarnedFees,
 *   !proto.idep.service.MsgWithdrawEarnedFeesResponse>}
 */
const methodDescriptor_Msg_WithdrawEarnedFees = new grpc.web.MethodDescriptor(
  '/idep.service.Msg/WithdrawEarnedFees',
  grpc.web.MethodType.UNARY,
  proto.idep.service.MsgWithdrawEarnedFees,
  proto.idep.service.MsgWithdrawEarnedFeesResponse,
  /**
   * @param {!proto.idep.service.MsgWithdrawEarnedFees} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgWithdrawEarnedFeesResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.idep.service.MsgWithdrawEarnedFees,
 *   !proto.idep.service.MsgWithdrawEarnedFeesResponse>}
 */
const methodInfo_Msg_WithdrawEarnedFees = new grpc.web.AbstractClientBase.MethodInfo(
  proto.idep.service.MsgWithdrawEarnedFeesResponse,
  /**
   * @param {!proto.idep.service.MsgWithdrawEarnedFees} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.idep.service.MsgWithdrawEarnedFeesResponse.deserializeBinary
);

/**
 * @param {!proto.idep.service.MsgWithdrawEarnedFees} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.idep.service.MsgWithdrawEarnedFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.idep.service.MsgWithdrawEarnedFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.idep.service.MsgClient.prototype.withdrawEarnedFees = function(
  request,
  metadata,
  callback
) {
  return this.client_.rpcCall(
    this.hostname_ + '/idep.service.Msg/WithdrawEarnedFees',
    request,
    metadata || {},
    methodDescriptor_Msg_WithdrawEarnedFees,
    callback
  );
};

/**
 * @param {!proto.idep.service.MsgWithdrawEarnedFees} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.idep.service.MsgWithdrawEarnedFeesResponse>}
 *     Promise that resolves to the response
 */
proto.idep.service.MsgPromiseClient.prototype.withdrawEarnedFees = function(
  request,
  metadata
) {
  return this.client_.unaryCall(
    this.hostname_ + '/idep.service.Msg/WithdrawEarnedFees',
    request,
    metadata || {},
    methodDescriptor_Msg_WithdrawEarnedFees
  );
};

module.exports = proto.idep.service;
