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
  NodeRent: nodeRentModel[]
}

export interface nodeRentModel {
  id?: number;
  node: string;
  date?: Date;
}

export interface requestNodeRentModel {
  NodeRent: nodeRentModel;
}
