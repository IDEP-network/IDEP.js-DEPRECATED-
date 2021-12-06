import * as pbs from '../../types/proto';

export class GenTx {
  static createAny(type, value) {
    let anyPb = new pbs.any_pb.Any();
    anyPb.setTypeUrl(`/${type}`);
    anyPb.setValue(value.serializeBinary());
    return anyPb;
  }
}
