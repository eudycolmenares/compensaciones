import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseNodesModel as responseModel,
  requestNodeRentModel as requestModel,
  responseNodeModel as responseNode
} from '../../models/nodes-rents-rr';

@Injectable({
  providedIn: 'root'
})

export class NodesRentsRRService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allNodesRents(): Observable<responseModel> {
    return this.http.get<responseModel>(env.urlApi_rentsRR + env.endpoints.nodes_rents_all, { headers: this.headers });
  }

  createNodeRent(body: requestModel): Observable<responseNode> {
    return this.http.post<responseNode>(env.urlApi_rentsRR + env.endpoints.node_rent_create, body, {
      headers: this.headers,
    });
  }

  updateNode(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.urlApi_rentsRR + env.endpoints.node_rent_update, body, {
      headers: this.headers,
    });
  }

  deleteNode(id): Observable<responseModel> {
    return this.http.delete<responseModel>(env.urlApi_rentsRR + env.endpoints.node_rent_delete + `/${id}`, {
      headers: this.headers,
    });
  }
}
