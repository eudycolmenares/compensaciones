export interface responseNodesModel {
  GeneralResponse: generalResponse;
  NodesRents: NodeRent;
}

export interface responseNodeModel {
  GeneralResponse: generalResponse;
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

interface NodeRent {
  NodeRent: string[]
}

export interface nodeRentModel {
  id?: string;
  node: string;
  date?: Date;
}

export interface requestNodeRentModel {
  NodeRent: nodeRentModel;
}
