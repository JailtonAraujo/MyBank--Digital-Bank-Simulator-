import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Withdraw } from '../model/Withdraw';
import { ObjectPagination } from '../model/ObjectPagination';
@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  private urlBaseApiHistoric = `${environment.UrlBaseApi}/historic`;

  constructor(private http:HttpClient) { }


  public getAllSWithdrawHistoricByAccountId(objectPagination:ObjectPagination){
    return this.http.post<any>(`${this.urlBaseApiHistoric}/withdraw`,objectPagination);
  }

  public getAllTransferHistoricByAccountId(objectPagination:ObjectPagination){
    return this.http.post<any>(`${this.urlBaseApiHistoric}/transfer`,objectPagination);
  }
}
