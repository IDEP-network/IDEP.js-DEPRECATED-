// source: idep/nft/nft.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var gogoproto_gogo_pb = require('../../gogoproto/gogo_pb.js');
goog.object.extend(proto, gogoproto_gogo_pb);
goog.exportSymbol('proto.idep.nft.BaseNFT', null, global);
goog.exportSymbol('proto.idep.nft.Collection', null, global);
goog.exportSymbol('proto.idep.nft.Denom', null, global);
goog.exportSymbol('proto.idep.nft.IDCollection', null, global);
goog.exportSymbol('proto.idep.nft.Owner', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.idep.nft.BaseNFT = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.idep.nft.BaseNFT, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.idep.nft.BaseNFT.displayName = 'proto.idep.nft.BaseNFT';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.idep.nft.Denom = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.idep.nft.Denom, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.idep.nft.Denom.displayName = 'proto.idep.nft.Denom';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.idep.nft.IDCollection = function(opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.idep.nft.IDCollection.repeatedFields_,
    null
  );
};
goog.inherits(proto.idep.nft.IDCollection, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.idep.nft.IDCollection.displayName = 'proto.idep.nft.IDCollection';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.idep.nft.Owner = function(opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.idep.nft.Owner.repeatedFields_,
    null
  );
};
goog.inherits(proto.idep.nft.Owner, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.idep.nft.Owner.displayName = 'proto.idep.nft.Owner';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.idep.nft.Collection = function(opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.idep.nft.Collection.repeatedFields_,
    null
  );
};
goog.inherits(proto.idep.nft.Collection, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.idep.nft.Collection.displayName = 'proto.idep.nft.Collection';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.idep.nft.BaseNFT.prototype.toObject = function(opt_includeInstance) {
    return proto.idep.nft.BaseNFT.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.idep.nft.BaseNFT} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.idep.nft.BaseNFT.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        id: jspb.Message.getFieldWithDefault(msg, 1, ''),
        name: jspb.Message.getFieldWithDefault(msg, 2, ''),
        uri: jspb.Message.getFieldWithDefault(msg, 3, ''),
        data: jspb.Message.getFieldWithDefault(msg, 4, ''),
        owner: jspb.Message.getFieldWithDefault(msg, 5, ''),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.idep.nft.BaseNFT}
 */
proto.idep.nft.BaseNFT.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.idep.nft.BaseNFT();
  return proto.idep.nft.BaseNFT.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.idep.nft.BaseNFT} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.idep.nft.BaseNFT}
 */
proto.idep.nft.BaseNFT.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setName(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setUri(value);
        break;
      case 4:
        var value = /** @type {string} */ (reader.readString());
        msg.setData(value);
        break;
      case 5:
        var value = /** @type {string} */ (reader.readString());
        msg.setOwner(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.idep.nft.BaseNFT.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.idep.nft.BaseNFT.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.idep.nft.BaseNFT} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.idep.nft.BaseNFT.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
  f = message.getUri();
  if (f.length > 0) {
    writer.writeString(3, f);
  }
  f = message.getData();
  if (f.length > 0) {
    writer.writeString(4, f);
  }
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(5, f);
  }
};

/**
 * optional string id = 1;
 * @return {string}
 */
proto.idep.nft.BaseNFT.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.BaseNFT} returns this
 */
proto.idep.nft.BaseNFT.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string name = 2;
 * @return {string}
 */
proto.idep.nft.BaseNFT.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.BaseNFT} returns this
 */
proto.idep.nft.BaseNFT.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string uri = 3;
 * @return {string}
 */
proto.idep.nft.BaseNFT.prototype.getUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.BaseNFT} returns this
 */
proto.idep.nft.BaseNFT.prototype.setUri = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string data = 4;
 * @return {string}
 */
proto.idep.nft.BaseNFT.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.BaseNFT} returns this
 */
proto.idep.nft.BaseNFT.prototype.setData = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * optional string owner = 5;
 * @return {string}
 */
proto.idep.nft.BaseNFT.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.BaseNFT} returns this
 */
proto.idep.nft.BaseNFT.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.idep.nft.Denom.prototype.toObject = function(opt_includeInstance) {
    return proto.idep.nft.Denom.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.idep.nft.Denom} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.idep.nft.Denom.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        id: jspb.Message.getFieldWithDefault(msg, 1, ''),
        name: jspb.Message.getFieldWithDefault(msg, 2, ''),
        schema: jspb.Message.getFieldWithDefault(msg, 3, ''),
        creator: jspb.Message.getFieldWithDefault(msg, 4, ''),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.idep.nft.Denom}
 */
proto.idep.nft.Denom.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.idep.nft.Denom();
  return proto.idep.nft.Denom.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.idep.nft.Denom} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.idep.nft.Denom}
 */
proto.idep.nft.Denom.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setName(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setSchema(value);
        break;
      case 4:
        var value = /** @type {string} */ (reader.readString());
        msg.setCreator(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.idep.nft.Denom.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.idep.nft.Denom.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.idep.nft.Denom} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.idep.nft.Denom.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
  f = message.getSchema();
  if (f.length > 0) {
    writer.writeString(3, f);
  }
  f = message.getCreator();
  if (f.length > 0) {
    writer.writeString(4, f);
  }
};

/**
 * optional string id = 1;
 * @return {string}
 */
proto.idep.nft.Denom.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.Denom} returns this
 */
proto.idep.nft.Denom.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string name = 2;
 * @return {string}
 */
proto.idep.nft.Denom.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.Denom} returns this
 */
proto.idep.nft.Denom.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string schema = 3;
 * @return {string}
 */
proto.idep.nft.Denom.prototype.getSchema = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.Denom} returns this
 */
proto.idep.nft.Denom.prototype.setSchema = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string creator = 4;
 * @return {string}
 */
proto.idep.nft.Denom.prototype.getCreator = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.Denom} returns this
 */
proto.idep.nft.Denom.prototype.setCreator = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.idep.nft.IDCollection.repeatedFields_ = [2];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.idep.nft.IDCollection.prototype.toObject = function(
    opt_includeInstance
  ) {
    return proto.idep.nft.IDCollection.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.idep.nft.IDCollection} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.idep.nft.IDCollection.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        denomId: jspb.Message.getFieldWithDefault(msg, 1, ''),
        tokenIdsList:
          (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.idep.nft.IDCollection}
 */
proto.idep.nft.IDCollection.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.idep.nft.IDCollection();
  return proto.idep.nft.IDCollection.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.idep.nft.IDCollection} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.idep.nft.IDCollection}
 */
proto.idep.nft.IDCollection.deserializeBinaryFromReader = function(
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setDenomId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.addTokenIds(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.idep.nft.IDCollection.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.idep.nft.IDCollection.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.idep.nft.IDCollection} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.idep.nft.IDCollection.serializeBinaryToWriter = function(
  message,
  writer
) {
  var f = undefined;
  f = message.getDenomId();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getTokenIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(2, f);
  }
};

/**
 * optional string denom_id = 1;
 * @return {string}
 */
proto.idep.nft.IDCollection.prototype.getDenomId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.IDCollection} returns this
 */
proto.idep.nft.IDCollection.prototype.setDenomId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * repeated string token_ids = 2;
 * @return {!Array<string>}
 */
proto.idep.nft.IDCollection.prototype.getTokenIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};

/**
 * @param {!Array<string>} value
 * @return {!proto.idep.nft.IDCollection} returns this
 */
proto.idep.nft.IDCollection.prototype.setTokenIdsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};

/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.idep.nft.IDCollection} returns this
 */
proto.idep.nft.IDCollection.prototype.addTokenIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.idep.nft.IDCollection} returns this
 */
proto.idep.nft.IDCollection.prototype.clearTokenIdsList = function() {
  return this.setTokenIdsList([]);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.idep.nft.Owner.repeatedFields_ = [2];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.idep.nft.Owner.prototype.toObject = function(opt_includeInstance) {
    return proto.idep.nft.Owner.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.idep.nft.Owner} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.idep.nft.Owner.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        address: jspb.Message.getFieldWithDefault(msg, 1, ''),
        idCollectionsList: jspb.Message.toObjectList(
          msg.getIdCollectionsList(),
          proto.idep.nft.IDCollection.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.idep.nft.Owner}
 */
proto.idep.nft.Owner.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.idep.nft.Owner();
  return proto.idep.nft.Owner.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.idep.nft.Owner} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.idep.nft.Owner}
 */
proto.idep.nft.Owner.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setAddress(value);
        break;
      case 2:
        var value = new proto.idep.nft.IDCollection();
        reader.readMessage(
          value,
          proto.idep.nft.IDCollection.deserializeBinaryFromReader
        );
        msg.addIdCollections(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.idep.nft.Owner.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.idep.nft.Owner.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.idep.nft.Owner} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.idep.nft.Owner.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getIdCollectionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.idep.nft.IDCollection.serializeBinaryToWriter
    );
  }
};

/**
 * optional string address = 1;
 * @return {string}
 */
proto.idep.nft.Owner.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''));
};

/**
 * @param {string} value
 * @return {!proto.idep.nft.Owner} returns this
 */
proto.idep.nft.Owner.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * repeated IDCollection id_collections = 2;
 * @return {!Array<!proto.idep.nft.IDCollection>}
 */
proto.idep.nft.Owner.prototype.getIdCollectionsList = function() {
  return /** @type{!Array<!proto.idep.nft.IDCollection>} */ (jspb.Message.getRepeatedWrapperField(
    this,
    proto.idep.nft.IDCollection,
    2
  ));
};

/**
 * @param {!Array<!proto.idep.nft.IDCollection>} value
 * @return {!proto.idep.nft.Owner} returns this
 */
proto.idep.nft.Owner.prototype.setIdCollectionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};

/**
 * @param {!proto.idep.nft.IDCollection=} opt_value
 * @param {number=} opt_index
 * @return {!proto.idep.nft.IDCollection}
 */
proto.idep.nft.Owner.prototype.addIdCollections = function(
  opt_value,
  opt_index
) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    2,
    opt_value,
    proto.idep.nft.IDCollection,
    opt_index
  );
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.idep.nft.Owner} returns this
 */
proto.idep.nft.Owner.prototype.clearIdCollectionsList = function() {
  return this.setIdCollectionsList([]);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.idep.nft.Collection.repeatedFields_ = [2];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.idep.nft.Collection.prototype.toObject = function(opt_includeInstance) {
    return proto.idep.nft.Collection.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.idep.nft.Collection} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.idep.nft.Collection.toObject = function(includeInstance, msg) {
    var f,
      obj = {
        denom:
          (f = msg.getDenom()) &&
          proto.idep.nft.Denom.toObject(includeInstance, f),
        nftsList: jspb.Message.toObjectList(
          msg.getNftsList(),
          proto.idep.nft.BaseNFT.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.idep.nft.Collection}
 */
proto.idep.nft.Collection.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.idep.nft.Collection();
  return proto.idep.nft.Collection.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.idep.nft.Collection} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.idep.nft.Collection}
 */
proto.idep.nft.Collection.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.idep.nft.Denom();
        reader.readMessage(
          value,
          proto.idep.nft.Denom.deserializeBinaryFromReader
        );
        msg.setDenom(value);
        break;
      case 2:
        var value = new proto.idep.nft.BaseNFT();
        reader.readMessage(
          value,
          proto.idep.nft.BaseNFT.deserializeBinaryFromReader
        );
        msg.addNfts(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.idep.nft.Collection.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.idep.nft.Collection.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.idep.nft.Collection} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.idep.nft.Collection.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDenom();
  if (f != null) {
    writer.writeMessage(1, f, proto.idep.nft.Denom.serializeBinaryToWriter);
  }
  f = message.getNftsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.idep.nft.BaseNFT.serializeBinaryToWriter
    );
  }
};

/**
 * optional Denom denom = 1;
 * @return {?proto.idep.nft.Denom}
 */
proto.idep.nft.Collection.prototype.getDenom = function() {
  return /** @type{?proto.idep.nft.Denom} */ (jspb.Message.getWrapperField(
    this,
    proto.idep.nft.Denom,
    1
  ));
};

/**
 * @param {?proto.idep.nft.Denom|undefined} value
 * @return {!proto.idep.nft.Collection} returns this
 */
proto.idep.nft.Collection.prototype.setDenom = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.idep.nft.Collection} returns this
 */
proto.idep.nft.Collection.prototype.clearDenom = function() {
  return this.setDenom(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.idep.nft.Collection.prototype.hasDenom = function() {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * repeated BaseNFT nfts = 2;
 * @return {!Array<!proto.idep.nft.BaseNFT>}
 */
proto.idep.nft.Collection.prototype.getNftsList = function() {
  return /** @type{!Array<!proto.idep.nft.BaseNFT>} */ (jspb.Message.getRepeatedWrapperField(
    this,
    proto.idep.nft.BaseNFT,
    2
  ));
};

/**
 * @param {!Array<!proto.idep.nft.BaseNFT>} value
 * @return {!proto.idep.nft.Collection} returns this
 */
proto.idep.nft.Collection.prototype.setNftsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};

/**
 * @param {!proto.idep.nft.BaseNFT=} opt_value
 * @param {number=} opt_index
 * @return {!proto.idep.nft.BaseNFT}
 */
proto.idep.nft.Collection.prototype.addNfts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    2,
    opt_value,
    proto.idep.nft.BaseNFT,
    opt_index
  );
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.idep.nft.Collection} returns this
 */
proto.idep.nft.Collection.prototype.clearNftsList = function() {
  return this.setNftsList([]);
};

goog.object.extend(exports, proto.idep.nft);
