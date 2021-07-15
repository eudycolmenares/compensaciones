import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseNodesModel as responseModel,
  requestNodeRentModel as requestModel,
  responseNodeModel as responseNode
} from '../../models/nodes-rents-rr';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class NodesRentsRRService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  allNodesRents(): Observable<responseModel> {
    return this.http.get<responseModel>(
      env.endpoints.NodeRent.url + env.endpoints.NodeRent.endpoints.readall,
      { headers: this.headers }
    );
  }

  // createNodeRent(body: requestModel): Observable<responseNode> {
  //   return this.http.post<responseNode>(
  //     env.endpoints.NodeRent.url + env.endpoints.NodeRent.endpoints.create,
  //     body,
  //     { headers: this.headers }
  //   );
  // }

  // updateNode(body: requestModel): Observable<responseModel> {
  //   return this.http.put<responseModel>(
  //     env.endpoints.NodeRent.url + env.endpoints.NodeRent.endpoints.update,
  //     body,
  //     { headers: this.headers }
  //   );
  // }

  // deleteNode(id): Observable<responseModel> {
  //   return this.http.delete<responseModel>(
  //     env.endpoints.NodeRent.url + env.endpoints.NodeRent.endpoints.delete + `${id}`,
  //     { headers: this.headers }
  //   );
  // }
}
